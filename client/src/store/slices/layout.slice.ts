import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LayoutState {
  sheetOpen: boolean;
}

const initialState: LayoutState = {
  sheetOpen: false,
};

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    toggleSheetOpen: (state, action: PayloadAction<boolean>) => {
      state.sheetOpen = action.payload;
    },
  },
});

export const { toggleSheetOpen } = layoutSlice.actions;
export default layoutSlice.reducer;
