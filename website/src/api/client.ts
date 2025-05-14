// client.ts
import { api } from './axiosInstance';
import { ApiResponse, ApiError } from '../utils/ApiHandler';

type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

type RequestOptions<B = unknown> = {
    params?: Record<string, any>;
    body?: B;
};

type ClientMethods = {
    get: <T>(url: string, params?: Record<string, any>) => Promise<ApiResponse<T>>;
    post: <T, B = unknown>(url: string, body?: B) => Promise<ApiResponse<T>>;
    put: <T, B = unknown>(url: string, body?: B) => Promise<ApiResponse<T>>;
    patch: <T, B = unknown>(url: string, body?: B) => Promise<ApiResponse<T>>;
    delete: <T>(url: string) => Promise<ApiResponse<T>>;
};

const safeRequest = async <T, B = unknown>(
    method: HttpMethod,
    url: string,
    { params, body }: RequestOptions<B> = {}
): Promise<ApiResponse<T>> => {
    try {
        const response = await api.request<T>({
            method,
            url,
            params,
            data: body,
        });

        return new ApiResponse(response.status, response.data, 'Success');
    } catch (error) {
        if (error instanceof ApiError) throw error;

        throw new ApiError(500, `Unexpected error in ${method.toUpperCase()}`, [
            error instanceof Error ? error.message : String(error),
        ]);
    }
};

export const client: ClientMethods = {
    get: <T>(url: string, params?: Record<string, any>) => safeRequest<T>('get', url, { params }),

    post: <T, B = unknown>(url: string, body?: B) => safeRequest<T, B>('post', url, { body }),

    put: <T, B = unknown>(url: string, body?: B) => safeRequest<T, B>('put', url, { body }),

    patch: <T, B = unknown>(url: string, body?: B) => safeRequest<T, B>('patch', url, { body }),

    delete: <T>(url: string) => safeRequest<T>('delete', url),
};
