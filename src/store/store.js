import { configureStore } from '@reduxjs/toolkit';
import { uiSlice, categorySlice } from './';


export const store = configureStore({
    reducer: {
        category: categorySlice.reducer,
        ui: uiSlice.reducer,
    }
});