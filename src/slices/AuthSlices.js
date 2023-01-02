import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthAPI from "../services/AuthAPI";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: null,
  error: null,
  chooseUser: JSON.parse(sessionStorage.getItem("chooseUser")) || null,
};

export const logIn = createAsyncThunk("dangNhap", async (payload) => {
  try {
    const data = await AuthAPI.userSignin(payload);
    return data;
  } catch (error) {
    throw error;
  }
});

const Auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      localStorage.removeItem("user");
      return { ...state, user: null };
    },
    handleChoose: (state, action) => {
      sessionStorage.setItem("chooseUser", JSON.stringify(action.payload));
      return { ...state, chooseUser: action.payload };
    },
    doneEdit: (state) => {
      sessionStorage.removeItem("chooseUser");
      return { ...state, chooseUser: null };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logIn.pending, (state, action) => {
      return { ...state, loading: true };
    });
    builder.addCase(logIn.fulfilled, (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, loading: false, user: action.payload, error: null };
    });
    builder.addCase(logIn.rejected, (state, action) => {
      return { ...state, loading: false, error: action.error };
    });
  },
});
export const { handleRemember, logOut, handleChoose, doneEdit } = Auth.actions;
export default Auth.reducer;
