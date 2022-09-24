import { createSlice } from '@reduxjs/toolkit';
import { formatDate } from '../../helpers';

// const tempSales = [
//     {
//         _id: '123456789',
//         user: { _id: '321846987', name: 'batman' },
//         // client: { _id: '321789654', name: 'Juanito Alcachofa' },
//         date: new Date().getTime(),
//         total: 1000
//     },
//     {
//         _id: '987654321',
//         user: { _id: '651489324', name: 'robin' },
//         // client: { _id: '932489654', name: 'Alberto FLores' },
//         date: new Date().getTime(),
//         total: 1500
//     },
// ];

export const saleSlice = createSlice({
    name: 'sale',
    initialState: {
        // sales: tempSales,
        sales: [],
        isLoadingSales: true,
        activeSale: null,
    },
    reducers: {
        onSetActiveSale: ( state, { payload } ) => {
            state.activeSale = payload;
        },
        onLoadSales: ( state, { payload = [] } ) => {
            state.isLoadingSales = false;
            state.sales = payload;
            // payload.forEach( sale => {
            //     const exists = state.sales.some( dbSale => dbSale._id === sale._id );
            //     if ( !exists ) state.sales.push( sale );
            // })
            state.sales = state.sales.sort( ( a, b ) => new Date( b.date ) - new Date( a.date ) ); //para que ordene desde la fecha mas reciente
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
            state.sales = [];
            state.isLoadingSales = true;
            state.activeSale = null;
        }
    }
});


// Action creators are generated for each case reducer function
export const { onSetActiveSale, onAddNewSale, onDeleteSale, onLoadSales, onLogoutSale } = saleSlice.actions;