import { registerAs } from '@nestjs/config';
import { IsString } from 'class-validator';
import validateConfig from 'src/utils/validate-config';

/**
 * Class to validate the environment variables
 * @file session.config.ts
 * @class ValidatorClass
 */
class ValidatorClass {
  @IsString()
  SESSION_SECRET: string;
}
/**
 * Configuration for the express session
 * @file session.config.ts
 * @export default - configuration for the express session
 */
export default registerAs('session', () => {
  validateConfig(process.env, ValidatorClass);
  return {
    secret: process.env.SESSION_SECRET,
  };
});
