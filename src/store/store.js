import { configureStore } from '@reduxjs/toolkit';
import { uiSlice, categorySlice, productSlice, providerSlice } from './';


export const store = configureStore({
    reducer: {
        category: categorySlice.reducer,
        product: productSlice.reducer,
        provider: providerSlice.reducer,
        ui: uiSlice.reducer,
    }
});