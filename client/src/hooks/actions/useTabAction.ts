import { resetTab, setActiveTab, setTabType } from "@/store/slices/tab.slice";
import { useAppDispatch } from "../useAppDispatch";
import { TAB_HEADERS } from "@/constants/tabs";

export const useTabActions = () => {
  const dispatch = useAppDispatch();

  const setTab = (val: string) => {
    dispatch(setActiveTab(val));
  };
  const setActiveTabType = (type: TAB_HEADERS) => {
    dispatch(setTabType(type));
  };
  const resetActiveTab = () => {
    dispatch(resetTab());
  };

  return { setTab, resetActiveTab, setActiveTabType };
};
