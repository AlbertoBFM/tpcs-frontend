import { useDispatch, useSelector } from 'react-redux';
import { tpcsApi } from '../api';
import { onChecking, onClearCart, onClearErrorMessage, onLogin, onLogout, onLogoutCategory, onLogoutProduct, onLogoutProvider, onLogoutSale, onLogoutSaleDetail, onLogoutUser } from '../store';


export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    const startLogin = async ({ email, password }) => {
        dispatch( onChecking() );
        try {
            const { data } = await tpcsApi.post( '/auth', { email, password } );

            localStorage.clear();
            localStorage.setItem( 'token', data.token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );
            dispatch( onLogin({ name:  data.name, uid: data.uid, email: data.email, userType: data.userType }) );
        } catch (error) {
            dispatch( onLogout( error.response.data?.msg ) );
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

            localStorage.setItem( 'token', data.token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );
            dispatch(onLogin({ 
                name: data.name, 
                uid: data.uid, 
                email: data.email, 
                userType: data.userType,
                token: data.token
            }));
        } catch (error) {
            localStorage.clear();
            dispatch( onLogout() );
        }
    }

    const startLogout = async ( uid ) => {
        await tpcsApi.post(`/auth/logout/${ uid || user.uid }`);
        localStorage.clear();
        dispatch( onLogoutSale() );
        dispatch( onLogoutSaleDetail() );
        dispatch( onClearCart() );
        dispatch( onLogoutProduct() );
        dispatch( onLogoutProvider() );
        dispatch( onLogoutCategory() );
        dispatch( onLogoutUser() );
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