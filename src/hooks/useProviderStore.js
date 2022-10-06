import { useSelector, useDispatch } from 'react-redux';
import { tpcsApi } from '../api';
import { messageAlert } from '../helpers';
import { onAddNewProvider, onDeleteProvider, onSetActiveProvider, onUpdateProvider, onLoadProviders, onLoadAllProviders, onChangeSearchedProvider } from '../store';

export const useProviderStore = () => {
    const dispatch = useDispatch();

    const {
        allProviders,
        providers,
        searchedProvider,
        activeProvider,
    } = useSelector( state => state.provider );

    const setActiveProvider = ( provider ) => {
        dispatch( onSetActiveProvider( provider ) );
    }

    const startLoadingAllProviders = async () => {
        try {
            const { data } = await tpcsApi.get( '/provider/all' );
            dispatch( onLoadAllProviders( data.providers ) );
        } catch (error) {
            console.log('Error al cargar los proveedores');
            console.log( error );
        }
    }

    const startChangeSearchProvider = ( searchedProdiver ) => {
        dispatch( onChangeSearchedProvider( searchedProdiver ) );
    }

    const startLoadingProviders = async ({pageNumber, searchedProvider}) => {
        const page = pageNumber || localStorage.getItem('providerPage') || 1;

        const { localName: searchedName, localPhone: searchedPhone } = searchedProvider || {};
        const { localName, localPhone } = JSON.parse( localStorage.getItem('searchedProvider') ) || {};
        const name = ( searchedName === '' ) 
                        ? ('') //* Si la cadena esta vacia que retorne eso, lo hago de esta manera ya que en la expresión OR cuando ve una cadena vacia lo toma como null
                        : (searchedName || localName || ''); 
        const phone = ( searchedPhone === '' ) 
                        ? ('') 
                        : (searchedPhone || localPhone || '');
        try {
            const { data } = await tpcsApi.get( `/provider?page=${ page }&name=${ name }&phone=${ phone.replace('+','%2B') }` );
            localStorage.setItem('providerPage', page);
            localStorage.setItem('searchedProvider', JSON.stringify({ localName: name, localPhone: phone }));
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
        allProviders,
        providers,
        searchedProvider,
        activeProvider,
        //* Methods
        setActiveProvider,
        startLoadingAllProviders,
        startChangeSearchProvider,
        startLoadingProviders,
        startSavingProvider,
        startDeletingProvider,
    }

}