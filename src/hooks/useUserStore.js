import { useSelector, useDispatch } from 'react-redux';
import { onAddNewUser, onDeleteUser, onSetActiveUser } from '../store';

export const useUserStore = () => {

    const dispatch = useDispatch();

    const {
        users,
        activeUser,
    } = useSelector( state => state.user );

    const setActiveUser = ( user ) => {
        dispatch( onSetActiveUser( user ) );
    }

    const startSavingUser = async ( user ) => {
        // TODO: Backend

        //* Create
        dispatch( onAddNewUser({ _id: new Date().getTime().toString(), ...user }) );
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