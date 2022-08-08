import { createSlice } from '@reduxjs/toolkit';

const tempProviders = [
    {
        _id: '999999999',
        name: 'GigaTex',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex, doloribus!',
        phone: '76167710',
        address: 'Av. Manuel Vaca S/N',
    },
    {
        _id: '888888888',
        name: 'Empresa J y K',
        description: 'Ex, doloribus!Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex, doloribus!',
        phone: '71835910',
        address: 'Cl. Daniel Quijarro Nº 23',
    },
    {
        _id: '777777777',
        name: 'Andromeda',
        description: 'Sit amet consectetur, adipisicing elit. Ex, doloribus!',
        phone: '65466139',
        address: 'Cl. Doña Justa Guiño Guiño',
    },
];

export const providerSlice = createSlice({
    name: 'provider',
    initialState: {
        providers: tempProviders,
        activeProvider: null,
    },
    reducers: {
        onSetActiveProvider: ( state, { payload } ) => {
            state.activeProvider = payload;
        },
        onAddNewProvider: ( state, { payload } ) => {
            state.providers.push( payload );
            state.activeProvider = null;
        },
        onUpdateProvider: ( state, { payload } ) => {
            state.providers = state.providers.map( provider => {
                if ( provider._id === payload._id ) return payload;
                
                return provider;
            });
            state.activeProvider = null;
        },
        onDeleteProvider: ( state ) => {
            state.providers = state.providers.filter( provider => provider._id !== state.activeProvider._id );
            state.activeProvider = null;
        },
    }
});


// Action creators are generated for each case reducer function
export const { onSetActiveProvider, onAddNewProvider, onUpdateProvider, onDeleteProvider } = providerSlice.actions;