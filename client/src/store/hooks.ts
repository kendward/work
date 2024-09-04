import { useAppSelector } from "@/hooks/useAppSelector";

export const useLayout = () => {
  return useAppSelector((state) => state.layout);
};

export const useTab = () => {
  return useAppSelector((state) => state.tab);
};
