import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'reactstrap';

import { MyNavbar } from '../components/ui/MyNavbar';
import { IntroPage } from '../components/intro/IntroPage';
import { FabCart, SaleCartModal, SalePage } from '../components/sales';
import { ProductPage } from '../components/products';
import { UserPage } from '../components/users';
import { CategoryPage } from '../components/categories';
import { ProviderPage } from '../components/providers';
import { useAuthStore } from '../hooks';

export const DashboardRoutes = () => {

    const { user } = useAuthStore();

    return (
        <>
            <MyNavbar />
            <FabCart />
            <SaleCartModal />
            <Container fluid style={{ paddingTop: "20px" }}>
                <Routes>
                    <Route
                        path="/"
                        element={ <IntroPage /> }
                    />
                    <Route
                        path="/sales"
                        element={ <SalePage /> }
                    />
                    <Route
                        path="/products"
                        element={ <ProductPage /> }
                    />
                    <Route
                        path="/categories"
                        element={ <CategoryPage /> }
                    />
                    <Route
                        path="/providers"
                        element={ <ProviderPage /> }
                    />
                    {
                        user.userType === 'admin' 
                        && 
                        <Route
                            path="/users"
                            element={ <UserPage /> }
                        />
                    }
                    <Route
                        path="/*"
                        element={ <Navigate to="/" /> }
                    />
                </Routes>
            </Container>
        </>
    )
}
