import { useEffect } from 'react';
import { Table } from 'reactstrap';
import { useAuthStore, useProductStore, useProviderStore } from '../../../hooks';
import { Row, AddNewProvider, ProviderModal } from '../';
import './style.css';

export const ProviderPage = () => {
    const { user } = useAuthStore();
    const { startLoadingProducts } = useProductStore();
    const { providers, startLoadingProviders } = useProviderStore();

    useEffect(() => {
        startLoadingProviders();
        startLoadingProducts();
    }, [])

    return (
        <>
            <div className="text-center">
                <h1>Proveedores</h1>
            </div>
            <div className="col-md-8 m-md-auto">
                {user.userType === 'admin' && <AddNewProvider />}
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
                        { providers.map( provider => (<Row key={ provider._id } { ...provider } />) ) }
                    </tbody>
                </Table>
            </div>
            <ProviderModal />
        </>
    )
}
