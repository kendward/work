import { Module } from '@nestjs/common';
import { AppConfigModule } from './app/app-config.module';
import { ExpressSessionConfigModule } from './session/session.module';
import { EmailConfigModule } from './email/email-config.module';
import { MongoConfigModule } from './database/mongo/mongo-config.module';

@Module({
  imports: [
    AppConfigModule,
    ExpressSessionConfigModule,
    MongoConfigModule,
    EmailConfigModule,
  ],
})
export class ApplicationConfigModule {}
