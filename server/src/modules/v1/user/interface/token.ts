import { TokenDocument } from '../schema/token.schema';

export interface ITokenService {
  saveRefreshToken(params: {
    userId: string;
    refreshToken: string;
    refreshTokenExpires: Date;
  }): Promise<TokenDocument>;
}
