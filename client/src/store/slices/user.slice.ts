import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserActions } from "../actions/user";
import { ICurrentUserInfo } from "../../../types/user";

interface IUserState {
  user: ICurrentUserInfo;
}
const initialState: IUserState = {
  user: {
    name: "",
    email: "",
    organization: {
      email: "",
      billingInformation: {
        name: "",
        address: "",
        country: "",
        zipCode: "",
        vatNumber: "",
        vatCountry: "",
      },
    },
    receiveUpdates: false,
  },
};

const userSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setCurrentUserInfo: (state, action: PayloadAction<ICurrentUserInfo>) => {
      state.user = action.payload;
    },
    updateCurrentUserInfo: (state, action: PayloadAction<ICurrentUserInfo>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      UserActions.fetchCurrentUserInfo.fulfilled,
      (state, action) => {
        state.user = action.payload;
      }
    );
  },
});

export const { setCurrentUserInfo, updateCurrentUserInfo } = userSlice.actions;
export default userSlice.reducer;
