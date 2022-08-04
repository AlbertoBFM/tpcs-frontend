import { Route, Routes, Navigate } from 'react-router-dom';
import { LoginPage } from '../components/auth';
import { DashboardRoutes } from './DashboardRoutes';


export const AppRouter = () => {
    
    // const authStatus = 'not-authenticated'; // 'authenticated'
    const authStatus = 'not-authenticated';

    return (
        <Routes>
            {
                ( authStatus === 'authenticated' )
                    ?   <Route path="/auth/*" element={ <LoginPage /> } />
                    :   <Route path="/*" element={ <DashboardRoutes /> } />
            }
            <Route path='/*' element={ <Navigate to="/auth/login" /> } />
        </Routes>
    )
}
