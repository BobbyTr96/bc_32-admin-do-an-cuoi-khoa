import { configureStore } from "@reduxjs/toolkit";
// slice
import Auth from "./slices/AuthSlices";
import CourseSlice from "./slices/CourseSlice";

const store = configureStore({
  reducer: {
    Auth,
    CourseSlice,
  },
});

export default store;
