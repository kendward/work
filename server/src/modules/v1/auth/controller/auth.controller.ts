import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '../service/auth.service';
import {
  ForgotPwdDTO,
  RefreshTokenResponse,
  ResetPasswordDTO,
  SignInDTO,
  SignUpDTO,
  VerifyEmailDTO,
} from '../dto/auth.dto';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { ResponseOut } from 'src/modules/common/interfaces/response.interface';
import { SignInResponse } from '../interfaces/login.interface';
import { ForgotPwdResponse } from '../interfaces/forgot-pwd.interface';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtRefreshAuthGuard } from '../guards/jwt-refresh-auth.guard';

@ApiTags('v1/auth')
@Controller({
  path: 'auth',
  version: '1',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('verify-email')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Verify email of user',
    type: ResponseOut<any>,
  })
  @ApiBody({
    description: 'Email of user',
    type: VerifyEmailDTO,
  })
  async verifyEmail(@Body() body: any): Promise<ResponseOut<any>> {
    return await this.authService.verifyEmail(body);
  }

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'Create an account with provided data if correct',
    type: ResponseOut<any>,
  })
  @ApiBody({
    description: 'Credentials of user',
    type: SignUpDTO,
  })
  async signup(@Body() signupDto: SignUpDTO): Promise<ResponseOut<any>> {
    const result = await this.authService.signUp(signupDto);
    return result;
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @ApiOkResponse({
    description: 'Logs in user',
    type: ResponseOut<SignInResponse>,
  })
  @ApiBody({
    description: 'Credentials of user',
    type: SignInDTO,
  })
  async signIn(
    @Body() signInDto: SignInDTO,
  ): Promise<ResponseOut<SignInResponse>> {
    const result = await this.authService.signIn(signInDto);
    return result;
  }

  @Post('refresh')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Refresh token of user',
    type: ResponseOut<RefreshTokenResponse>,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtRefreshAuthGuard)
  async refreshToken(@Req() req): Promise<ResponseOut<RefreshTokenResponse>> {
    return await this.authService.refreshToken(req.user.id);
  }

  @Post('forgot-password')
  @ApiOkResponse({
    description: 'Sends a reset password link to user email',
    type: ResponseOut<ForgotPwdResponse>,
  })
  @ApiBody({
    description: 'Email of user',
    type: ForgotPwdDTO,
  })
  async forgotPassword(
    @Body() forgotPasswordDto: ForgotPwdDTO,
  ): Promise<ResponseOut<ForgotPwdResponse>> {
    const result = await this.authService.forgotPassword(forgotPasswordDto);
    return result;
  }

  @Patch('reset-password')
  @ApiOkResponse({
    description: 'Reset password of user',
    type: ResponseOut<any>,
  })
  @ApiOperation({ summary: 'Resource for reset user password' })
  @ApiBody({
    description: 'New password',
    type: ResetPasswordDTO,
  })
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDTO,
  ): Promise<ResponseOut<any>> {
    console.log('resetPasswordDto', resetPasswordDto);
    const result = await this.authService.resetPassword(resetPasswordDto);
    return result;
  }

  @Post('logout')
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Logs out user',
  })
  @UseGuards(JwtAuthGuard)
  async logout(@Res() res: Response): Promise<void> {
    await this.authService.logout(res);
    res.status(200).json({
      statusCode: 200,
      status: 'success',
      message: 'user logout successfully',
    });
  }
}
