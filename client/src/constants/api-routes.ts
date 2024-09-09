// Define All Api Routes Here

export const API_ROUTES = {
  AUTH: {
    SIGN_IN: "/auth/sign-in",
    SIGN_UP: "/auth/sign-up",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    VERIFY_ACCOUNT: "/auth/verify-account",
    VERIFY_EMAIL: "/auth/verify-email",
    REFRESH_TOKEN: "/auth/refresh-token",
    LOGOUT: "/auth/logout",
  },
  USER: {
    GET_CURRENT_USER_INFO: "/User/GetCurrentUserInfo",
    UPDATE_PROFILE: "/User/UpdateProfile",
    CHANGE_PASSWORD: "/User/ChangePassword",
    RECEIVE_NOTIFICATIONS: "/User/ReceiveNotificationsStatus",
  },
  ORGANIZATION: {
    SAVE_BILLING_INFO: "/Organization/SaveBillingInformation",
    DELETE_ACCOUNT: "/Organization/DeleteAccount",
  },
};
