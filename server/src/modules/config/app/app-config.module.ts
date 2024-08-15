import * as Joi from '@hapi/joi';
import { Global, Module } from '@nestjs/common';
import { AppConfigService } from './app-config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './app.config';
import { Services } from 'src/modules/utils/constants';
/**
 * Import and provide app configuration related classes.
 * @module AppConfigModule
 * @exports AppConfigModule
 */

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
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
  providers: [
    ConfigService,
    {
      provide: Services.APP_CONFIG,
      useClass: AppConfigService,
    },
  ],
  exports: [
    ConfigService,
    {
      provide: Services.APP_CONFIG,
      useClass: AppConfigService,
    },
  ],
})
export class AppConfigModule {}
