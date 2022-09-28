import { createSlice } from '@reduxjs/toolkit';

// const tempCategories = [
//     {
//         _id: "123456789",
//         name: 'Teclados',
//         description: 'Periférico de uso masivo',
//     },
//     {
//         _id: "987654321",
//         name: 'Impresoras',
//         description: 'Utilizado mayormente en oficinas',
//     },
//     {
//         _id: "147258369",
//         name: 'Monitores',
//         description: 'Sirven pa ver negro :V',
//     },
// ];

export const categorySlice = createSlice({
    name: 'category',
    initialState: {
        // categories: tempCategories,
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
            // payload.forEach( category => {
            //     const exists = state.categories.some( dbCategory => dbCategory._id === category._id );
            //     if ( !exists ) state.categories.push( category );
            // })
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