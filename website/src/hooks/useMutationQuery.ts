import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { client } from '@/api/client';
import { ApiResponse } from '@/utils/ApiHandler';

type MutationMethod = 'post' | 'put' | 'patch' | 'delete';

export function useMutationQuery<T, B = unknown>(
    method: MutationMethod,
    url: string,
    options?: UseMutationOptions<ApiResponse<T>, Error, B>
) {
    return useMutation<ApiResponse<T>, Error, B>({
        mutationFn: (body: B) => {
            switch (method) {
                case 'post':
                    return client.post<T, B>(url, body);
                case 'put':
                    return client.put<T, B>(url, body);
                case 'patch':
                    return client.patch<T, B>(url, body);
                case 'delete':
                    //! for delete, we might not always have a body in future if we need we can change accordingly
                    return client.delete<T>(url) as Promise<ApiResponse<T>>;
                default:
                    throw new Error(`Invalid method: ${method}`);
            }
        },
        ...options,
    });
}
