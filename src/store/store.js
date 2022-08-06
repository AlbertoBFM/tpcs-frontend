import { configureStore } from '@reduxjs/toolkit';
import { uiSlice, categorySlice, productSlice } from './';


export const store = configureStore({
    reducer: {
        category: categorySlice.reducer,
        product: productSlice.reducer,
        ui: uiSlice.reducer,
    }
});