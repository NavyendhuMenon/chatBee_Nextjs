import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  email: string;
  password: string;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  email: "",
  password: "",
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ email: string; password: string }>
    ) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },

    clearAuth: (state) => {
      (state.email = ""),
        (state.password = ""),
        (state.isAuthenticated = false);
    },
  },
});

export const { setCredentials, setAuthenticated, clearAuth } =
  authSlice.actions;

export default authSlice.reducer;
