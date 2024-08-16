import { AxiosResponse } from "axios";
import { SignInResponse } from "../../types/auth";
import apiService from "@/utils/api";
import { ApiResponse } from "../../types/common";

export default class AuthService {
  static async signIn(body: object): Promise<AxiosResponse<SignInResponse>> {
    return apiService.post("/auth/sign-in", body);
  }

  static async signUp(body: object): Promise<AxiosResponse<ApiResponse>> {
    return apiService.post("/auth/sign-up", body);
  }
}
