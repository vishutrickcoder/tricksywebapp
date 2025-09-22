import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      state.isAuthenticated = true;
    },
    clearAuth: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, clearAuth } = authSlice.actions;
export default authSlice.reducer;


// import { createSlice } from "@reduxjs/toolkit";

// // Check if we have a persisted state
// const persistedState = JSON.parse(localStorage.getItem('authState') || 'null');

// const initialState = persistedState || {
//   user: null,
//   accessToken: null,
//   isAuthenticated: false,
//   loading: true, // initially true to wait for refresh-token check
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setCredentials: (state, action) => {
//       const { accessToken } = action.payload;
//       state.accessToken = accessToken;
//       state.isAuthenticated = true;
//       state.loading = false;
//     },
//     setUser: (state, action) => {
//       state.user = action.payload;
//     },
//     clearAuth: (state) => {
//       state.user = null;
//       state.accessToken = null;
//       state.isAuthenticated = false;
//       state.loading = false;
//     },
//     setLoading: (state, action) => {
//       state.loading = action.payload;
//     },
//   },
// });

// export const { setCredentials, setUser, clearAuth, setLoading } = authSlice.actions;
// export default authSlice.reducer;