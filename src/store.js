import { configureStore } from "@reduxjs/toolkit";
// slice
import Auth from "./slices/AuthSlices";

const store = configureStore({
  reducer: {
    Auth
  },
});

export default store;
