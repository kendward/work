import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../user/users.module';
import { JwtConfigModule } from 'src/modules/config/jwt/jwt-config.module';
import { AppConfigModule } from 'src/modules/config/app/app-config.module';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { SessionSerializer } from 'src/modules/common/serializers/session.serializer';
import { RefreshJwtStrategy } from './strategies/refresh.strategy';

@Module({
  imports: [UsersModule, PassportModule, JwtConfigModule, AppConfigModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    RefreshJwtStrategy,
    JwtService,
    SessionSerializer,
  ],
  exports: [AuthService],
})
export class AuthModule {}
