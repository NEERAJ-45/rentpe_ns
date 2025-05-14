import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { useAppDispatch } from '@/store/hooks';
import { loginSuccess, loginFailure, logout } from '@/features/auth/authSlice';
import { queryKeys } from '@/constants/queryKeys';

interface User {
    id: string;
    name: string;
    email: string;
    role: 'user' | 'vendor' | 'admin';
}

interface AuthResponse {
    user: User;
    token: string;
    role: 'user' | 'vendor' | 'admin';
}

interface LoginCredentials {
    email: string;
    password: string;
}

interface RegisterData extends LoginCredentials {
    name: string;
}

interface ApiError {
    message: string;
    statusCode: number;
}

const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await axios.post<AuthResponse>('/api/auth/login', credentials);
    return response.data;
};

const registerUser = async (userData: RegisterData): Promise<AuthResponse> => {
    const response = await axios.post<AuthResponse>('/api/auth/register', userData);
    return response.data;
};

const logoutUser = async (): Promise<void> => {
    await axios.post('/api/auth/logout');
};

export const useAuthApi = () => {
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();

    const loginMutation = useMutation<AuthResponse, AxiosError<ApiError>, LoginCredentials>({
        mutationFn: loginUser,
        onSuccess: (data) => {
            dispatch(loginSuccess(data));
            queryClient.invalidateQueries({
                queryKey: queryKeys.auth.currentUser,
            });
            queryClient.removeQueries({
                queryKey: queryKeys.cart.all,
            });
        },
        onError: (error) => {
            dispatch(loginFailure());
            console.log('Login failed', error.response?.data?.message || error.message);
        },
    });

    const registerMutation = useMutation<AuthResponse, AxiosError<ApiError>, RegisterData>({
        mutationFn: registerUser,
        onSuccess: (data) => {
            dispatch(loginSuccess(data));
            queryClient.invalidateQueries({
                queryKey: queryKeys.auth.currentUser,
            });
        },
        onError: (error) => {
            dispatch(loginFailure());
            console.log('Register failed', error.response?.data?.message || error.message);
        },
    });

    const logoutMutation = useMutation<void, AxiosError<ApiError>>({
        mutationFn: logoutUser,
        onMutate: async () => {
            //optimistic update
            dispatch(logout());
            await queryClient.cancelQueries();

            //clear all cached queries except configurations
            queryClient.clear();
        },
        onError: (error: AxiosError<ApiError>) => {
            console.log('Logout failed', error.response?.data?.message || error.message);
        },
    });

    return {
        login: loginMutation.mutate,
        loginAsync: loginMutation.mutateAsync,
        register: registerMutation.mutate,
        registerAsync: registerMutation.mutateAsync,
        logout: logoutMutation.mutate,
        logoutAsync: logoutMutation.mutateAsync,
        isLoggingIn: loginMutation.isPending,
        isRegistering: registerMutation.isPending,
        isLoggingOut: logoutMutation.isPending,
        loginError: loginMutation.error,
        registerError: registerMutation.error,
        logoutError: logoutMutation.error,
    };
};
