import { QueryClient } from '@tanstack/react-query';

declare module '@tanstack/react-query' {
    interface Register {
        defaultError: AxiosError;
    }
}

// declare module '@/lib/react-query' {
//     export const queryClient: QueryClient;
// }
