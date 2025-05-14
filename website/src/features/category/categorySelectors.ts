import { RootState } from '@/store/store';

export const selectCurrentCategory = (state: RootState) => state.category.currentCategory;
