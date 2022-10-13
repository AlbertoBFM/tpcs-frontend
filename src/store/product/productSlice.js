import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        allProducts: [],
        products: [],
        searchedProduct: {},
        isLoadingProducts: true,
        activeProduct: null,
    },
    reducers: {
        onSetActiveProduct: ( state, { payload } ) => {
            state.activeProduct = payload;
        },
        onLoadAllProducts: ( state, { payload = [] } ) => {
            state.allProducts = payload;
        },
        onLoadProducts: ( state, { payload = [] } ) => {
            state.isLoadingProducts = false;
            state.products = payload;
        },
        onChangeSearchedProduct: ( state, { payload } ) => {
            state.searchedProduct = payload;
        },
        onAddNewProduct: ( state, { payload } ) => {
            state.products.docs.push( payload );
            state.activeProduct = null;
        },
        onUpdateProduct: ( state, { payload } ) => {
            state.products.docs = state.products.docs.map( product => {
                if ( product._id === payload._id ) 
                    return payload;
                return product;
            });
            state.activeProduct = null;
        },
        onDeleteProduct: ( state ) => {
            state.products.docs = state.products.docs.filter( product => product._id !== state.activeProduct._id );
            state.activeProduct = null;
        },
        onUpdateProductStockAddSale: ( state, { payload } ) => {
            state.products.docs = state.products.docs.map( product => {
                if ( product._id === payload._id ) {
                    product.stock = Number( product.stock ) - Number( payload.quantity );
                }
                return product;
            });
        },
        onUpdateProductStockSubSale: ( state, { payload } ) => {
            state.products.docs = state.products.docs.map( product => {
                if ( product._id === payload.product._id ) {
                    product.stock = Number( product.stock ) + Number( payload.quantity );
                }
                return product;
            });
        },
        onLogoutProduct: ( state ) => {
            state.allProducts = [];
            state.products = [];
            state.searchedProduct = {};
            state.isLoadingProducts = true;
            state.activeProduct = null;
        }
    }
});


// Action creators are generated for each case reducer function
export const { 
    onSetActiveProduct, 
    onLoadAllProducts,
    onLoadProducts,
    onChangeSearchedProduct,
    onAddNewProduct, 
    onUpdateProduct, 
    onDeleteProduct, 
    onUpdateProductStockAddSale, 
    onUpdateProductStockSubSale,
    onLogoutProduct,
} = productSlice.actions;