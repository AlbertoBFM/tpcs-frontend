import { useEffect } from 'react';
import { Table } from 'reactstrap';
import { useAuthStore, useProductStore, useProviderStore } from '../../../hooks';
import { Row, AddNewProvider, ProviderModal, SearchFilter, MyPagination } from '../';
import './style.css';

export const ProviderPage = () => {
    const { user } = useAuthStore();
    const { providers: { docs }, startLoadingProviders } = useProviderStore();
    const { startLoadingProducts } = useProductStore();

    useEffect(() => {
        startLoadingProviders({});
        startLoadingProducts();
    }, [])

    return (
        <>
            <div className="text-center">
                <h1>Proveedores</h1>
            </div>
            <div className="col-md-8 m-md-auto">
                <div className="d-flex justify-content-between align-items-center m-3">
                    <SearchFilter/>
                    {user.userType === 'admin' && <AddNewProvider />}
                </div>
                <Table responsive striped className="text-center">
                    <thead className="bg-dark text-white">
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Descripción</th>
                            <th scope="col">Celular</th>
                            <th scope="col">Dirección</th>
                            {user.userType === 'admin' && <th scope="col">&nbsp;</th>}
                        </tr>
                    </thead>
                    <tbody>
                        { docs?.map( provider => (<Row key={ provider._id } { ...provider } />) ) }
                    </tbody>
                </Table>
                <MyPagination />
            </div>
            <ProviderModal />
        </>
    )
}
