import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        isLoadingProducts: true,
        activeProduct: null,
    },
    reducers: {
        onSetActiveProduct: ( state, { payload } ) => {
            state.activeProduct = payload;
        },
        onLoadProducts: ( state, { payload = [] } ) => {
            state.isLoadingProducts = false;
            state.products = payload;
            // payload.forEach( product => {
            //     const exists = state.products.some( dbProduct => dbProduct._id === product._id );
            //     if ( !exists ) state.products.push( product );
            // })
        },
        onAddNewProduct: ( state, { payload } ) => {
            state.products.push( payload );
            state.activeProduct = null;
        },
        onUpdateProduct: ( state, { payload } ) => {
            state.products = state.products.map( product => {
                if ( product._id === payload._id ) return payload;
                
                return product;
            });
            state.activeProduct = null;
        },
        onDeleteProduct: ( state ) => {
            state.products = state.products.filter( product => product._id !== state.activeProduct._id );
            state.activeProduct = null;
        },
        onUpdateProductStockAddSale: ( state, { payload } ) => {
            state.products = state.products.map( product => {
                if ( product._id === payload._id ) {
                    product.stock = Number( product.stock ) - Number( payload.quantity );
                }
                return product;
            });
        },
        onUpdateProductStockSubSale: ( state, { payload } ) => {
            state.products = state.products.map( product => {
                if ( product._id === payload.product._id ) {
                    product.stock = Number( product.stock ) + Number( payload.quantity );
                }
                return product;
            });
        },
        onLogoutProduct: ( state ) => {
            state.products = [];
            state.isLoadingProducts = true;
            state.activeProduct = null;
        }
    }
});


// Action creators are generated for each case reducer function
export const { 
    onSetActiveProduct, 
    onLoadProducts,
    onAddNewProduct, 
    onUpdateProduct, 
    onDeleteProduct, 
    onUpdateProductStockAddSale, 
    onUpdateProductStockSubSale,
    onLogoutProduct,
} = productSlice.actions;