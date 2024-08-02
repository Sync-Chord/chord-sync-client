// module imports
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  // Define the shape of your user object here
  id: string;
  name: string;
  // Add other user fields as needed
}

interface AuthState {
  user: User | null;
  logged_in: boolean;
  loading: boolean;
  error: string | null;
}

const local_data = localStorage.getItem("user");
const user: User | null = local_data ? JSON.parse(local_data) : null;

const initial_state: AuthState = {
  user: user ? user : null,
  logged_in: user ? true : false,
  loading: false,
  error: null,
};

export const auth_slice = createSlice({
  name: "auth",
  initialState: initial_state,
  reducers: {
    loading: (state: AuthState) => {
      state.user = null;
      state.logged_in = false;
      state.error = null;
      state.loading = true;
    },
    success: (state: AuthState, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.logged_in = true;
      state.error = null;
      state.loading = false;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    error: (state: AuthState, action: PayloadAction<string>) => {
      state.user = null;
      state.logged_in = false;
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state: AuthState) => {
      state.user = null;
      state.logged_in = false;
      state.error = null;
      state.loading = false;
      localStorage.clear();
    },
  },
});

export const { loading, success, error } = auth_slice.actions;

export default auth_slice.reducer;
