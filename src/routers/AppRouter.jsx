import { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Container, Spinner } from 'reactstrap';

import { LoginPage } from '../components/auth';
import { useAuthStore } from '../hooks';
import { DashboardRoutes } from './DashboardRoutes';
import '../styles.css';

export const AppRouter = () => {
    
    const { status, checkAuthToken, startLogout } = useAuthStore();

    //* Si se borra el token del localStorage, entonces cerraremos la sesión de usuario de esta manera
    const closeLogin = () => {
        const uid = localStorage.getItem('uid');
        if ( Boolean(uid) )
            startLogout(uid);
    }

    useEffect(() => {
        checkAuthToken();
        closeLogin();
    }, [])
    
    if ( status === 'checking' )
        return (
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <h3>Cargando...</h3>
                    <Spinner></Spinner>
                </div>
            </div>
        )

    return (
        <Routes>
            {
                ( status === 'not-authenticated' )
                    ?   <Route path="/auth/*" element={ <LoginPage /> } />
                    :   <Route path="/*" element={ <DashboardRoutes /> } />
            }
            <Route path='/*' element={ <Navigate to="/auth/login" /> } />
        </Routes>
    )
}
