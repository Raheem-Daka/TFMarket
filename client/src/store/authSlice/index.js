import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

const authSlice = createSlice({
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
    
    // Action to clear the user (log out)
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    
    // Action to set loading state (optional)
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setUser, logout, setLoading } = authSlice.actions;

export default authSlice.reducer;
