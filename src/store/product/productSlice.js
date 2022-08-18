import { createSlice } from '@reduxjs/toolkit';

const tempProducts = [
    {
        _id: '121212121',
        name: 'Mouse TX Gamer 2022',
        description: 'Lorem ipsum dolor, sit amet consectetur',
        stock: 100,
        purchasePrice: 90.00,
        salePrice: 100.00,
        category: { _id: '123456789', name: 'Teclados' },
        provider: { _id: '999999999', name: 'GigaTex' }
    },
    {
        _id: '232323232',
        name: 'Teclado Asus Big Mama',
        description: 'It amet consectetur adipisicing elit. ',
        stock: 200,
        purchasePrice: 130.00,
        salePrice: 150.00,
        category: { _id: '123456789', name: 'Teclados' },
        provider: { _id: '888888888', name: 'Empresa J y K' }
    },
    {
        _id: '343434343',
        name: 'Pantalla Galaxy S22 Ultra',
        description: 'Sirven pa ver negro sit amet consectetur delectus?',
        stock: 300,
        purchasePrice: 450.00,
        salePrice: 500.00,
        category: { _id: '147258369', name: 'Monitores' },
        provider: { _id: '888888888', name: 'Empresa J y K' }
    },
];

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: tempProducts,
        activeProduct: null,
    },
    reducers: {
        onSetActiveProduct: ( state, { payload } ) => {
            state.activeProduct = payload;
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
    }
});


// Action creators are generated for each case reducer function
export const { 
    onSetActiveProduct, 
    onAddNewProduct, 
    onUpdateProduct, 
    onDeleteProduct, 
    onUpdateProductStockAddSale, 
    onUpdateProductStockSubSale 
} = productSlice.actions;