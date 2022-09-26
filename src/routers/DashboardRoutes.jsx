import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from '../components/ui/Navbar';

import { IntroPage } from '../components/intro/IntroPage';
import { FabCart, SaleCartModal, SalePage } from '../components/sales';
import { ProductPage } from '../components/products';
// import { RepairPage } from '../components/repairs/RepairPage';
import { UserPage } from '../components/users';
import { CategoryPage } from '../components/categories';
// import { ClientPage } from '../components/clients/ClientPage';
import { ProviderPage } from '../components/providers';
import { useAuthStore } from '../hooks';


export const DashboardRoutes = () => {

    const { user } = useAuthStore();

    return (
        <>
            <Navbar />
            <FabCart />
            <SaleCartModal />
            <div className="container mt-3">
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
                    {/* <Route
                        path="/repairs"
                        element={ <RepairPage /> }
                    />
                    <Route
                        path="/clients"
                        element={ <ClientPage /> }
                    /> */}
                </Routes>
            </div>
        </>
    )
}
