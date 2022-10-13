import { createSlice } from '@reduxjs/toolkit';

export const providerSlice = createSlice({
    name: 'provider',
    initialState: {
        allProviders: [],
        providers: [],
        searchedProvider: {},
        isLoadingProviders: true,
        activeProvider: null,
    },
    reducers: {
        onSetActiveProvider: ( state, { payload } ) => {
            state.activeProvider = payload;
        },
        onLoadAllProviders: ( state, { payload = [] } ) => {
            state.allProviders = payload;
        },
        onLoadProviders: ( state, { payload = [] } ) => {
            state.isLoadingProviders = false;
            state.providers = payload;
        },
        onChangeSearchedProvider: ( state, { payload } ) => {
            state.searchedProvider = payload;
        },
        onAddNewProvider: ( state, { payload } ) => {
            state.providers.docs.push( payload );
            state.activeProvider = null;
        },
        onUpdateProvider: ( state, { payload } ) => {
            state.providers.docs = state.providers.docs.map( provider => {
                if ( provider._id === payload._id ) return payload;
                
                return provider;
            });
            state.activeProvider = null;
        },
        onDeleteProvider: ( state ) => {
            state.providers.docs = state.providers.docs.filter( provider => provider._id !== state.activeProvider._id );
            state.activeProvider = null;
        },
        onLogoutProvider: ( state ) => {
            state.allProviders = [];
            state.providers = [];
            state.searchedProvider = {};
            state.isLoadingProviders = true;
            state.activeProvider = null;
        }
    }
});


// Action creators are generated for each case reducer function
export const { onSetActiveProvider, onLoadProviders, onLoadAllProviders, onChangeSearchedProvider, onAddNewProvider, onUpdateProvider, onDeleteProvider, onLogoutProvider } = providerSlice.actions;