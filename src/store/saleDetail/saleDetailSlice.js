import { createSlice } from '@reduxjs/toolkit';

const tempSaleDetails = [
    {
        _id: '111111111',
        sale: { _id: '123456789' },
        product: { _id: '121212121', name: 'Mouse TX Gamer 2022', salePrice: 100.00, },
        quantity: 4,
        subtotal: 400
    },
    {
        _id: '211111111',
        sale: { _id: '123456789' },
        product: { _id: '232323232', name: 'Teclado Asus Big Mama', salePrice: 150.00, },
        quantity: 4,
        subtotal: 600
    },
    {
        _id: '311111111',
        sale: { _id: '987654321' },
        product: { _id: '343434343', name: 'Pantalla Galaxy S22 Ultra', salePrice: 500.00, },
        quantity: 3,
        subtotal: 1500
    },
];

export const saleDetailSlice = createSlice({
    name: 'saleDetail',
    initialState: {
        saleDetails: tempSaleDetails,
        activeSaleDetail: [],
    },
    reducers: {
        onSetActiveSaleDetail: ( state, { payload } ) => {
            state.activeSaleDetail = payload;
        },
    }
});


// Action creators are generated for each case reducer function
export const { onSetActiveSaleDetail } = saleDetailSlice.actions;