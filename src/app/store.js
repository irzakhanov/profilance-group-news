import { configureStore } from "@reduxjs/toolkit";
import newsSlice from "../features/news/newsSlice";
import profileSlice from "../features/profile/profileSlice";

const store = configureStore({ reducer: { newsSlice, profileSlice } });

export default store;
