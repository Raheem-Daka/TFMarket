import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
};


// Corrected the name of the action and fixed axios call
export const signupUser = createAsyncThunk(
  '/auth/signup',  // action name should reflect the action being performed
  async (FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/auth/signup',  // Ensure correct endpoint for signup
        FormData,
        {
          withCredentials: true,  // Send cookies with the request
        }
      );
      return response.data; // Return the response data on success
    } catch (error) {
      // Handle error response
      return rejectWithValue(error.response.data || 'Something went wrong!');
    }
  }
);

export const signinUser = createAsyncThunk(
  '/auth/signin',  // action name should reflect the action being performed
  async (FormData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/auth/signin',  // Ensure correct endpoint for signup
        FormData,
        {
          withCredentials: true,  // Send cookies with the request
        }
      );
      return response.data; // Return the response data on success
    } catch (error) {
      // Handle error response
      return rejectWithValue(error.response.data || 'Something went wrong!');
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action to set the user
    setUser: (state, action) => {
      // Set the user data from the action payload
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false; // you can set loading to false after user data is fetched
    },
    
    extraReducers: (builder)=> {
        builder
        .addCase(signupUser.pending, (state)=>{
            state.isLoading = true
        })
        .addCase(signupUser.fulfilled, (state, action)=> {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false
        })
        .addCase(signupUser.rejected, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false
        })
        .addCase(signinUser.pending, (state)=>{
          state.isLoading = true
        })
        .addCase(signinUser.fulfilled, (state, action)=> {
            state.isLoading = false;
            state.user = action.payload;
            state.isAuthenticated = true
        })
        .addCase(signinUser.rejected, (state, action) => {
            state.isLoading = false;
            state.user = null;
            state.isAuthenticated = false
        })
    }
  },
});

export const { setUser, logout, setLoading } = authSlice.actions;

export default authSlice.reducer;
