import { useEffect } from 'react';
import { Table } from 'reactstrap';
import { useAuthStore, useProductStore, useProviderStore } from '../../../hooks';
import { Row, AddNewProvider, ProviderModal, SearchFilter, MyPagination } from '../';
import './style.css';

export const ProviderPage = () => {
    const { user } = useAuthStore();
    const { providers: { docs }, startLoadingProviders } = useProviderStore();
    const { startLoadingAllProducts } = useProductStore();

    useEffect(() => {
        startLoadingProviders({});
        startLoadingAllProducts();
    }, [])

    return (
        <>
            <div className="text-center">
                <h1>Proveedores</h1>
            </div>
            <div className="col-md-8 m-md-auto">
                <div className="row m-3">
                    <div className="col-sm-12 col-md-6 mt-3">
                        <SearchFilter/>
                    </div>
                    {
                        user.userType === 'admin' && 
                        <div className="col-sm-12 col-md-6 mt-3">
                            <AddNewProvider />
                        </div>
                    }
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
