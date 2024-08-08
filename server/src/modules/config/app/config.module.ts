import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import configuration from './configuration';
import { AppConfigService } from './config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
/**
 * Import and provide app configuration related classes.
 * @module AppConfigModule
 * @exports AppConfigModule
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        APP_NAME: Joi.string().default(''),
        APP_ENV: Joi.string()
          .valid('development', 'production')
          .default('development'),
        APP_URL: Joi.string().default('http://localhost:4000'),
        APP_PORT: Joi.number().default(4000),
      }),
    }),
  ],
  providers: [ConfigService, AppConfigService],
  exports: [ConfigService, AppConfigService],
})
export class AppConfigModule {}
