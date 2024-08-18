import { AxiosResponse } from "axios";
import { SignInResponse } from "../../types/auth";
import apiService from "@/utils/api";
import { ApiResponse } from "../../types/common";
import { API_ROUTES } from "@/constants/api-routes";
import {
  IForgotPasswordBody,
  IResetPasswordBody,
  ISignInBody,
  ISignUpBody,
} from "../../types/request-body";

export default class AuthService {
  static async signIn(
    body: Partial<ISignInBody>
  ): Promise<AxiosResponse<SignInResponse>> {
    return apiService.post(API_ROUTES.AUTH.SIGN_IN, body);
  }

  static async signUp(body: ISignUpBody): Promise<AxiosResponse<ApiResponse>> {
    return apiService.post(API_ROUTES.AUTH.SIGN_UP, body);
  }

  static async forgotPassword(
    body: IForgotPasswordBody
  ): Promise<AxiosResponse<ApiResponse>> {
    return apiService.post(API_ROUTES.AUTH.FORGOT_PASSWORD, body);
  }

  static async resetPassword(
    body: IResetPasswordBody
  ): Promise<AxiosResponse<ApiResponse>> {
    return apiService.patch(API_ROUTES.AUTH.RESET_PASSWORD, body);
  }
}
