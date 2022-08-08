import { useSelector, useDispatch } from 'react-redux';
import { onAddNewProvider, onDeleteProvider, onSetActiveProvider, onUpdateProvider } from '../store';

export const useProviderStore = () => {

    const dispatch = useDispatch();

    const {
        providers,
        activeProvider,
    } = useSelector( state => state.provider );

    const setActiveProvider = ( provider ) => {
        dispatch( onSetActiveProvider( provider ) );
    }

    const startSavingProvider = async ( provider ) => {
        // TODO: Backend

        if ( provider._id ) {
            //* Update
            dispatch( onUpdateProvider({ ...provider }) );
        } else {
            //* Create
            dispatch( onAddNewProvider({ _id: new Date().getTime().toString(), ...provider }) );
        }
    }

    const startDeletingProvider = async () => {
        // TODO: Backend
        
        dispatch( onDeleteProvider() );
    }

    return {
        //* Properties
        providers,
        activeProvider,
        //* Methods
        setActiveProvider,
        startSavingProvider,
        startDeletingProvider,
    }

}