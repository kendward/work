import { configureStore } from "@reduxjs/toolkit";
import loggerMiddleware from "./middleware/loggerMiddleware";
import layoutReducer from "./slices/layout.slice";
import tabReducer from "./slices/tab.slice";
import userReducer from "./slices/user.slice";

export const store = configureStore({
  reducer: {
    layout: layoutReducer,
    tab: tabReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
