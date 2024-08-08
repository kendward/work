import { Module } from '@nestjs/common';
import { AppConfigModule } from './app/config.module';
import { ExpressSessionConfigModule } from './session/session.module';
import { MongoDatabaseProviderModule } from 'src/providers/mongo/provider.module';

@Module({
  imports: [
    AppConfigModule,
    ExpressSessionConfigModule,
    MongoDatabaseProviderModule,
  ]
})
export class ApplicationConfigModule {}
