export const queryKeys = {
    auth: {
        currentUser: ['auth', 'currentUser'],
    },
    categories: {
        all: ['categories', 'all'],
        category: ['categories', 'category'],
    },
    cart: {
        all: ['cart', 'all'],
    },
    prdocuts: {
        all: ['products'],
        byCategory: (category: string) => ['products', category],
        detail: (id: string) => ['products', id],
    },
} as const;
