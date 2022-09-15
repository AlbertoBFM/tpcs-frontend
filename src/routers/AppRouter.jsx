import { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { LoginPage } from '../components/auth';
import { useAuthStore } from '../hooks';
import { DashboardRoutes } from './DashboardRoutes';


export const AppRouter = () => {
    
    const { status, checkAuthToken } = useAuthStore();

    useEffect(() => {

        checkAuthToken();

    }, [])
    

    if ( status === 'checking' )
        return (
            <h3>Cargandoooooo...</h3>
        )

    // const authStatus = 'authenticated';
    // const authStatus = 'not-authenticated';

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
