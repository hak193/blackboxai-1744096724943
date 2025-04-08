import { configureStore } from '@reduxjs/toolkit';
import authReducer, { AuthState } from './slices/authSlice';

const reducer = {
  auth: authReducer,
};

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export interface RootState {
  auth: AuthState;
}

export type AppDispatch = typeof store.dispatch;
