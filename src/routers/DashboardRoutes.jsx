import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from '../components/ui/Navbar';

import { IntroPage } from '../components/intro/IntroPage';
import { SalePage } from '../components/sales';
import { ProductPage } from '../components/products/ProductPage';
import { RepairPage } from '../components/repairs/RepairPage';
import { UserPage } from '../components/users/UserPage';
import { CategoryPage } from '../components/categories/CategoryPage';
import { ClientPage } from '../components/clients/ClientPage';
import { ProviderPage } from '../components/providers/ProviderPage';


export const DashboardRoutes = () => {
    return (
        <>
            <Navbar />

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
                    <Route
                        path="/repairs"
                        element={ <RepairPage /> }
                    />
                    <Route
                        path="/clients"
                        element={ <ClientPage /> }
                    />
                    <Route
                        path="/users"
                        element={ <UserPage /> }
                    />
                    <Route
                        path="/*"
                        element={ <Navigate to="/" /> }
                    />
                </Routes>
            </div>
        </>
    )
}
