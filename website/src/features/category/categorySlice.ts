import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CategoryState {
    currentCategory: string;
}

const initialState: CategoryState = {
    currentCategory: 'all',
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setCategory: (state, action: PayloadAction<string>) => {
            state.currentCategory = action.payload;
        },
    },
});

export const { setCategory } = categorySlice.actions;

export default categorySlice.reducer;
