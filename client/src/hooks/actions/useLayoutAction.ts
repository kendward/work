import { toggleSheetOpen } from "@/store/slices/layout.slice";
import { useAppDispatch } from "../useAppDispatch";
import { useRouter } from "next/navigation";
import { useIsClient } from "../useIsClient";
import { useTabActions } from "./useTabAction";

export const useLayoutActions = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isClient = useIsClient();
  const { resetActiveTab } = useTabActions();

  const toggleSheet = (val: boolean) => {
    if (isClient && val === false) {
      resetActiveTab();
      router.replace(window.location.pathname);
    }
    dispatch(toggleSheetOpen(val));
  };

  return { toggleSheet };
};
