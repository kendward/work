import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { MongoConfigModule } from 'src/modules/config/database/mongo/config.module';
import { MongoConfigService } from 'src/modules/config/database/mongo/config.service';

/**
 * Import and provide base mongoose (mongodb) related classes.
 *
 * @module
 */
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [MongoConfigModule],
      useFactory: async (mongoConfigService: MongoConfigService) => ({
        uri: mongoConfigService.database,
      }),
      inject: [MongoConfigService],
    } as MongooseModuleAsyncOptions),
  ],
})
export class MongoDatabaseProviderModule {}
