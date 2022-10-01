import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        isLoadingUser: true,
        activeUser: null,
    },
    reducers: {
        onSetActiveUser: ( state, { payload } ) => {
            state.activeUser = payload;
        },
        onLoadUsers: ( state, { payload = [] } ) => {
            state.isLoadingUser = false;
            state.users = payload;
        },
        onAddNewUser: ( state, { payload } ) => {
            state.users.push( payload );
            state.activeUser = null;
        },
        onDeleteUser: ( state ) => {
            state.users = state.users.filter( user => user._id !== state.activeUser._id );
            state.activeUser = null;
        },
        onLogoutUser: ( state ) => {
            state.users = [];
            state.activeUser = null;
        }
    }
});


// Action creators are generated for each case reducer function
export const { onSetActiveUser, onLoadUsers, onAddNewUser, onDeleteUser, onLogoutUser } = userSlice.actions;