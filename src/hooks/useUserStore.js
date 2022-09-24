import { useSelector, useDispatch } from 'react-redux';
import { onAddNewUser, onDeleteUser, onLoadUsers, onSetActiveUser } from '../store';
import { tpcsApi } from '../api';
import { messageAlert } from '../helpers';

export const useUserStore = () => {

    const dispatch = useDispatch();

    const {
        users,
        activeUser,
    } = useSelector( state => state.user );

    const setActiveUser = ( user ) => {
        dispatch( onSetActiveUser( user ) );
    }

    const startLoadingUsers = async () => {
        try {
            
            const { data } = await tpcsApi.get( '/user' );
            dispatch( onLoadUsers( data.users ) );

        } catch (error) {
            console.log('Error al cargar los Usuarios');
            console.log( error );
        }
    }

    const startSavingUser = async ( newUser ) => {
        try {
            const { data } = await tpcsApi.post( '/user/new', newUser );
            const { user } = data;
            console.log( data );
            dispatch( onAddNewUser({ 
                _id: user._id, 
                name: user.name, 
                email: user.email 
            }) );
            messageAlert( 'Usuario Guardado', '', 'success' );
            return true;
        } catch (error) {
            console.log(error);
            messageAlert( 'Error al Guardar', error.response.data?.msg, 'error' );
            return false;
        }
        
    }

    const startDeletingUser = async ( userId ) => {
        console.log();
        try {
            await tpcsApi.delete( `/user/${ userId }` );
            dispatch( onDeleteUser() );
            messageAlert('Usuario Eliminado', '', 'success');
        } catch (error) {
            console.log( error );
            messageAlert( 'Error al Eliminar', error.response.data?.msg, 'error' );
        }
    }

    return {
        //* Properties
        users,
        activeUser,
        //* Methods
        setActiveUser,
        startLoadingUsers,
        startSavingUser,
        startDeletingUser,
    }

}