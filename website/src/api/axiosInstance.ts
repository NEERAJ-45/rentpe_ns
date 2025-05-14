/**
 * This file is responsible for making API calls to the backend.
 * It uses Axios for making HTTP requests and intercepts the requests and responses.
 * Right now, there is no logic of abort controller in future version we will add.
 * duration is added to the response object to track the time taken for the request for devops purposes.
 */

import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { ApiError } from '../utils/ApiHandler';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

if (!baseUrl) {
    throw new Error('VITE_API_BASE_URL is not defined in environment variables.');
}

export const API = {
    BASE_URL: baseUrl,
    VERSION: import.meta.env.VITE_API_VERSION || 'api/v1',
};

export const api: AxiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
        Accept: 'application/json',
    },
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const { getItem } = useLocalStorage('access_token');
    const token = getItem();

    if (token && typeof token === 'string') {
        config.headers.Authorization = `Bearer ${token}`;
    }

    config.metadata = { startTime: Date.now() };

    return config;
});

api.interceptors.response.use(
    (response: AxiosResponse) => {
        const duration = response.config.metadata?.startTime
            ? Date.now() - response.config.metadata.startTime
            : 0;

        console.log(`[API] ${response.config.url} (${duration}ms)`);
        response.data.duration = duration;
        return response;
    },
    (error: any) => {
        if (axios.isCancel(error)) {
            throw new ApiError(499, 'Request cancelled');
        }

        const duration = error.config?.metadata?.startTime
            ? Date.now() - error.config.metadata.startTime
            : 0;

        console.error(`[API] ${error.config?.url} failed after ${duration}ms`);

        if (error.response) {
            throw new ApiError(
                error.response.status,
                error.response.data?.message || 'Network error',
                error.response.data?.errors || [error.message],
                error.response.data?.data || null,
                duration
            );
        } else {
            throw new ApiError(500, 'Network error', [error.message], null, duration);
        }
    }
);
