import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCategory } from '@/features/category/categorySlice';

export const useCategory = () => {
    const dispatch = useAppDispatch();
    const currentCategory = useAppSelector((state) => state.category.currentCategory);

    //later create enum for category or depending upon backend make changes
    const changeCategory = (category: string) => {
        dispatch(setCategory(category));
    };

    return {
        currentCategory,
        changeCategory,
    };
};
