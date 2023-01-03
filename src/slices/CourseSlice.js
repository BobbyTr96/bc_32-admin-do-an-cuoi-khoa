import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chooseUserToRegited: null,
};

const CourseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    choose: (state, action) => {
      return { ...state, chooseUserToRegited: action.payload };
    },
  },
});

export const { choose } = CourseSlice.actions;
export default CourseSlice.reducer;
