import { DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  id: string;
  email: string;
  name: string;
  image: string;
  tokens: {
    accessToken: string;
    refreshToken: string;
    expiresOn: Date;
  };
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
