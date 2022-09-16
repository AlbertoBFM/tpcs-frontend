import { useProductStore, useSaleCartStore, useUiStore } from '../../../hooks';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export const Row = ( product ) => {

    const { openModal, activeButton } = useUiStore();
    const { setActiveProduct, startDeletingProduct } = useProductStore();
    const { cart, startAddToCart, startChangeQuantity } = useSaleCartStore();

    const { _id, name, description, stock, purchasePrice, salePrice, category, provider } = product;

    const handleUpdate = ( product ) => { //* Actualizar
        activeButton( true );
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
                startDeletingProduct( product );
            }
        })
    }

    const handleAddToCart = () => {
        const selectedCartProduct = cart.find( item => item._id === _id );
        if ( selectedCartProduct ) {

            if ( Number( stock ) <= Number( selectedCartProduct.quantity ) ) {
                startChangeQuantity( product, stock );
                Swal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    title: `Límite de <i>"${ selectedCartProduct.name }"</i> disponibles ${ stock }`,
                    showConfirmButton: false,
                    timer: 2000
                })
                return;
            }
            
        }

        startAddToCart( product );
    }

    return (
        <tr>
            {/* <td scope="row" className="">{ _id }</td> */}
            <td><b>{ name }</b></td>
            <td>{ description }</td>
            <td><b>{ stock }</b></td>
            <td>{ purchasePrice }</td>
            <td><b>{ salePrice }</b></td>
            <td>{ category?.name }</td>
            <td><b>{ provider?.name }</b></td>
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
                    <button type="button" className="btn btn-secondary"
                        onClick={ handleAddToCart }
                        disabled={ Number(stock) === 0 }
                    >
                        <i className="fas fa-solid fa-cart-plus"></i>
                    </button>
                </div>
            </td>
        </tr>
    )
    
}
