import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';
import { User } from '../../user/schema/user.schema';
import { Transform } from 'class-transformer';
import { lowerCaseTransformer } from 'src/utils/transformers/lower-case.transformer';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDTO {
  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
    required: true,
  })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @ApiProperty({
    example: 'example@email.com',
    description: 'The email of the user',
    required: true,
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Email must be a valid email' })
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
    required: true,
  })
  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(8)
  @MaxLength(20)
  @IsStrongPassword({}, { message: 'Password must be a strong password' })
  password: string;
}

export class SignInDTO {
  @ApiProperty({
    example: 'example@email.com',
    description: 'The email of the user',
    required: true,
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Email must be a valid email' })
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
    required: true,
  })
  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  password: string;
}

export class AuthEmailLoginDto {
  @Transform(lowerCaseTransformer)
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class AuthConfirmEmailDto {
  @ApiProperty({
    example: 'hash',
    description: 'The hash of the user',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  hash: string;
}

export class RefreshResponseDto {
  token: string;
  refreshToken: string;
  tokenExpires: number;
}

export class LoginResponseDto {
  token: string;
  refreshToken: string;
  tokenExpires: number;
  user: User;
}

export class ForgotPwdDTO {
  @ApiProperty({
    example: 'example@email.com',
    description: 'The email of the user',
    required: true,
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Email must be a valid email' })
  email: string;
}
export class ResetPasswordDTO {
  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
    required: true,
  })
  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  @IsStrongPassword({}, { message: 'Password must be a strong password' })
  @MaxLength(20)
  password: string;

  @ApiProperty({
    example: 'token',
    description: 'The token of the user',
    required: true,
  })
  @IsString({ message: 'Token must be a string' })
  @IsNotEmpty({ message: 'Token is required' })
  token: string;
}

export class RefreshTokenResponse {
  @ApiProperty({
    example: 'id',
    description: 'The id of the user',
  })
  id: string;

  @ApiProperty({
    example: 'token',
    description: 'The access token of the user',
  })
  accessToken: string;

  @ApiProperty({
    example: 'refreshToken',
    description: 'The refresh token of the user',
  })
  refreshToken: string;
}
