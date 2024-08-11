import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { Services } from 'src/modules/utils/constants';

@Global()
@Module({
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
