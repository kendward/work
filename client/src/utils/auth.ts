import NextAuth, { AuthError, type DefaultSession } from "next-auth";
import AuthService from "@/services/auth.service";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials;
        try {
          const response = await AuthService.signIn({ email, password });
          if (response.data.statusCode !== 200) {
            throw new Error(response.data.message || "Invalid credentials!");
          }
          const data = response.data.data;
          return { ...data.user, tokens: { ...data.tokens } };
        } catch (error: any) {
          throw new AuthError(error.message);
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },

  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;

      //   const existingUser = await getUserById(user.id);

      // Prevent sign in without email verification
      //   if (!existingUser?.emailVerified) return false;

      //   if (existingUser.isTwoFactorEnabled) {
      //     const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
      //       existingUser.id
      //     );

      //     if (!twoFactorConfirmation) return false;

      //     // Delete two factor confirmation for next sign in
      //     await db.twoFactorConfirmation.delete({
      //       where: { id: twoFactorConfirmation.id },
      //     });
      //   }

      return true;
    },
    async session({ token, session }: { token: any; session: DefaultSession }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.user) {
        session.user = token.user;
        session.expires = token.user.tokens.expiresOn;
      }
      console.log("session", session);
      return session;
    },
    async jwt({ token, user }: { token: any; user: any }) {
      if (!token.sub) return token;
      if (user) {
        token.user = user;
        if (user.tokens?.expiresOn) {
          token.exp = Math.floor(
            new Date(user.tokens.expiresOn).getTime() / 1000
          );
        }
      }
      return token;
    },
  },
  session: { strategy: "jwt" },
} satisfies NextAuthConfig);
