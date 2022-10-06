import { useEffect } from 'react';
import { Table } from 'reactstrap';
import { useAuthStore, useProductStore, useSaleDetailStore } from '../../../hooks';
import { AddNewProduct, Row, ProductModal, SearchFilter, MyPagination } from '../';
import './style.css';

export const ProductPage = () => {
    const { user } = useAuthStore();
    const { products: { docs }, startLoadingProducts } = useProductStore();
    const { startLoadingAllDetails } = useSaleDetailStore();

    useEffect(() => {
        startLoadingProducts({});
        startLoadingAllDetails();
    }, [])
    
    return (
        <>
            <div className="text-center">
                <h1>Productos</h1>
            </div>
            <div className="col-md-8 m-md-auto">
                <div className="d-flex justify-content-between align-items-center m-3">
                    <SearchFilter/>
                    {user.userType === 'admin' && <AddNewProduct />}
                </div>
                <Table responsive striped className="text-center">
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
                        { docs?.map( product => (<Row key={ product._id } { ...product } />) ) }
                    </tbody>
                </Table>
                <MyPagination />
            </div>
            <ProductModal />
        </>
    )
}
