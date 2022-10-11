import { createSlice } from '@reduxjs/toolkit';

export const saleSlice = createSlice({
    name: 'sale',
    initialState: {
        allSales: [],
        sales: [],
        searchedSale: {},
        isLoadingSales: true,
        activeSale: null,
    },
    reducers: {
        onSetActiveSale: ( state, { payload } ) => {
            state.activeSale = payload;
        },
        onLoadAllSales: ( state, { payload = [] } ) => {
            state.allSales = payload;
        },
        onLoadSales: ( state, { payload = [] } ) => {
            state.isLoadingSales = false;
            state.sales = payload;
            // state.sales.docs = state.sales?.docs?.sort( ( a, b ) => new Date( b.date ) - new Date( a.date ) ); //para que ordene desde la fecha mas reciente
        },
        onChangeSearchedSale: ( state, { payload } ) => {
            state.searchedSale = payload;
        },
        onAddNewSale: ( state, { payload } ) => {
            state.sales.push( payload );
            state.activeSale = payload;
        },
        onDeleteSale: ( state, { payload } ) => {
            state.sales = state.sales.filter( sale => sale._id !== payload );
            state.activeSale = null;
        },
        onLogoutSale: ( state ) => {
            state.allSales = [];
            state.sales = [];
            state.isLoadingSales = true;
            state.activeSale = null;
        }
    }
});


// Action creators are generated for each case reducer function
export const { onSetActiveSale, onLoadAllSales, onChangeSearchedSale, onAddNewSale, onDeleteSale, onLoadSales, onLogoutSale } = saleSlice.actions;