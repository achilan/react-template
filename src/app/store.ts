import { configureStore } from '@reduxjs/toolkit'

import postsReducer from '../features/posts/postsSlice';
import authReducer from '../features/users/authSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
  },
});

// Types for useSelector/useDispatch
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
