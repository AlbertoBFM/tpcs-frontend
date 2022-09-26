import { useEffect } from 'react';
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
            {user.userType === 'admin' && <AddNewProvider />}
            <div className="m-md-auto table-responsive">
                <table className="table table-striped text-center">
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
                </table>
            </div>
            <ProviderModal />
        </>
    )
}
