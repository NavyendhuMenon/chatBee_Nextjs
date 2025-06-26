import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./api/userApi";
import selectedUserReducer from "./slices/selectedUserSlices";

export const store = configureStore({
  reducer: {
    selectedUser: selectedUserReducer,
    [userApi.reducerPath]: userApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
