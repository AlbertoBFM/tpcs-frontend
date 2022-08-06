import { createSlice } from '@reduxjs/toolkit';

const tempCategories = [
    {
        _id: "123456789",
        name: 'Teclados',
        description: 'Periférico de uso masivo',
    },
    {
        _id: "987654321",
        name: 'Impresoras',
        description: 'Utilizado mayormente en oficinas',
    },
    {
        _id: "147258369",
        name: 'Monitores',
        description: 'Sirven pa ver negro :V',
    },
];

export const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categories: tempCategories,
        activeCategory: null,
    },
    reducers: {
        onSetActiveCategory: ( state, { payload } ) => {
            state.activeCategory = payload;
        },
        onAddNewCategory: ( state, { payload } ) => {
            state.categories.push( payload );
            state.activeCategory = null;
        },
        onUpdateCategory: ( state, { payload } ) => {
            state.categories = state.categories.map( category => {
                if ( category._id === payload._id ) return payload;
                
                return category;
            });
            state.activeCategory = null;
        },
        onDeleteCategory: ( state ) => {
            state.categories = state.categories.filter( category => category._id !== state.activeCategory._id );
            state.activeCategory = null;
        },
    }
});


// Action creators are generated for each case reducer function
export const { onSetActiveCategory, onAddNewCategory, onUpdateCategory, onDeleteCategory } = categorySlice.actions;