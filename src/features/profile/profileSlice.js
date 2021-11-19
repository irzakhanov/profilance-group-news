import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk("profile/login", async (data, thunkAPI) => {
  try {
    const responce = await axios("/users");
    const candidate = responce.data.find(
      (user) => user.login === data.login && user.password === data.password
    );

    if (candidate) {
      return candidate;
    } else {
      return thunkAPI.rejectWithValue("Неверный логин или пароль!");
    }
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    user: { role: "guest" },
    isAuth: false,
    loading: false,
    error: "",
  },
  reducers: {
    logout: (state) => {
      state.user = { role: "guest" };
      state.isAuth = false;
      state.error = "";
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.isAuth = true;
      state.error = "";
    },
    [login.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

const selectProfileState = (state) => state.profileSlice;

export const selectUser = createSelector(selectProfileState, (state) => state.user);
export const selectLoading = createSelector(selectProfileState, (state) => state.loading);
export const selectError = createSelector(selectProfileState, (state) => state.error);
export const selectIsAuth = createSelector(selectProfileState, (state) => state.isAuth);

export const { logout } = profileSlice.actions;

export default profileSlice.reducer;
