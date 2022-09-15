import { useSelector, useDispatch } from 'react-redux';
import { onAddNewUser, onDeleteUser, onSetActiveUser } from '../store';
import { tpcsApi } from '../api';
import { onChecking, onClearErrorMessage, onLogin, onLogout } from '../store';

export const useUserStore = () => {

    const dispatch = useDispatch();

    const {
        users,
        activeUser,
    } = useSelector( state => state.user );

    const setActiveUser = ( user ) => {
        dispatch( onSetActiveUser( user ) );
    }

    const startSavingUser = async ( newUser ) => {

        try {

            const { data } = await tpcsApi.post( '/auth/new', newUser );
            const { user } = data;
            console.log( data );
            dispatch( onAddNewUser({ 
                _id: user._id, 
                name: user.name, 
                email: user.email 
            }) );

        } catch (error) {

            console.log(error);
            dispatch( onLogout('Error al registrar Usuario') );
            setTimeout(() => {
               dispatch( onClearErrorMessage() ); 
            }, 10);
        }
        
    }

    const startDeletingUser = async () => {
        // TODO: Backend
        
        dispatch( onDeleteUser() );
    }

    return {
        //* Properties
        users,
        activeUser,
        //* Methods
        setActiveUser,
        startSavingUser,
        startDeletingUser,
    }

}