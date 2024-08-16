/**
 * @description Interface for the sign in request
 * @interface SignInResponse
 */

export interface SignInResponse {
  statusCode: number;
  status: string;
  message: string;
  data: {
    tokens: {
      accessToken: string;
      refreshToken: string;
      expiresOn: Date;
    };
    user: {
      id: string;
      email: string;
      name: string;
    };
  };
}
