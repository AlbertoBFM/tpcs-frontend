import { messageAlert, queryAlert } from '../../../helpers';
import { useProviderStore, useProductStore, useUiStore, useAuthStore } from '../../../hooks';

export const Row = ( provider ) => {

    const { name, description, phone, address } = provider;

    const { user } = useAuthStore();
    const { openModal, activeButton } = useUiStore();
    const { setActiveProvider, startDeletingProvider } = useProviderStore();
    const { products } = useProductStore();

    const handleUpdate = () => { //* Actualizar
        activeButton( true );
        setActiveProvider( provider );
        openModal();
    }

    const handleDelete = async () => { //* Eliminar
        setActiveProvider( provider );

        const searchProductWithProvider = products.find( product => product.provider?._id === provider._id );
        if ( searchProductWithProvider ) 
            return messageAlert(`No puedes borrar la categoría "${ provider.name }"`, 'Tienes productos registrados con este Proveedor', 'error');
        else{
            const resp = await queryAlert(`¿Eliminar la categoría "${ name }"?`, 'warning', 'Eliminar', 'Cancelar');
            if ( !resp ) return;

            startDeletingProvider( provider );
            return messageAlert('Proveedor Eliminado', '', 'success');
        }
    }

    return (
        <tr>
            <td><b>{ name.toUpperCase() }</b></td>
            <td>{ description }</td>
            <td><b>{ phone }</b></td>
            <td>{ address }</td>
            {
                user.userType === 'admin' 
                && 
                <>
                    <td>
                        <div className="btn-group" role="group">
                            <button type="button" className="btn btn-warning"
                                onClick={ handleUpdate }
                            >
                                <i className="fas fa-pen"></i>
                            </button>
                            <button type="button" className="btn btn-danger"
                                onClick={ handleDelete }
                            >
                                <i className="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </td>
                </>
            }
        </tr>
    )
    
}
