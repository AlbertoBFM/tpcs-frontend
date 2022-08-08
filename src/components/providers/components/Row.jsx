import { useProviderStore, useProductStore, useUiStore } from '../../../hooks';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export const Row = ( provider ) => {

    const { openModal, activeButton } = useUiStore();
    const { setActiveProvider, startDeletingProvider } = useProviderStore();

    const { products } = useProductStore();

    const { _id, name, description, phone, address } = provider;

    const handleUpdate = ( provider ) => { //* Actualizar
        activeButton( true );
        setActiveProvider( provider );
        openModal();
    }

    const handleDelete = ( provider ) => { //* Eliminar
        setActiveProvider( provider );

        const searchProductWithProvider = products.find( product => product.provider?._id === provider._id );
        // console.log(searchProductWithProvider);
        if ( searchProductWithProvider ) {
            Swal.fire({
                icon: 'error',
                title: `No puedes borrar la categoría "${ provider.name }"`,
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
                    startDeletingProvider();
                }
            })
        }


    }

    return (
        <tr>
            {/* <td scope="row" className="">{ _id }</td> */}
            <td><b>{ name }</b></td>
            <td>{ description }</td>
            <td><b>{ phone }</b></td>
            <td>{ address }</td>
            <td>
                <div className="btn-group" role="group">
                    <button type="button" className="btn btn-warning"
                        onClick={ () => handleUpdate( provider ) }
                    >
                        <i className="fas fa-pen"></i>
                    </button>
                    <button type="button" className="btn btn-danger"
                        onClick={ () => handleDelete( provider ) }
                    >
                        <i className="fas fa-trash-alt"></i>
                    </button>
                </div>
            </td>
        </tr>
    )
    
}
