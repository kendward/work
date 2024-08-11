import { registerAs } from '@nestjs/config';
import { Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import validateConfig from 'src/utils/validate-config';
/**
 * Class to validate the environment variables
 * @class JWT_ACCESS_ENV_VALIDATOR
 *
 */
class JWT_ACCESS_ENV_VALIDATOR {
  @IsString()
  JWT_ACCESS_SECRET: string;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  JWT_ACCESS_EXPIRES_IN: number;
}
/**
 * Configuration for the jwt-access token
 * @export default - configuration for the jwt-access token
 */
export default registerAs('access-jwt', () => {
  validateConfig(process.env, JWT_ACCESS_ENV_VALIDATOR);
  return {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
  };
});
