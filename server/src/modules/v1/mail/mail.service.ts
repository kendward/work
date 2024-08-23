import { Inject, Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { MailSendOptions } from './interface/mail.interface';
import { Services } from 'src/modules/utils/constants';
import { AppConfigService } from 'src/modules/config/app/app-config.service';
import { join } from 'path';
import { readFileSync } from 'fs';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(
    private readonly mailerService: MailerService,
    @Inject(Services.APP_CONFIG)
    private readonly appConfigService: AppConfigService,
  ) {}

  async sendEmail(options: MailSendOptions) {
    try {
      // const assetsBaseUrl =
      //   this.appConfigService.env === APP_ENV.DEVELOPMENT
      //     ? `${join(process.cwd(), '/src/public/assets')}`
      //     : `${this.appConfigService.url}:${this.appConfigService.port}/assets`;
      // console.log('assetsBaseUrl', assetsBaseUrl);

      // const logoImage = await imageToBase64(
      //   join(assetsBaseUrl, `/images/logo.png`),
      // );

      const cssPath = join(__dirname, 'templates/css', 'styles.css');
      const cssContent = readFileSync(cssPath, 'utf-8');
      const context = {
        ...options.context,
        cssContent,
      };
      options.context = context;
      await this.mailerService.sendMail({
        ...options,
      });
      this.logger.log(
        `Email sent to ${Array.isArray(options?.to) ? JSON.stringify(options?.to) : options?.to} with subject: ${options.subject}`,
      );
    } catch (error) {
      this.logger.error(
        `Failed to send email to ${Array.isArray(options?.to) ? JSON.stringify(options?.to) : options?.to}: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async sendWelcomeEmail({
    name,
    email,
    token,
  }: {
    email: string;
    name: string;
    token: string;
  }) {
    const url = `${this.appConfigService.clientUrl}/verify-account/${token}`;
    return this.sendEmail({
      to: email,
      subject: "You've signed up! Now, get set up",
      template: './welcome',
      context: { name, url },
    });
  }

  async sendPasswordResetEmail(to: string, url: string) {
    return this.sendEmail({
      to,
      subject: 'Password Reset Request',
      template: 'reset-password',
      context: {
        url,
      },
    });
  }

  async sendNewsletter(to: string, content: string) {
    return this.sendEmail({
      to,
      subject: 'Our Latest Newsletter',
      template: 'newsletter',
      context: {
        content,
      },
    });
  }
}
