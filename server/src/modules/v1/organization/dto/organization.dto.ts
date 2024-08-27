import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { User } from '../../user/schema/user.schema';
import { ROLES } from '../constants';
import { ApiProperty } from '@nestjs/swagger';
class Role {
  @IsEnum(ROLES)
  name: string;
}
export class CreateOrganizationDto {
  @IsOptional()
  name?: string;

  @IsString({ message: 'Email must be a string' })
  email: string;

  @IsOptional()
  logo?: string;

  @IsNotEmpty({ message: 'Owner must be provided' })
  owner: string | User;

  roles?: Role[];
}

export class UpdateBillingInformationDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Enter the name of business or representative',
    required: true,
  })
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @ApiProperty({
    example: 'Street 1, City, Country',
    description: 'Enter the address odf the company or representative',
    required: true,
  })
  @IsString({ message: 'Address must be a string' })
  @IsNotEmpty({ message: 'Address is required' })
  address: string;

  @ApiProperty({
    example: 'United States',
    description: 'Country Name',
    required: true,
  })
  @IsString({ message: 'Country must be a string' })
  @IsNotEmpty({ message: 'Country is required' })
  country: string;

  @ApiProperty({
    example: '123456',
    description: 'Enter the zip code',
    required: true,
  })
  @IsString({ message: 'Zip code must be a string' })
  @IsNotEmpty({ message: 'Zip code is required' })
  zipCode: string;

  @ApiProperty({
    example: '123456789',
    description: 'Enter VAT number, if applicable',
  })
  @IsOptional()
  vatNumber?: string;

  @ApiProperty({
    example: 'United States',
    description: 'Enter VAT country',
  })
  @IsOptional()
  vatCountry?: string;

  organization: string;
}

export class DeleteAccountDto {
  @ApiProperty({
    example: 'Password@123',
    description: 'The password of the admin',
    required: true,
  })
  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  password: string;

  owner: string;
  organization: string;
}
