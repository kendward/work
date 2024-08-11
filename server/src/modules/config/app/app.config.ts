import { registerAs } from '@nestjs/config';

/**
 * Configuration for the app
 * @file configuration.ts
 * @export default - configuration for the app
 */
export default registerAs('app', () => ({
  env: process.env.APP_ENV,
  name: process.env.APP_NAME,
  url: process.env.APP_URL,
  port: process.env.APP_PORT,
  clientUrl: process.env.APP_CLIENT_URL,
}));
