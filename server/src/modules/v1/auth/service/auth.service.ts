import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import * as crypto from 'crypto';
import { UserService } from '../../user/service/user.service';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { ResponseOut } from 'src/modules/shared/interfaces/response.interface';
import {
  ForgotPwdDTO,
  RefreshTokenResponse,
  ResetPasswordDTO,
  SignInDTO,
  SignUpDTO,
  VerifyEmailDTO,
} from '../dto/auth.dto';
import { SignInResponse } from '../interfaces/login.interface';
import { UserAlreadyExistsException } from '../exceptions/UserAlreadyExistsException';
import { ForgotPwdResponse } from '../interfaces/forgot-pwd.interface';
import { UserDocument } from '../../user/schema/user.schema';
import { Services } from 'src/modules/utils/constants';
import { MailService } from '../../mail/mail.service';
import { AppConfigService } from 'src/modules/config/app/app-config.service';
import { AuthJwtPayload } from '../interfaces/jwt.interface';
import { TokenService } from '../../user/service/token.service';
import * as argon2 from 'argon2';
import { JwtConfigService } from 'src/modules/config/jwt/jwt-config.service';
import { UserNotFoundException } from '../../user/exceptions/user.exceptions';
import { InvalidTokenException } from '../exceptions/InvalidTokenException';
import { EmailNotFoundException } from '../exceptions/EmailNotFound';
import { generateHashToken } from 'src/utils/utils';
import { AccountNotVerified } from '../exceptions/AccountNotVerified';
import { OrganizationService } from '../../organization/service/organization.service';
import { ROLES } from '../../organization/constants';

@Injectable()
export class AuthService {
  constructor(
    @Inject(Services.USERS) private readonly usersService: UserService,
    @Inject(Services.MAIL) private readonly mailService: MailService,
    @Inject(Services.ORGANIZATION)
    private readonly organizationService: OrganizationService,
    @Inject(Services.APP_CONFIG)
    private readonly appConfigService: AppConfigService,
    @Inject(Services.TOKEN) private readonly tokenService: TokenService,
    private readonly jwtConfigService: JwtConfigService,
    private readonly jwtStrategy: JwtStrategy,
    private readonly logger: Logger,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user: UserDocument = await this.usersService.findOneByEmail(email);
    if (!user) return null;
    if (!user.verified) throw new AccountNotVerified();
    const passwordValid = await user.correctPassword(password, user.password);
    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }

    if (user && passwordValid) {
      return user;
    }
    return null;
  }

  async verifyEmail(body: VerifyEmailDTO): Promise<ResponseOut<any>> {
    const user: any = await this.usersService.findOneByEmail(body.email);
    if (!user) {
      throw new EmailNotFoundException();
    }
    if (!user.verified) throw new AccountNotVerified();
    return {
      statusCode: 200,
      status: 'success',
      message: 'Email found!',
    };
  }

  async signUp(signupDto: SignUpDTO): Promise<ResponseOut<any>> {
    const user = await this.usersService.findOneByEmail(signupDto.email);
    if (user) throw new UserAlreadyExistsException(signupDto.email);

    signupDto.role = ROLES.ADMIN; // Assign admin role

    const accountVerificationToken = generateHashToken();
    const newUser = await this.usersService.create({
      ...signupDto,
      accountVerificationToken,
    });
    // create organization for user
    try {
      const roles = Object.values(ROLES).map((role) => ({ name: role }));
      const organization = await this.organizationService.createOrganization({
        email: signupDto.email,
        owner: newUser.id,
        roles,
      });
      await this.usersService.updateOne(
        {
          _id: newUser.id,
        },
        {
          $set: {
            organization: organization.id,
          },
        },
      );
    } catch (err) {
      this.logger.error(err);
      await this.usersService.deleteOne({
        _id: newUser.id,
      });

      throw new BadRequestException('Organization creation failed');
    }
    await this.mailService.sendWelcomeEmail({
      email: signupDto.email,
      name: signupDto.name,
      token: accountVerificationToken,
    });
    return {
      statusCode: 200,
      status: 'success',
      message: 'Register Successfully',
    };
  }

  async signIn(signInDto: SignInDTO): Promise<ResponseOut<SignInResponse>> {
    const { email } = signInDto;
    try {
      const user: UserDocument =
        await this.usersService.findByEmailAndGetPassword(email);

      const { accessToken, refreshToken } = await this.generateTokens({
        email: user.email,
        id: user.id,
      });

      /* Save hashed refresh token in database */
      const hashedRefreshToken = await argon2.hash(refreshToken);
      await this.tokenService.saveRefreshToken({
        userId: String(user._id),
        refreshToken: hashedRefreshToken,
        refreshTokenExpires: new Date(
          Date.now() + Number(this.jwtConfigService.refreshExpiresIn) * 1000,
        ),
      });

      // Access token expiration time
      const expiresIn = new Date();
      expiresIn.setDate(
        expiresIn.getDate() +
          Number(this.jwtConfigService.accessExpiresIn) / 86400,
      );

      /* Remove password from output */
      user.password = undefined;
      return {
        statusCode: HttpStatus.OK,
        status: 'success',
        message: 'Login Successfully',
        data: {
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
          },
          tokens: {
            accessToken,
            refreshToken,
            expiresOn: expiresIn,
          },
        },
      };
    } catch (error) {
      return {
        statusCode: 500,
        status: 'error',
        message: 'An error occurred',
      };
    }
  }

  async refreshToken(
    userId: string,
  ): Promise<ResponseOut<RefreshTokenResponse>> {
    const user = await this.usersService.findById(userId);
    if (!user) throw new UserNotFoundException();

    const { accessToken, refreshToken } = await this.generateTokens({
      email: user.email,
      id: user.id,
    });
    const hashedRefreshToken = await argon2.hash(refreshToken);
    await this.tokenService.saveRefreshToken({
      userId: String(user._id),
      refreshToken: hashedRefreshToken,
      refreshTokenExpires: new Date(
        Date.now() + Number(this.jwtConfigService.refreshExpiresIn) * 1000,
      ),
    });

    return {
      statusCode: 200,
      status: 'success',
      message: 'Token refreshed',
      data: {
        id: user.id,
        accessToken,
        refreshToken,
      },
    };
  }

  async validateRefreshToken(userId: string, refreshToken: string) {
    const userRefreshToken = await this.tokenService.getRefreshToken(userId);
    if (!userRefreshToken)
      throw new UnauthorizedException('Invalid Refresh Token');

    const refreshTokenMatches = await argon2.verify(
      userRefreshToken.refreshToken,
      refreshToken,
    );
    if (!refreshTokenMatches)
      throw new UnauthorizedException('Invalid Refresh Token');

    return { id: userId };
  }

  async generateTokens(
    payload: AuthJwtPayload,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtStrategy.signAccessToken(payload),
      this.jwtStrategy.signRefreshToken(payload),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async forgotPassword(
    forgotPasswordDto: ForgotPwdDTO,
  ): Promise<ResponseOut<ForgotPwdResponse>> {
    const user: any = await this.usersService.findOneByEmail(
      forgotPasswordDto.email,
    );

    if (!user) {
      throw new UserNotFoundException();
    }

    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    const resetURL = `${this.appConfigService.clientUrl}/reset-password?token=${resetToken}`;

    try {
      await this.mailService.sendPasswordResetEmail(user.email, resetURL);
      return {
        statusCode: 200,
        status: 'success',
        message: 'Token sent to email',
      };
    } catch (error) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });
      throw new BadRequestException(
        'There was an error sending the email. Try again later! ' +
          error?.message,
      );
    }
  }

  async verifyAccount(token: string): Promise<ResponseOut<any>> {
    const user: UserDocument = await this.usersService.findOne({
      accountVerificationToken: token,
    });

    if (!user) throw new InvalidTokenException();

    user.verified = true;
    user.accountVerificationToken = undefined;
    await user.save();

    return {
      statusCode: HttpStatus.OK,
      status: 'success',
      message: 'Account Verified Successfully',
    };
  }

  async resetPassword(
    resetPasswordDto: ResetPasswordDTO,
  ): Promise<ResponseOut<null>> {
    const { token } = resetPasswordDto;
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user: UserDocument[] = await this.usersService.find({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user[0]) throw new InvalidTokenException();

    user[0].password = resetPasswordDto.password;
    user[0].passwordResetToken = undefined;
    user[0].passwordResetExpires = undefined;
    await user[0].save();

    return {
      statusCode: 200,
      status: 'success',
      message: 'Reset Password Successfully',
    };
  }

  async logout(res: Response): Promise<void> {
    res.clearCookie('user_id');
    res.clearCookie('jwt');
    res.clearCookie('connect.sid');
  }
}
