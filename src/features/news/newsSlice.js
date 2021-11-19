import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchNews = createAsyncThunk("news/fetch", async (_, thunkAPI) => {
  try {
    const responce = await axios("/news");

    return responce.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

export const addNews = createAsyncThunk("news/add", async (data, thunkAPI) => {
  try {
    const responce = await axios.post("/news", data);

    return responce.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

export const approveNews = createAsyncThunk("news/approve", async (id, thunkAPI) => {
  try {
    const responce = await axios.patch(`news/${id}`, { approved: true });

    return responce.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

export const deleteNews = createAsyncThunk("news/delete", async (id, thunkAPI) => {
  try {
    await axios.delete(`news/${id}`);

    return id;
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});

const newsSlice = createSlice({
  name: "news",
  initialState: {
    news: [],
    loading: false,
    addLoading: false,
  },

  extraReducers: {
    [fetchNews.pending]: (state) => {
      state.loading = true;
    },
    [fetchNews.fulfilled]: (state, action) => {
      state.news = action.payload;
      state.loading = false;
    },
    [fetchNews.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [addNews.pending]: (state) => {
      state.addLoading = true;
    },
    [addNews.fulfilled]: (state, action) => {
      state.news.push(action.payload);
      state.addLoading = false;
    },
    [addNews.rejected]: (state, action) => {
      state.error = action.payload;
      state.addLoading = false;
    },
    [approveNews.fulfilled]: (state, action) => {
      state.news = state.news.map((item) => {
        if (item.id === action.payload.id) {
          item.approved = true;
        }
        return item;
      });
    },
    [approveNews.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [deleteNews.fulfilled]: (state, action) => {
      state.news = state.news.filter((item) => item.id !== action.payload);
    },
    [deleteNews.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

const selectNewsState = (state) => state.newsSlice;

export const selectNews = createSelector(selectNewsState, (state) => state.news);
export const selectLoading = createSelector(selectNewsState, (state) => state.loading);
export const selectAddLoading = createSelector(selectNewsState, (state) => state.addLoading);
export const selectNewsByApproved = createSelector(selectNewsState, (state) =>
  state.news.filter((i) => i.approved)
);

export default newsSlice.reducer;
