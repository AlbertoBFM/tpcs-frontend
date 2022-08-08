import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isModalOpen: false,
        isActiveButton: false,
    },
    reducers: {
        onOpenModal: ( state ) => {
            state.isModalOpen = true;
        },
        onCloseModal: ( state ) => {
            state.isModalOpen = false;
        },
        onActiveButton: ( state, { payload } ) => {
            state.isActiveButton = !payload;
        },
    }
});


// Action creators are generated for each case reducer function
export const { onOpenModal, onCloseModal, onActiveButton } = uiSlice.actions;