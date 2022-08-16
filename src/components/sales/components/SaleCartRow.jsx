import { useProductStore, useSaleCartStore } from "../../../hooks";

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export const SaleCartRow = ( item ) => {

    const { _id, name, salePrice, quantity, subtotal  } = item;

    const { startAddToCart, startRemoveToCart, startRemoveAllToCart, startChangeQuantity } = useSaleCartStore();
    const { products } = useProductStore();

    const handleDelete = () => {
        startRemoveAllToCart( item );
    }

    const handleIncrement = () => {

        const selectedProduct = products.find( product => product._id === _id );

        if ( Number( selectedProduct.stock ) <= Number(quantity) ) {
            startChangeQuantity( item, selectedProduct.stock );
            Swal.fire({
                position: 'top-end',
                icon: 'warning',
                title: `Límite de <i>"${ selectedProduct.name }"</i> disponibles ${ quantity }`,
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }

        startAddToCart( item );
    }

    const handleDecrement = () => {
        if ( Number(item.quantity) === 1 ) return;

        startRemoveToCart( item );
    }

    const handleInputChange = ( e ) => {
        startChangeQuantity( item, e.target.value );
    }
    const handleBlur = ( e ) => {

        const selectedProduct = products.find( product => product._id === _id );

        if ( Number(selectedProduct.stock) < e.target.value ) {
            startChangeQuantity( item, selectedProduct.stock );
            Swal.fire({
                position: 'top-end',
                icon: 'warning',
                title: `Límite de <i>"${ selectedProduct.name }"</i> disponibles ${ quantity }`,
                showConfirmButton: false,
                timer: 1500
            })
            return;
        }
        else if ( e.target.value <= 0 ) {
            startChangeQuantity( item, 1 );
        }
    };
    return (
        <tr>
            {/* <td scope="row" className="">{ _id }</td> */}
            <td><b>{ name }</b></td>
            <td>{ salePrice }</td>
            <td>
                <div className="btn-group w-50">
                    <button className="btn btn-outline-primary btn-sm w-25"  onClick={ handleDecrement }><i className="fas fa-solid fa-minus"></i></button>
                    {/* <b> { quantity } </b> */}
                    <input type="number" className="form-control-sm w-50 text-center" min="1" 
                        value={ quantity } onBlur={handleBlur} onChange={ handleInputChange } />
                    <button className="btn btn-outline-primary btn-sm w-25" onClick={ handleIncrement }><i className="fas fa-solid fa-plus"></i></button>
                </div>
            </td>
            <td>{ subtotal }</td>
            <td>
                <div className="btn-group" role="group">
                    <button type="button" className="btn text-danger"
                        onClick={ handleDelete }
                    >
                        <i className="fas fa-solid fa-xmark"></i>
                    </button>
                </div>
            </td>
        </tr>
    )
    
}