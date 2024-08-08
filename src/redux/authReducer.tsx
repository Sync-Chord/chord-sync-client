// module imports
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interfaces
interface User {
  id: string;
  name: string;
}

interface AuthState {
  user: User | null;
  logged_in: boolean;
  loading: boolean;
  error: string | null;
}

// contants
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
    loading_reducer: (state: AuthState) => {
      state.user = null;
      state.logged_in = false;
      state.loading = true;
      state.error = null;
    },
    success_reducer: (state: AuthState, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.logged_in = true;
      state.loading = false;
      state.error = null;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    error_reducer: (state: AuthState, action: any) => {
      state.user = null;
      state.logged_in = false;
      state.error = action.payload;
      state.loading = false;
    },

    remover_error_reducer: (state: AuthState) => {
      state.error = null;
    },
    remover_loading_reducer: (state: AuthState) => {
      state.loading = false;
    },

    logout_reducer: (state: AuthState) => {
      state.user = null;
      state.logged_in = false;
      state.loading = false;
      localStorage.clear();
    },
  },
});

export const {
  loading_reducer,
  success_reducer,
  error_reducer,
  remover_error_reducer,
  remover_loading_reducer,
} = auth_slice.actions;

export default auth_slice.reducer;
