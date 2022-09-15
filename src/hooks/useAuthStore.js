import { useDispatch, useSelector } from 'react-redux';
import { tpcsApi } from '../api';
import { onChecking, onClearErrorMessage, onLogin, onLogout, onLogoutCategory } from '../store';


export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    const startLogin = async ({ email, password }) => {

        dispatch( onChecking() );

        try {

            const { data } = await tpcsApi.post( '/auth', { email, password } );
            // console.log( data );
            localStorage.setItem( 'token', data.token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );
            dispatch( onLogin({ name:  data.name, uid: data.uid, email: data.email }) );

        } catch (error) {
            dispatch( onLogout('Datos Incorrectos') );
            setTimeout(() => {
               dispatch( onClearErrorMessage() ); 
            }, 10);
        }

    }

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');
        if ( !token ) return dispatch( onLogout() );

        try {

            const { data } = await tpcsApi.get('/auth/renew');
            // console.log( data );
            localStorage.setItem( 'token', data.token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );
            dispatch( onLogin({ name:  data.name, uid: data.uid, email: data.email }) );

        } catch (error) {
            localStorage.clear();
            dispatch( onLogout() );
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch( onLogoutCategory() );
        dispatch( onLogout() );
    }

    return {
        //* Properties
        status,
        user,
        errorMessage,

        //* Methods
        startLogin,
        checkAuthToken,
        startLogout
    }

}