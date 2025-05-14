/**
 * I did not implemented state synchronization between local storage and react states, redux or context.
 * change accordingly if you need it for better performance.
 */

export const useLocalStorage = <T>(key: string, initialValue?: T) => {
    const isAvailable = typeof window !== 'undefined' && window.localStorage;

    const setItem = (value: T) => {
        if (!isAvailable) return;

        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            if (error instanceof DOMException && error.name === 'QuotaExceededError') {
                console.error('LocalStorage quota exceeded');
            } else {
                console.error('LocalStorage setItem error:', error);
            }
        }
    };

    const getItem = (): T | null => {
        if (!isAvailable) return initialValue ?? null;
        try {
            const value = window.localStorage.getItem(key);
            return value ? JSON.parse(value) : (initialValue ?? null);
        } catch (error) {
            console.error('LocalStorage getItem error:', error);
            return initialValue ?? null;
        }
    };

    const removeItem = () => {
        try {
            window.localStorage.removeItem(key);
        } catch (error) {
            console.error('LocalStorage removeItem error:', error);
        }
    };

    return {
        setItem,
        getItem,
        removeItem,
    };
};
