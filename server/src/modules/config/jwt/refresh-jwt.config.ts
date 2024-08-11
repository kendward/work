import { registerAs } from '@nestjs/config';
import { Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import validateConfig from 'src/utils/validate-config';
/**
 * Class to validate the environment variables
 * @class JWT_REFRESH_ENV_VALIDATOR
 *
 */
class JWT_REFRESH_ENV_VALIDATOR {
  @IsString()
  JWT_REFRESH_SECRET: string;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  JWT_REFRESH_EXPIRES_IN: number;
}
/**
 * Configuration for the jwt refresh token
 * @export default - configuration for the jwt-refresh
 */
export default registerAs('refresh-jwt', () => {
  validateConfig(process.env, JWT_REFRESH_ENV_VALIDATOR);
  return {
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  };
});
