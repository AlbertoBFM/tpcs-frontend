import { createSlice } from '@reduxjs/toolkit';

const tempInitialState = {
    cart: [{
        _id: '121212121',
        name: 'Mouse TX Gamer 2022',
        description: 'Lorem ipsum dolor, sit amet consectetur',
        stock: 100,
        purchasePrice: 90.00,
        salePrice: 100.00,
        category: { _id: '123456789', name: 'Teclados' },
        provider: { _id: '999999999', name: 'GigaTex' },
        quantity: 5,
        subtotal: 500
    }],
    total: 500
};

export const saleCartSlice = createSlice({
    name: 'saleCart',
    initialState: {
        cart: [],
        ciNit: "",
        total: 0
    },
    reducers: {
        onCiNitChange: ( state, { payload } ) => {
            state.ciNit = payload;
        },
        onAddToCart: ( state, { payload } ) => {
            state.cart.push( payload );
            state.total = Number(state.total) + Number(payload.subtotal);
        },
        onAddOneToCart: ( state, { payload } ) => {
            state.cart = state.cart.map( item => {
                if( item._id === payload._id ){
                    item.quantity = Number(item.quantity) + 1;
                    item.subtotal = Number(item.subtotal) + Number(item.salePrice);
                }
                return item;
            });
            state.total = Number(state.total) + Number(payload.salePrice);
        },
        onRemoveOneToCart: ( state, { payload } ) => {
            state.cart = state.cart.map( item => {
                if( item._id === payload._id ){
                    item.quantity = Number(item.quantity) - 1;
                    item.subtotal = Number(item.subtotal) - Number(item.salePrice);
                }
                return item;
            });
            state.total = Number(state.total) - Number(payload.salePrice);
        },
        onRemoveAllFromCart: ( state, { payload } ) => {
            state.cart =  state.cart.filter( item => item._id != payload._id );
            state.total = Number(state.total) - Number(payload.subtotal);
        },
        onChangeQuantity: ( state, { payload } ) => {
            state.cart = state.cart.map( item => {
                if( item._id === payload._id ){
                    item.quantity = payload.quantity;
                    item.subtotal = Number(item.quantity) * Number(item.salePrice);
                }
                return item;
            });
            state.total = state.cart.reduce( (accumulator, item) => accumulator + item.subtotal, 0 );
        },
        onClearCart: ( state ) => {
            state.cart = [];
            state.ciNit = "";
            state.total = 0;
        }
    }
});


// Action creators are generated for each case reducer function
export const { onCiNitChange, onAddToCart, onAddOneToCart, onRemoveOneToCart, onRemoveAllFromCart, onChangeQuantity, onClearCart } = saleCartSlice.actions;