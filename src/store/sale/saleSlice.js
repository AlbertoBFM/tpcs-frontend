import { createSlice } from '@reduxjs/toolkit';
import { formatDate } from '../../helpers';

const tempSales = [
    {
        _id: '123456789',
        user: { _id: '321846987', name: 'batman' },
        // client: { _id: '321789654', name: 'Juanito Alcachofa' },
        date: new Date().getTime(),
        total: 1000
    },
    {
        _id: '987654321',
        user: { _id: '651489324', name: 'robin' },
        // client: { _id: '932489654', name: 'Alberto FLores' },
        date: new Date().getTime(),
        total: 1500
    },
];

export const saleSlice = createSlice({
    name: 'sale',
    initialState: {
        sales: tempSales,
        activeSale: null,
    },
    reducers: {
        onSetActiveSale: ( state, { payload } ) => {
            state.activeSale = payload;
        },
        onAddNewSale: ( state, { payload } ) => {
            state.sales.push( payload );
            state.activeSale = payload;
        },
        onDeleteSale: ( state ) => {
            state.sales = state.sales.filter( sale => sale._id !== state.activeSale._id );
            state.activeSale = null;
        },
    }
});


// Action creators are generated for each case reducer function
export const { onSetActiveSale, onAddNewSale, onDeleteSale } = saleSlice.actions;