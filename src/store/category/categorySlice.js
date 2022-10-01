import { createSlice } from '@reduxjs/toolkit';

export const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categories: [],
        isLoadingCategories: true,
        activeCategory: null,
    },
    reducers: {
        onSetActiveCategory: ( state, { payload } ) => {
            state.activeCategory = payload;
        },
        onLoadCategories: ( state, { payload = [] } ) => {
            state.isLoadingCategories = false;
            state.categories = payload;
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
        onLogoutCategory: ( state ) => {
            state.categories = [];
            state.isLoadingCategories = true;
            state.activeCategory = null;
        }
    }
});


// Action creators are generated for each case reducer function
export const { onSetActiveCategory, onLoadCategories, onAddNewCategory, onUpdateCategory, onDeleteCategory, onLogoutCategory } = categorySlice.actions;