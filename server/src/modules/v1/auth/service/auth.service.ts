import {
  HttpStatus,
  Inject,
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import * as crypto from 'crypto';
import { UserService } from '../../user/service/user.service';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { ResponseOut } from 'src/modules/common/interfaces/response.interface';
import {
  ForgotPwdDTO,
  RefreshTokenResponse,
  ResetPasswordDTO,
  SignInDTO,
  SignUpDTO,
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

@Injectable()
export class AuthService {
  constructor(
    @Inject(Services.USERS) private readonly usersService: UserService,
    @Inject(Services.MAIL) private readonly mailService: MailService,
    @Inject(Services.APP_CONFIG)
    private readonly appConfigService: AppConfigService,
    @Inject(Services.TOKEN) private readonly tokenService: TokenService,
    private readonly jwtConfigService: JwtConfigService,
    private readonly jwtStrategy: JwtStrategy,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user: any = await this.usersService.findOneByEmail(email);
    if (!user) return null;
    const passwordValid = await user.correctPassword(password, user.password);
    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }
    if (user && passwordValid) {
      return user;
    }
    return null;
  }

  async signUp(signupDto: SignUpDTO): Promise<ResponseOut<any>> {
    const user = await this.usersService.findOneByEmail(signupDto.email);
    if (user) throw new UserAlreadyExistsException(signupDto.email);
    await this.usersService.create(signupDto);
    await this.mailService.sendWelcomeEmail(signupDto.email, signupDto.name);
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
            expiresIn,
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
    const { email } = forgotPasswordDto;
    if (!email) {
      return {
        statusCode: 400,
        status: 'fail',
        message: 'Please provide an email',
      };
    }

    const user: any = await this.usersService.findOneByEmail(email);

    if (!user) {
      return {
        statusCode: 404,
        status: 'fail',
        message: 'User not found',
      };
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
        data: { token: resetToken },
      };
    } catch (error) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });
      throw new Error('There was an error sending the email. Try again later!');
    }
  }

  async resetPassword(
    token: string,
    resetPasswordDto: ResetPasswordDTO,
  ): Promise<ResponseOut<null>> {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user: UserDocument[] = await this.usersService.find({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user[0]) {
      return {
        statusCode: 400,
        status: 'fail',
        message: 'Token is invalid or has expired',
      };
    }

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
