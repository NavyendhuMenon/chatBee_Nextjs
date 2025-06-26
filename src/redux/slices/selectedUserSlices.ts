import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../api/userApi";

interface SelectedUserState {
  selectedUser: User | null;
}

const initialState: SelectedUserState = {
  selectedUser: null,
};

const selectedUserSlice = createSlice({
  name: "selectedUser",

  initialState,
  reducers: {
    setSelectedUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload;
    },
  },
});

export const { setSelectedUser } = selectedUserSlice.actions;

export default selectedUserSlice.reducer;
