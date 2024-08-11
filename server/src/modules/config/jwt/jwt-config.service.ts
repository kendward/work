import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
/**
 * Service dealing with jwt configuration
 * @class JwtConfigService
 * @export default JwtConfigService
 * */
@Injectable()
export class JwtConfigService {
  constructor(private configService: ConfigService) {}

  get accessSecret(): string {
    return this.configService.get<string>('access-jwt.accessSecret');
  }
  get accessExpiresIn(): string {
    return this.configService.get<string>('access-jwt.accessExpiresIn');
  }

  get refreshSecret(): string {
    return this.configService.get<string>('refresh-jwt.refreshSecret');
  }
  get refreshExpiresIn(): string {
    return this.configService.get<string>('refresh-jwt.refreshExpiresIn');
  }
}
