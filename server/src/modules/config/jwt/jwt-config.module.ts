import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { JwtConfigService } from './jwt-config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import accessJwtConfig from './access-jwt.config';
import refreshJwtConfig from './refresh-jwt.config';
import { JwtModule } from '@nestjs/jwt';
/**
 * Import and provide jwt configuration related classes.
 *
 * @module
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [accessJwtConfig, refreshJwtConfig],
      validationSchema: Joi.object({
        JWT_ACCESS_SECRET: Joi.string().default('access-secret'),
        JWT_ACCESS_EXPIRES_IN: Joi.string().default('1d'),
        JWT_REFRESH_SECRET: Joi.string().default('refresh-secret'),
        JWT_REFRESH_EXPIRES_IN: Joi.string().default('90d'),
      }),
    }),

    JwtModule.registerAsync({
      imports: [JwtConfigModule],
      useFactory: async (jwtConfigService: JwtConfigService) => ({
        secret: jwtConfigService.accessSecret,
        signOptions: { expiresIn: jwtConfigService.accessExpiresIn },
      }),
      inject: [JwtConfigService],
    }),
  ],
  providers: [ConfigService, JwtConfigService],
  exports: [ConfigService, JwtConfigService],
})
export class JwtConfigModule {}
