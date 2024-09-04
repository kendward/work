import { TAB_HEADERS, TAB_TYPES } from "@/constants/tabs";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Tab = {
  [key: string]: Record<string, string>;
};

interface LayoutState {
  tabType: TAB_HEADERS | null;
  activeTab: string;
}

const initialState: LayoutState = {
  tabType: null,
  activeTab: "",
};

const tabSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    setTabType: (state, action: PayloadAction<TAB_HEADERS>) => {
      state.tabType = action.payload;
    },
    resetTab: (state) => {
      state.activeTab = "";
    },
  },
});

export const { setActiveTab, resetTab, setTabType } = tabSlice.actions;
export default tabSlice.reducer;
