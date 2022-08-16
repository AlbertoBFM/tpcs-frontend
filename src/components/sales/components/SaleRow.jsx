import { useSaleStore, useUiStore } from '../../../hooks';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export const SaleRow = ( sale ) => {

    const { openModal } = useUiStore();
    const { setActiveSale, startDeletingSale } = useSaleStore();

    const { _id, user, client, date, total  } = sale;

    const handleView = () => {
        setActiveSale( sale );
        openModal();
    }

    const handleDelete = () => { //* Eliminar
        console.log('delete');
        // setActiveProduct( product );

        // Swal.fire({
        //     title: `¿Eliminar el producto "${ name }"?`,
        //     icon: 'warning', showCancelButton: true,
        //     confirmButtonColor: '#3085d6', confirmButtonText: 'Eliminar',
        //     cancelButtonColor: '#d33', cancelButtonText: 'Cancelar'
        // }).then((result) => {
        //     if (result.isConfirmed) {
        //         Swal.fire({
        //             position: 'top-end', icon: 'success',
        //             title: 'Producto Eliminado', showConfirmButton: false, timer: 1500
        //         })
        //         startDeletingProduct();
        //     }
        // })
    }

    return (
        <tr>
            <td scope="row" className="">{ _id }</td>
            <td><b>{ user.name }</b></td>
            <td>{ client.name }</td>
            <td><b>{ date }</b></td>
            <td>{ total }</td>
            <td>
                <div className="btn-group" role="group">
                    <button type="button" className="btn btn-outline-primary"
                        onClick={ handleView }
                    >
                        <i className="fas fa-solid fa-eye"></i>
                    </button>
                    <button type="button" className="btn btn-danger"
                        onClick={ () => handleDelete( sale ) }
                    >
                        <i className="fas fa-trash-alt"></i>
                    </button>
                </div>
            </td>
        </tr>
    )
    
}
