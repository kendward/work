import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { MongoConfigService } from './mongo-config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import mongoConfig from './mongo.config';
import { MongooseModule, MongooseModuleAsyncOptions } from '@nestjs/mongoose';
/**
 * Import and provide mongo configuration related classes.
 *
 * @module
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [mongoConfig],
      validationSchema: Joi.object({
        MONGO_DATABASE: Joi.string().default(''),
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [MongoConfigModule],
      useFactory: async (mongoConfigService: MongoConfigService) => ({
        uri: mongoConfigService.database,
      }),
      inject: [MongoConfigService],
    } as MongooseModuleAsyncOptions),
  ],
  providers: [ConfigService, MongoConfigService],
  exports: [ConfigService, MongoConfigService],
})
export class MongoConfigModule {}
