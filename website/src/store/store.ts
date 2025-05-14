import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import categoryReducer from '@/features/category/categorySlice';
import authReducer from '@/features/auth/authSlice';

export const store = configureStore({
    reducer: {
        category: categoryReducer, // Add the category reducer
        auth: authReducer,
    },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
