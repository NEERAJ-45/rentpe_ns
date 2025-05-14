import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { client } from '@/api/client';
import { ApiResponse } from '@/utils/ApiHandler';

export function useGetQuery<T>(
    queryKey: string[],
    url: string,
    params?: Record<string, any>, // in future we will make more type safe
    options?: UseQueryOptions<ApiResponse<T>, Error>
) {
    return useQuery<ApiResponse<T>, Error>({
        queryKey,
        queryFn: () => client.get<T>(url, params),
        ...options,
    });
}
