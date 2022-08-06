import { useProductStore, useUiStore } from '../../../hooks';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export const Row = ( product ) => {

    const { openModal } = useUiStore();
    const { setActiveProduct, startDeletingProduct } = useProductStore();

    const { _id, name, description, stock, purchasePrice, salePrice, category } = product;

    const handleUpdate = ( product ) => { //* Actualizar
        setActiveProduct( product );
        openModal();
    }

    const handleDelete = () => { //* Eliminar
        setActiveProduct( product );

        Swal.fire({
            title: `¿Eliminar el producto "${ name }"?`,
            icon: 'warning', showCancelButton: true,
            confirmButtonColor: '#3085d6', confirmButtonText: 'Eliminar',
            cancelButtonColor: '#d33', cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    position: 'top-end', icon: 'success',
                    title: 'Producto Eliminado', showConfirmButton: false, timer: 1500
                })
                startDeletingProduct();
            }
        })
    }

    return (
        <tr>
            {/* <td scope="row" className="">{ _id }</td> */}
            <td><b>{ name }</b></td>
            <td>{ description }</td>
            <td><b>{ stock }</b></td>
            <td>{ purchasePrice }</td>
            <td><b>{ salePrice }</b></td>
            <td>{ category.name }</td>
            <td>
                <div className="btn-group" role="group">
                    <button type="button" className="btn btn-warning"
                        onClick={ () => handleUpdate( product ) }
                    >
                        <i className="fas fa-pen"></i>
                    </button>
                    <button type="button" className="btn btn-danger"
                        onClick={ () => handleDelete( product ) }
                    >
                        <i className="fas fa-trash-alt"></i>
                    </button>
                </div>
            </td>
        </tr>
    )
    
}
