import { useSelector, useDispatch } from 'react-redux';
import { tpcsApi } from '../api';
import { messageAlert } from '../helpers';
import { onAddNewProvider, onDeleteProvider, onSetActiveProvider, onUpdateProvider, onLoadProviders } from '../store';

export const useProviderStore = () => {

    const dispatch = useDispatch();

    const {
        providers,
        activeProvider,
    } = useSelector( state => state.provider );

    const setActiveProvider = ( provider ) => {
        dispatch( onSetActiveProvider( provider ) );
    }

    const startLoadingProviders = async () => {

        try {
            const { data } = await tpcsApi.get( '/provider' );
            dispatch( onLoadProviders( data.providers ) );

        } catch (error) {
            console.log('Error al cargar los proveedores');
            console.log( error );
        }

    }

    const startSavingProvider = async ( provider ) => {
        try {
            if ( provider._id ) {
                //* Update
                    await tpcsApi.put( `/provider/${ provider._id }`, provider );
                    dispatch( onUpdateProvider({ ...provider }) );
                    return true;
            }
            //* Create
            const { data } = await tpcsApi.post( '/provider', provider );
            dispatch( onAddNewProvider({ _id: data.provider._id, ...provider }) );
            return true;
        } catch (error) {
            console.log( error );
            messageAlert( 'Error al Guardar', error.response.data?.msg, 'error' );
            return false;
        }
    }

    const startDeletingProvider = async ( provider ) => {
        try {
            await tpcsApi.delete( `/provider/${ provider._id }` );
            dispatch( onDeleteProvider() );
        } catch (error) {
            console.log( error );
            messageAlert( 'Error al Eliminar', error.response.data?.msg, 'error' );
        }
        
    }

    return {
        //* Properties
        providers,
        activeProvider,
        //* Methods
        setActiveProvider,
        startLoadingProviders,
        startSavingProvider,
        startDeletingProvider,
    }

}