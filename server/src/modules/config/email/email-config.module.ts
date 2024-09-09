import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import emailConfig from './email.config';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { EmailConfigService } from './email-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [emailConfig],
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          transport: {
            host: 'smtp.sendgrid.net',
            port: 587,
            secure: false,
            auth: {
              user: 'apikey',
              pass: configService.get<string>('SENDGRID_API_KEY'),
            },
          },
          defaults: {
            from: configService.get<string>('email.from'), // Default "from" address
          },
          template: {
            dir: join(__dirname, '../../v1/mail/templates'),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
    }),
  ],
  providers: [ConfigService, EmailConfigService],
  exports: [ConfigService, EmailConfigService],
})
export class EmailConfigModule {}
