import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
  isAuthenticated: false,
  isLoading: true,
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
        'http://localhost:8000/api/auth/signin',  // Ensure correct endpoint for signin
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

export const checkAuth = createAsyncThunk(
  '/auth/checkAuth',  // action name should reflect the action being performed
  async () => {
    try {
      const response = await axios.get(
        'http://localhost:8000/api/auth/checkAuth',  // Ensure correct endpoint for checkAuth
        {
          withCredentials: true,  // Send cookies with the request
          headers : {
            "cache-Control" : "no-store, no-cache, must-revalidate, proxy-revalidate",
            expiresIn: "0"
          }
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
    // Action to log the user out
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    
    // Action to set the user (this can be used if you need to manually set the user)
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup User
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      
      // Signin User
      .addCase(signinUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signinUser.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
          state.user = action.payload.user;
          state.isAuthenticated = true;
        } else {
          state.user = null;
          state.isAuthenticated = false;
        }
      })
      .addCase(signinUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      // Check Auth
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
          state.user = action.payload.user;
          state.isAuthenticated = true;
        } else {
          state.user = null;
          state.isAuthenticated = false;
        }
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
