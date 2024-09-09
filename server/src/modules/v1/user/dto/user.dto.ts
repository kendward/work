import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateProfileDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
    required: true,
  })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @ApiProperty({
    example: 'example@gmail.com',
    description: 'The email of the user',
    required: true,
  })
  @IsNotEmpty({ message: 'Email is required' })
  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Email must be a valid email' })
  email: string;

  userId: string;
  organization: string;
}

export class ChangePasswordDto {
  @ApiProperty({
    example: 'Password@123',
    description: 'The current password of the user',
    required: true,
  })
  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  currentPassword: string;

  @ApiProperty({
    example: 'Password@123',
    description: 'The new password of the user',
    required: true,
  })
  @IsNotEmpty({ message: 'New password is required' })
  @IsString({ message: 'New password must be a string' })
  @MinLength(8)
  @MaxLength(20)
  @IsStrongPassword({}, { message: 'Password must be a strong password' })
  newPassword: string;

  userId: string;
}

export class ReceiveNotificationStatusDto {
  @ApiProperty({
    example: 'true',
    description: 'The status of the notification',
    required: true,
  })
  @IsNotEmpty({ message: 'Notification status is required' })
  @IsBoolean({ message: 'Notification status must be a boolean' })
  status: boolean;

  user: string;
  organization: string;
}
