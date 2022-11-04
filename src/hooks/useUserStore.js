import { useSelector, useDispatch } from 'react-redux';
import { onAddNewUser, onChangeSearchedUser, onDeleteUser, onLoadUsers, onSetActiveUser, onToggleEnabled } from '../store';
import { tpcsApi } from '../api';
import { messageAlert } from '../helpers';

export const useUserStore = () => {
    const dispatch = useDispatch();

    const { users, searchedUser, activeUser } = useSelector( state => state.user );

    const setActiveUser = ( user ) => {
        dispatch( onSetActiveUser( user ) );
    }

    const startChangeSearchUser = ( searchedUser ) => {
        dispatch( onChangeSearchedUser( searchedUser ) );
    }

    const startLoadingUsers = async ({pageNumber, searchedUser}) => {
        try {
            const page = pageNumber || localStorage.getItem('userPage') || 1;
            const { localName: searchedName, localEmail: searchedEmail } = searchedUser || {};
            const { localName, localEmail } = JSON.parse( localStorage.getItem('searchedUser') ) || {};
            const name = searchedName ?? localName ?? '';
            const email = searchedEmail ?? localEmail ?? '';

            const { data } = await tpcsApi.get(`/user?page=${ page }&name=${ name }&email=${ email }`);
            localStorage.setItem('userPage', page);
            localStorage.setItem('searchedUser', JSON.stringify({ localName: name, localEmail: email }));
            dispatch( onLoadUsers( data.users ) );
        } catch (error) {
            console.log('Error al cargar los Usuarios');
            console.log( error );
        }
    }

    const startToggleEnabledUser = async ( userId ) => {
        try {
            await tpcsApi.post( `/user/enabled/${ userId }` );
            dispatch( onToggleEnabled( userId ) );
            // messageAlert('Usuario Eliminado', '', 'success');
        } catch (error) {
            console.log( error );
            messageAlert( 'Error al Eliminar', error.response.data?.msg, 'error' );
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
            if ( users.docs.length === 1 ) //* Si solo queda un registro en la tabla, que muestre la primera pagina
                startLoadingUsers({ pageNumber: 1 });
            messageAlert('Usuario Eliminado', '', 'success');
        } catch (error) {
            console.log( error );
            messageAlert( 'Error al Eliminar', error.response.data?.msg, 'error' );
        }
    }

    return {
        //* Properties
        users,
        searchedUser,
        activeUser,
        //* Methods
        setActiveUser,
        startChangeSearchUser,
        startToggleEnabledUser,
        startLoadingUsers,
        startSavingUser,
        startDeletingUser,
    }

}