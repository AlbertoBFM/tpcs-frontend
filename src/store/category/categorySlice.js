import { createSlice } from '@reduxjs/toolkit';

const categories = [
    {
        _id: new Date().getTime(),
        name: 'Teclados',
        description: 'Periférico de uso masivo',
    },
    {
        _id: new Date().getTime() + 999999999,
        name: 'Impresoras',
        description: 'Utilizado mayormente en oficinas',
    },
];

export const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categories: categories,
        activeCategory: null,
    },
    reducers: {
        onSetActiveCategory: ( state, { payload } ) => {
            state.activeCategory = payload;
        }
    }
});


// Action creators are generated for each case reducer function
export const { onSetActiveCategory } = categorySlice.actions;