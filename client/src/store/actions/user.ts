import UserService from "@/services/user.service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ICurrentUserInfo } from "../../../types/user";

export class UserActions {
  static fetchUserInfo = "user/fetchCurrentUserInfo";

  static fetchCurrentUserInfo = createAsyncThunk(
    this.fetchUserInfo,
    async () => {
      try {
        const response = await UserService.getCurrentUserInfo();
        return response.data as ICurrentUserInfo;
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  );
}
