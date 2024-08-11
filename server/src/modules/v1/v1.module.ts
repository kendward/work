import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/users.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [AuthModule, MailModule, UsersModule],
})
export class V1Module {}
