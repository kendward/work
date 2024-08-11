export interface SignInResponse {
  tokens: {
    accessToken: string;
    refreshToken: string;
    expiresIn: Date;
  };
  user: {
    id: string;
    email: string;
    name: string;
  };
}
export interface LogoutResponse {
  statusCode: number;
  message: string;
}
