import NextAuth from "next-auth";
import { auth } from "@/utils/auth";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";
import AuthService from "./services/auth.service";

// @ts-ignore
export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isVerificationRoute = nextUrl.pathname.includes("/verify-account");

  if (isApiAuthRoute) return null;

  if (isVerificationRoute) {
    try {
      const token = nextUrl.pathname.split("/").pop() as string;
      const response = await AuthService.verifyAccount({ token });
      if (response?.data?.statusCode === 200) {
        return Response.redirect(
          new URL(
            `/login?success=${encodeURIComponent(
              "Account verified successfully"
            )}`,
            nextUrl
          )
        );
      }
    } catch (error) {
      return Response.redirect(
        new URL(
          `/login?error=${encodeURIComponent(
            "Account verification failed. invalid token"
          )}`,
          nextUrl
        )
      );
    }
  }

  if (isAuthRoute || isVerificationRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api)(.*)"],
};
