import { useAuthStore, useCategoryStore, useProductStore, useUiStore } from '../../../hooks';
import { messageAlert, queryAlert } from '../../../helpers';

export const Row = ( category ) => {

    const { name, description } = category;

    const { user } = useAuthStore();
    const { openModal, activeButton } = useUiStore();
    const { setActiveCategory, startDeletingCategory } = useCategoryStore();
    const { products } = useProductStore();

    const handleUpdate = () => { //* Actualizar
        activeButton( true );
        setActiveCategory( category );
        openModal();
    }

    const handleDelete = async () => { //* Eliminar
        setActiveCategory( category );

        const searchProductWithCategory = products.find( product => product.category?._id === category._id );
        if ( searchProductWithCategory ) {
            return messageAlert(
                `No puedes borrar la categoría "${ category.name }"`, 
                'Tienes productos registrados en esta Categoría', 'error'
            );
        }
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
