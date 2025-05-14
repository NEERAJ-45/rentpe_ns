import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'vendor' | 'admin';
}

interface AuthState {
    user: User | null;
    token: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

// const initialState: AuthState = {
//     user: null,
//     token: null,
//     status: 'idle',
//     error: null,
// };

const initialState: AuthState = {
    user:
        process.env.NODE_ENV === 'development'
            ? {
                  id: 'dummy123',
                  name: 'Dummy User',
                  email: 'dummy@example.com',
                  role: 'vendor',
              }
            : null,
    token: process.env.NODE_ENV === 'development' ? 'dummy-token-123' : null,
    status: 'idle',
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.status = 'loading';
        },
        loginSuccess: (state, action: PayloadAction<{ user: User; token: string }>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.status = 'idle';
        },
        loginFailure: (state) => {
            state.status = 'failed';
            // state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
