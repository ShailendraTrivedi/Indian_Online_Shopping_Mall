import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    token: null,
    data: null,
    loading: false,
  },
  reducers: {
    signInRequest: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.token = action.payload;
    },
    signInFailure: (state) => {
      state.loading = false;
    },
    signUpRequest: (state) => {
      state.loading = true;
    },
    signUpSuccess: (state) => {
      state.loading = false;
    },
    signUpFailure: (state) => {
      state.loading = false;
    },
    fetchUserRequest: (state) => {
      state.loading = true;
    },
    fetchUserSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchUserFailure: (state) => {
      state.loading = false;
    },
  },
});

export const {
  signInRequest,
  signInSuccess,
  signInFailure,
  signUpRequest,
  signUpSuccess,
  signUpFailure,
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure,
} = userSlice.actions;

export default userSlice.reducer;
