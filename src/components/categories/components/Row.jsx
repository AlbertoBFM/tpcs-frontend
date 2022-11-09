import { Button, ButtonGroup } from 'reactstrap';
import { useAuthStore, useCategoryStore, useProductStore, useUiStore } from '../../../hooks';
import { messageAlert, queryAlert } from '../../../helpers';

export const Row = ( category ) => {

    const { name, description } = category;

    const { user } = useAuthStore();
    const { toggleModal, activeButton } = useUiStore();
    const { setActiveCategory, startDeletingCategory } = useCategoryStore();
    const { allProducts } = useProductStore();

    const handleUpdate = () => { //* Actualizar
        activeButton( true );
        setActiveCategory( category );
        toggleModal();
    }

    const handleDelete = async () => { //* Eliminar
        setActiveCategory( category );

        const searchProductWithCategory = allProducts.find( product => product.category?._id === category._id );
        if ( searchProductWithCategory ) 
            return messageAlert(`No puedes borrar la categoría "${ category.name }"`, 'Tienes productos registrados en esta Categoría', 'error');
        else{
            const resp = await queryAlert(`¿Eliminar la categoría "${ name }"?`, 'warning', 'Eliminar', 'Cancelar');
            if ( !resp ) return;

            startDeletingCategory( category );

            return messageAlert('Categoría Eliminada', '', 'success');
        }
    }

    return (
        <tr>
            <td><b>{ name.toUpperCase() }</b></td>
            <td>{ description }</td>
            {
                user.userType === 'admin' 
                && 
                <>
                    <td>
                        <ButtonGroup>
                            <Button onClick={ handleUpdate } outline color="dark">
                                <i className="fas fa-pen"></i>
                            </Button>
                            <Button onClick={ handleDelete } color="secondary">
                                <i className="fas fa-trash-alt"></i>
                            </Button>
                        </ButtonGroup>
                    </td>
                </>
            }
        </tr>
    )
    
}
