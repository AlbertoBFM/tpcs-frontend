import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        searchedUser: {},
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
        onChangeSearchedUser: ( state, { payload } ) => {
            state.searchedUser = payload;
        },
        onToggleEnabled: ( state, { payload } ) => {
            state.users.docs = state.users.docs.map( user => {
                if (user._id === payload)
                    user.enabled = !user.enabled;
                return user; 
            });
        },
        onAddNewUser: ( state, { payload } ) => {
            state.users.docs.push( payload );
            state.activeUser = null;
        },
        onDeleteUser: ( state ) => {
            state.users.docs = state.users.docs.filter( user => user._id !== state.activeUser._id );
            state.activeUser = null;
        },
        onLogoutUser: ( state ) => {
            state.users = [];
            state.searchedUser = {};
            state.isLoadingUser = true,
            state.activeUser = null;
        }
    }
});


// Action creators are generated for each case reducer function
export const { onSetActiveUser, onLoadUsers, onToggleEnabled, onChangeSearchedUser, onAddNewUser, onDeleteUser, onLogoutUser } = userSlice.actions;