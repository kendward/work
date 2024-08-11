import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { MailSendOptions } from './interface/mail.interface';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(options: MailSendOptions) {
    try {
      await this.mailerService.sendMail(options);
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

  async sendWelcomeEmail(to: string | string[], name: string) {
    return this.sendEmail({
      to,
      subject: 'Welcome to Our Platform!',
      template: 'welcome',
      context: { name },
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
