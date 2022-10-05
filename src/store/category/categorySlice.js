import { createSlice } from '@reduxjs/toolkit';

export const categorySlice = createSlice({
    name: 'category',
    initialState: {
        allCategories: [],
        categories: [],
        searchedName: "",
        isLoadingCategories: true,
        activeCategory: null,
    },
    reducers: {
        onSetActiveCategory: ( state, { payload } ) => {
            state.activeCategory = payload;
        },
        onLoadAllCategories: ( state, { payload = [] } ) => {
            // state.isLoadingCategories = false;
            state.allCategories = payload;
        },
        onLoadCategories: ( state, { payload = [] } ) => {
            state.isLoadingCategories = false;
            state.categories = payload;
        },
        onChangeSearchedName: ( state, { payload } ) => {
            state.searchedName = payload;
        },
        onAddNewCategory: ( state, { payload } ) => {
            state.categories.docs.push( payload );
            state.activeCategory = null;
        },
        onUpdateCategory: ( state, { payload } ) => {
            state.categories.docs = state.categories.docs.map( category => {
                if ( category._id === payload._id ) return payload;
                
                return category;
            });
            state.activeCategory = null;
        },
        onDeleteCategory: ( state ) => {
            state.categories.docs = state.categories.docs.filter( category => category._id !== state.activeCategory._id );
            state.activeCategory = null;
        },
        onLogoutCategory: ( state ) => {
            state.allCategories = [];
            state.categories = {};
            state.isLoadingCategories = true;
            state.activeCategory = null;
        }
    }
});


// Action creators are generated for each case reducer function
export const { onSetActiveCategory, onLoadCategories, onLoadAllCategories, onChangeSearchedName, onAddNewCategory, onUpdateCategory, onDeleteCategory, onLogoutCategory } = categorySlice.actions;