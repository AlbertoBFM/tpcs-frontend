import { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Container, Spinner } from 'reactstrap';

import { LoginPage } from '../components/auth';
import { useAuthStore } from '../hooks';
import { DashboardRoutes } from './DashboardRoutes';
import '../styles.css';

export const AppRouter = () => {
    
    const { status, checkAuthToken } = useAuthStore();

    useEffect(() => {
        checkAuthToken();
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
