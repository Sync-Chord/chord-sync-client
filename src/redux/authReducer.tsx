import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interfaces
interface User {
  id: string;
  name: string;
  email?: string;
  phone_number?: string;
  age?: number;
  gender?: string;
  profile_photo?: string;
  created_at: Date;
  updated_at: Date;
}

interface AuthState {
  token: string | null;
  user: User | null;
  logged_in: boolean;
  loading: boolean;
  error: string | null;
}

// constants
const local_data = localStorage.getItem("user");
const user_data = local_data ? JSON.parse(local_data) : null;

const user: User | null = user_data ? user_data.user : null;

const initial_state: AuthState = {
  token: user_data ? user_data.token : null,
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
    success_reducer: (state: AuthState, action: any) => {
      state.user = action.payload?.user;
      state.token = action.payload?.token;
      state.logged_in = true;
      state.loading = false;
      state.error = null;
      localStorage.setItem(
        "user",
        JSON.stringify({ user: state.user, token: state.token })
      );
    },
    error_reducer: (state: AuthState, action: PayloadAction<string>) => {
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
    update_user_details_reducer: (
      state: AuthState,
      action: PayloadAction<Partial<User>>
    ) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem(
          "user",
          JSON.stringify({ user: state.user, token: state.token })
        );
      }
    },
  },
});

export const {
  loading_reducer,
  success_reducer,
  error_reducer,
  remover_error_reducer,
  remover_loading_reducer,
  logout_reducer,
  update_user_details_reducer,
} = auth_slice.actions;

export default auth_slice.reducer;
