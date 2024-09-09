import { AxiosResponse } from "axios";
import apiService from "@/utils/api";
import { ApiResponse } from "../../types/common";
import { API_ROUTES } from "@/constants/api-routes";
import {
  IDeleteOrganizationBody,
  ISaveBillingInfoBody,
} from "../../types/organization";

export default class OrganizationService {
  static async saveBillingInformation(
    body: ISaveBillingInfoBody
  ): Promise<AxiosResponse<ApiResponse>> {
    return apiService.post(API_ROUTES.ORGANIZATION.SAVE_BILLING_INFO, body);
  }
  static async deleteAccount(
    body: IDeleteOrganizationBody
  ): Promise<AxiosResponse<ApiResponse>> {
    return apiService.post(API_ROUTES.ORGANIZATION.DELETE_ACCOUNT, body);
  }
}
