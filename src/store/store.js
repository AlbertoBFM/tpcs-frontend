import { configureStore } from '@reduxjs/toolkit';
import { uiSlice, categorySlice, productSlice, providerSlice, saleSlice, saleCartSlice, saleDetailSlice } from './';

export const store = configureStore({
    reducer: {
        category: categorySlice.reducer,
        product: productSlice.reducer,
        provider: providerSlice.reducer,
        sale: saleSlice.reducer,
        saleDetail: saleDetailSlice.reducer,
        saleCart: saleCartSlice.reducer,
        ui: uiSlice.reducer,
    }
});