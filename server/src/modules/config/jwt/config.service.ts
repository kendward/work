import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
/**
 * Service dealing with jwt configuration
 * @file service.ts
 * @class JwtConfigService
 * @export default JwtConfigService
 * */
@Injectable()
export class JwtConfigService {
  constructor(private configService: ConfigService) {}

  get secret(): string {
    return this.configService.get<string>('jwt.secret');
  }
  get expiresIn(): string {
    return this.configService.get<string>('jwt.expiresIn');
  }
  get cookieExpiresIn(): string {
    return this.configService.get<string>('jwt.cookieExpiresIn');
  }
}
