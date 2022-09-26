import { useEffect } from 'react';
import { AddNewProduct, Row, ProductModal } from '../';
import { useAuthStore, useProductStore, useSaleDetailStore } from '../../../hooks';

import './style.css';

export const ProductPage = () => {

    const { user } = useAuthStore();
    const { products, startLoadingProducts } = useProductStore();
    const { startLoadingAllDetails } = useSaleDetailStore();

    useEffect(() => {
        startLoadingProducts();
        startLoadingAllDetails();
    }, [])
    
    return (
        <>
            <div className="text-center">
                <h1>Productos</h1>
            </div>
            {user.userType === 'admin' && <AddNewProduct />}
            <div className="m-md-auto table-responsive">
                <table className="table table-striped text-center">
                    <thead className="bg-dark text-white">
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Descripción</th>
                            <th scope="col">Stock</th>
                            {user.userType === 'admin' && <th scope="col">Precio de Compra</th>}
                            <th scope="col">Precio de Venta</th>
                            <th scope="col">Categoría</th>
                            <th scope="col">Proveedor</th>
                            <th scope="col">&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        { products.map( product => (<Row key={ product._id } { ...product } />) ) }
                    </tbody>
                </table>
            </div>
            <ProductModal />
        </>
    )
}
