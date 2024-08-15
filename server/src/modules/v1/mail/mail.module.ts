import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { Services } from 'src/modules/utils/constants';
import { EmailConfigModule } from 'src/modules/config/email/email-config.module';

@Global()
@Module({
  imports: [EmailConfigModule],
  providers: [
    {
      provide: Services.MAIL,
      useClass: MailService,
    },
  ],
  exports: [
    {
      provide: Services.MAIL,
      useClass: MailService,
    },
  ],
})
export class MailModule {}
