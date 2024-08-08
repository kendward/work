import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Service dealing with express session configuration
 * @file service.ts
 * @class ExpressSessionConfigService
 * @export default ExpressSessionConfigService
 */
@Injectable()
export class ExpressSessionConfigService {
  constructor(private configService: ConfigService) {}
  get sessionSecret(): string {
    return this.configService.get<string>('session.secret');
  }
}
