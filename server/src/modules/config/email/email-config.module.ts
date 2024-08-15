import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import emailConfig from './email.config';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
// import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { EmailConfigService } from './email-config.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [emailConfig],
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        console.log(111, join(__dirname, '../../v1/mail/templates'));
        return {
          transport: {
            host: configService.get<string>('email.host'),
            // port: configService.get<number>('email.port'),
            secure: false,
            auth: {
              user: configService.get<string>('email.user'),
              pass: configService.get<string>('email.pass'),
            },
          },
          defaults: {
            from: configService.get<string>('email.from'),
          },
          template: {
            dir: join(__dirname, '../../v1/mail/templates'),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
          // options: {
          //   partials: {
          //     dir: join(process.cwd(), 'src/modules/v1/mail/templates/partials'),
          //     options: {
          //       strict: true,
          //     },
          //   },
          // },
        };
      },
    }),
  ],
  providers: [ConfigService, EmailConfigService],
  exports: [ConfigService, EmailConfigService],
})
export class EmailConfigModule {}
