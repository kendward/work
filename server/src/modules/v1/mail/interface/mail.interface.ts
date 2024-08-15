export interface MailSendOptions {
  to: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  subject: string;
  context: {
    [name: string]: any;
  };
  template: string;
}
