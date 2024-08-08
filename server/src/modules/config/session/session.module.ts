import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import configuration from './session.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ExpressSessionConfigService } from './session.service';

/**
 * Module to handle the configuration of the express session
 * @file exports the ExpressSessionConfigModule
 * @module ExpressSessionConfigModule
 * @exports ExpressSessionConfigModule
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        SESSION_SECRET: Joi.string().required(),
      }),
    }),
  ],
  providers: [ConfigService, ExpressSessionConfigService],
  exports: [ConfigService, ExpressSessionConfigService],
})
export class ExpressSessionConfigModule {}
