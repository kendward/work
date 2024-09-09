import { updateCurrentUserInfo } from "@/store/slices/user.slice";
import { useAppDispatch } from "../useAppDispatch";
import { UserActions } from "@/store/actions/user";
import { ICurrentUserInfo } from "../../../types/user";

export const useUserActions = () => {
  const dispatch = useAppDispatch();

  const getCurrentUser = () => {
    dispatch(UserActions.fetchCurrentUserInfo());
  };

  const updateCurrentUserState = (user: ICurrentUserInfo) => {
    dispatch(updateCurrentUserInfo(user));
  };

  return { getCurrentUser, updateCurrentUserState };
};
