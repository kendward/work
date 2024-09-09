import { useEffect } from "react";
import { useUserActions } from "./actions/useUserAction";
import { useIsClient } from "./useIsClient";

export const useCurrentUserData = () => {
  const { getCurrentUser } = useUserActions();
  const isClient = useIsClient();

  useEffect(() => {
    isClient && getCurrentUser();
  }, [isClient]);
};
