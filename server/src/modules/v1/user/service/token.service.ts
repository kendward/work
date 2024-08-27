import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Token, TokenDocument } from '../schema/token.schema';
import { Model } from 'mongoose';
import { ITokenService } from '../interface/token';
import { ModelRepository } from 'src/modules/shared/model/model.repository';

@Injectable()
export class TokenService
  extends ModelRepository<TokenDocument>
  implements ITokenService
{
  constructor(
    @InjectModel(Token.name) private readonly tokenModel: Model<TokenDocument>,
  ) {
    super(tokenModel);
  }

  /**
   * Saves the refresh token for a user.
   *
   * @param params - The parameters for saving the refresh token.
   * @param params.userId - The ID of the user.
   * @param params.refreshToken - The refresh token.
   * @param params.refreshTokenExpires - The expiration date of the refresh token.
   * @returns A promise that resolves to the saved token.
   */
  async saveRefreshToken(params: {
    userId: string;
    refreshToken: string;
    refreshTokenExpires: Date;
  }): Promise<Token> {
    return await this.tokenModel.findOneAndUpdate(
      { userId: params.userId },
      {
        userId: params.userId,
        refreshToken: params.refreshToken,
        refreshTokenExpires: params.refreshTokenExpires,
      },
      { upsert: true, new: true },
    );
  }

  /**
   * Retrieves the refresh token for a user.
   *
   * @param userId - The ID of the user.
   * @returns A promise that resolves to the token
   */
  async getRefreshToken(userId: string): Promise<TokenDocument> {
    return this.tokenModel.findOne({
      userId,
      refreshTokenExpires: { $gt: new Date() },
    });
  }
}
