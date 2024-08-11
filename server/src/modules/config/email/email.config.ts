import { registerAs } from '@nestjs/config';

export default registerAs('email', () => ({
  host: process.env.EMAIL_HOST || 'smtp.example.com',
  port: parseInt(process.env.EMAIL_PORT, 10) || 587,
  user: process.env.EMAIL_USER || 'your-email@example.com',
  pass: process.env.EMAIL_PASS || 'your-email-password',
  from: process.env.EMAIL_FROM || '"No Reply" <no-reply@example.com>',
}));
