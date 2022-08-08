import { useProviderStore } from '../../../hooks';
import { Row, AddNewProvider, ProviderModal } from '../';

import '../components/styles.css';

export const ProviderPage = () => {

    const { providers } = useProviderStore();

    return (
        <>
            <div className="text-center">
                <h1>ProviderPage</h1>
            </div>
            <AddNewProvider />
            <div className="m-md-auto table-responsive">
                <table className="table table-striped text-center">
                    <thead className="bg-dark text-white">
                        <tr>
                            {/* <th scope="col">Id</th> */}
                            <th scope="col">Nombre</th>
                            <th scope="col">Descripción</th>
                            <th scope="col">Celular</th>
                            <th scope="col">Dirección</th>
                            <th scope="col">&nbsp;</th>
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
