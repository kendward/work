import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';
import { Request as RequestType } from 'express';
import { JwtConfigService } from 'src/modules/config/jwt/jwt-config.service';
import { AuthJwtPayload } from '../interfaces/jwt.interface';

/**
 * JWT Strategy class to validate JWT token
 * @extends PassportStrategy(Strategy)
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly jwtConfigService: JwtConfigService,
    private jwtService: JwtService,
  ) {
    // Call the parent class constructor with the options
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        // JwtStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtConfigService.accessSecret,
      signOptions: {
        expiresIn: jwtConfigService.accessExpiresIn,
      },
    });
  }

  /**
   *  Extract JWT from request object
   * @param req  Request object from express
   * @returns  JWT token from request object or null
   */
  private static extractJWT(req: RequestType): string | null {
    console.log(req.cookies);
    if (req.cookies && 'jwt' in req.cookies) {
      return req.cookies.jwt;
    }
    return null;
  }

  /**
   *  Sign JWT Access token with email and id
   * @param payload Payload to be signed
   * @returns Signed JWT Access token
   */
  signAccessToken(payload: AuthJwtPayload): string {
    const payloadData = { ...payload, sub: payload.id };
    return this.jwtService.sign(payloadData, {
      secret: this.jwtConfigService.accessSecret,
      expiresIn: this.jwtConfigService.accessExpiresIn,
    });
  }

  /**
   *  Sign JWT Refresh token with email and id
   * @param payload Payload to be signed
   * @returns Signed JWT Refresh token
   */
  signRefreshToken(payload: AuthJwtPayload) {
    const payloadData = { ...payload, sub: payload.id };
    return this.jwtService.sign(payloadData, {
      secret: this.jwtConfigService.refreshSecret,
      expiresIn: this.jwtConfigService.refreshExpiresIn,
    });
  }

  /**
   * Validate JWT token and return user object if token is valid
   * @param payload  Payload from JWT token
   * @returns  payload
   */
  validate(payload: any) {
    console.log('Inside JWT Strategy Validate');
    // console.log(payload);
    return payload;
  }
}
