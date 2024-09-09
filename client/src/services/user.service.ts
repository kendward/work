import { AxiosResponse } from "axios";
import apiService from "@/utils/api";
import { ApiResponse } from "../../types/common";
import { API_ROUTES } from "@/constants/api-routes";
import {
  IChangePasswordBody,
  ICurrentUserInfo,
  IProfileUpdateBody,
} from "../../types/user";

export default class UserService {
  static async getCurrentUserInfo(): Promise<AxiosResponse<ICurrentUserInfo>> {
    return apiService.get(API_ROUTES.USER.GET_CURRENT_USER_INFO);
  }

  static async updateProfile(
    body: IProfileUpdateBody
  ): Promise<AxiosResponse<ApiResponse>> {
    return apiService.post(API_ROUTES.USER.UPDATE_PROFILE, body);
  }

  static async changePassword(
    body: IChangePasswordBody
  ): Promise<AxiosResponse<ApiResponse>> {
    return apiService.post(API_ROUTES.USER.CHANGE_PASSWORD, body);
  }

  static async receiveNotifications(
    status: boolean
  ): Promise<AxiosResponse<ApiResponse>> {
    return apiService.post(API_ROUTES.USER.RECEIVE_NOTIFICATIONS, { status });
  }
}
