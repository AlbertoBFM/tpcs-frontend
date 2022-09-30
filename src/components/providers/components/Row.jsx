import { Button, ButtonGroup } from 'reactstrap';
import { messageAlert, queryAlert } from '../../../helpers';
import { useProviderStore, useProductStore, useUiStore, useAuthStore } from '../../../hooks';

export const Row = ( provider ) => {

    const { name, description, phone, address } = provider;

    const { user } = useAuthStore();
    const { toggleModal, activeButton } = useUiStore();
    const { setActiveProvider, startDeletingProvider } = useProviderStore();
    const { products } = useProductStore();

    const handleUpdate = () => { //* Actualizar
        activeButton( true );
        setActiveProvider( provider );
        toggleModal();
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
                        <ButtonGroup>
                            <Button onClick={ handleUpdate } color="warning">
                                <i className="fas fa-pen"></i>
                            </Button>
                            <Button onClick={ handleDelete } color="danger">
                                <i className="fas fa-trash-alt"></i>
                            </Button>
                        </ButtonGroup>
                    </td>
                </>
            }
        </tr>
    )
    
}
