// import { configureStore } from "@reduxjs/toolkit";
// import { authApi } from "../features/auth/authApi";
// import authReducer from "../features/auth/authSlice";

// export const store = configureStore({
//   reducer: {
//     [authApi.reducerPath]: authApi.reducer,
//     auth: authReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(authApi.middleware),
// });


import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from '../features/auth/authSlice';
import { authApi } from '../features/auth/authApi';
import { aboutApi } from '../features/about/aboutApi';
import { apiSlice } from '../features/api/apiSlice';

// Function to load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('authState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// Function to save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('authState', serializedState);
  } catch {
    // ignore write errors
  }
};

// Load persisted state
const persistedState = loadState();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [aboutApi.reducerPath]: aboutApi.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  preloadedState: persistedState ? { auth: persistedState } : undefined,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware , aboutApi.middleware,apiSlice.middleware),
});

// Subscribe to store changes to persist the auth state
store.subscribe(() => {
  saveState({
    user: store.getState().auth.user,
    accessToken: store.getState().auth.accessToken,
    isAuthenticated: store.getState().auth.isAuthenticated,
  });
});

setupListeners(store.dispatch);