import { useCategoryStore, useProductStore, useUiStore } from '../../../hooks';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export const Row = ( category ) => {

    const { openModal, activeButton } = useUiStore();
    const { setActiveCategory, startDeletingCategory } = useCategoryStore();

    const { products } = useProductStore();

    const { _id, name, description } = category;

    const handleUpdate = ( category ) => { //* Actualizar
        activeButton( true );
        setActiveCategory( category );
        openModal();
    }

    const handleDelete = ( category ) => { //* Eliminar
        setActiveCategory( category );

        const searchProductWithCategory = products.find( product => product.category?._id === category._id );
        // console.log(searchProductWithCategory);
        if ( searchProductWithCategory ) {
            Swal.fire({
                icon: 'error',
                title: `No puedes borrar la categoría "${ category.name }"`,
                text: 'Tienes productos registrados en esta Categoría',
                showConfirmButton: false
            })
        }
        else{
            Swal.fire({
                title: `¿Eliminar la categoría "${ name }"?`, icon: 'warning', showCancelButton: true,
                confirmButtonColor: '#3085d6', confirmButtonText: 'Eliminar',
                cancelButtonColor: '#d33', cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        position: 'top-end', icon: 'success', title: 'Categoría Eliminada',
                        showConfirmButton: false, timer: 1500
                    })
                    startDeletingCategory( category );
                }
            })
        }


    }

    return (
        <tr>
            {/* <td scope="row" className="">{ _id }</td> */}
            <td><b>{ name.toUpperCase() }</b></td>
            <td>{ description }</td>
            <td>
                <div className="btn-group" role="group">
                    <button type="button" className="btn btn-warning"
                        onClick={ () => handleUpdate( category ) }
                    >
                        <i className="fas fa-pen"></i>
                    </button>
                    <button type="button" className="btn btn-danger"
                        onClick={ () => handleDelete( category ) }
                    >
                        <i className="fas fa-trash-alt"></i>
                    </button>
                </div>
            </td>
        </tr>
    )
    
}
