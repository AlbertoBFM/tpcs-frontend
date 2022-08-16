import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isModalOpen: false,
        isCartModalOpen: false,
        isActiveButton: false,
    },
    reducers: {
        onOpenModal: ( state ) => {
            state.isModalOpen = true;
        },
        onCloseModal: ( state ) => {
            state.isModalOpen = false;
        },
        onOpenCartModal: ( state ) => {
            state.isCartModalOpen = true;
        },
        onCloseCartModal: ( state ) => {
            state.isCartModalOpen = false;
        },
        onActiveButton: ( state, { payload } ) => {
            state.isActiveButton = !payload;
        },
    }
});


// Action creators are generated for each case reducer function
export const { onOpenModal, onCloseModal, onOpenCartModal, onCloseCartModal, onActiveButton } = uiSlice.actions;