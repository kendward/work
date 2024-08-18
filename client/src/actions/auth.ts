"use server";
import { signIn } from "@/utils/auth";
import {
  IForgotPasswordBody,
  IResetPasswordBody,
  ISignInBody,
  ISignUpBody,
} from "../../types/request-body";
import AuthService from "@/services/auth.service";

export const login = async (
  credentials: ISignInBody,
  callbackUrl?: string | null,
  redirect: boolean = false
): Promise<{ error: boolean; message: string }> => {
  try {
    const res = await signIn("credentials", {
      ...credentials,
      redirect,
      callbackUrl,
    });
    return { message: "Login Successfully!", error: false };
  } catch (error: any) {
    let message = "Something went wrong!";
    if (error?.message?.includes("Read more")) {
      message = error?.message?.split("Read more")[0];
    }
    return { message, error: true };
  }
};

export const register = async (
  body: ISignUpBody
): Promise<Record<string, any>> => {
  try {
    const response = await AuthService.signUp(body);
    if (response.data.statusCode !== 200) {
      return { message: response.data.message, error: true };
    }
    return { message: "Account created successfully", error: false };
  } catch (error: any) {
    console.log("error", error);
    return { ...error?.response?.data, error: true };
  }
};

export const forgotPassword = async (
  body: IForgotPasswordBody
): Promise<Record<string, any>> => {
  try {
    await AuthService.forgotPassword(body);
    return { message: "Password reset link sent to your email", error: false };
  } catch (error: any) {
    return { ...error?.response?.data, error: true };
  }
};

export const resetPassword = async (
  body: IResetPasswordBody
): Promise<Record<string, any>> => {
  try {
    await AuthService.resetPassword(body);
    return { message: "Password changed!", error: false };
  } catch (error: any) {
    console.log("error", error?.response?.data);
    return { ...error?.response?.data, error: true };
  }
};
