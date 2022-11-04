import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isModalOpen: false,
        isCartModalOpen: false,
        isAccountModalOpen: false,
        isPasswordModalOpen: false,
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
        onToggleAccountModal: ( state ) => {
            state.isAccountModalOpen = !state.isAccountModalOpen;
        },
        onTogglePasswordModal: ( state ) => {
            state.isPasswordModalOpen = !state.isPasswordModalOpen;
        },
        onActiveButton: ( state, { payload } ) => {
            state.isActiveButton = !payload;
        },
    }
});


// Action creators are generated for each case reducer function
export const { onOpenModal, onCloseModal, onOpenCartModal, onCloseCartModal, onToggleAccountModal, onTogglePasswordModal, onActiveButton } = uiSlice.actions;