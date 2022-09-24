import { createSlice } from '@reduxjs/toolkit';

const tempUsers = [
    {
        _id: "123456789",
        name: 'Mr. Robot',
        email: 'robot@gmail.com',
    },
    {
        _id: "987654321",
        name: 'Brandon Lee',
        email: 'batman@gmail.com',
    },
    {
        _id: "147258369",
        name: 'Big Mama',
        email: 'bigmama@gmail.com',
    },
];

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        // users: tempUsers,
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
            payload.forEach( user => {
                const exists = state.users.some( dbUser => dbUser._id === user._id );
                if ( !exists ) state.users.push( user );
            })
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