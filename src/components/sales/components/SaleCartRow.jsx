import { Button, ButtonGroup, Input } from 'reactstrap';
import { useProductStore, useSaleCartStore } from '../../../hooks';
import { messageAlert } from '../../../helpers';

export const SaleCartRow = ( item ) => {
    const { _id, name, salePrice, quantity, subtotal  } = item;

    const { startAddToCart, startRemoveToCart, startRemoveAllToCart, startChangeQuantity } = useSaleCartStore();
    const { products } = useProductStore();

    const handleDelete = () => {
        startRemoveAllToCart( item );
    }

    const handleIncrement = () => {

        const selectedProduct = products.docs.find( product => product._id === _id );

        if ( Number( selectedProduct.stock ) <= Number(quantity) ) {
            startChangeQuantity( item, selectedProduct.stock );
            return messageAlert(`Límite de <i>"${ selectedProduct.name }"</i> disponibles ${ selectedProduct.stock }`, '', 'warning');
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

        const selectedProduct = products.docs.find( product => product._id === _id );

        if ( Number(selectedProduct.stock) < Number(e.target.value) ) {
            startChangeQuantity( item, selectedProduct.stock );
            return messageAlert(`Límite de <i>"${ selectedProduct.name }"</i> disponibles ${ selectedProduct.stock }`, '', 'warning'); 
        }
        else if ( e.target.value <= 0 ) {
            startChangeQuantity( item, 1 );
        }
    };
    return (
        <tr>
            <td><b>{ name }</b></td>
            <td>{ salePrice }</td>
            <td>
                <ButtonGroup>
                    <Button onClick={ handleDecrement } outline color="primary" size="sm" className="w-25">
                        <i className="fas fa-solid fa-minus"></i>
                    </Button>
                    <Input 
                        value={ quantity } onBlur={handleBlur} onChange={ handleInputChange } 
                        type="number" className="w-50 text-center" min="1" bsSize="sm"
                    />
                    <Button onClick={ handleIncrement } outline color="primary" size="sm" className="w-25">
                        <i className="fas fa-solid fa-plus"></i>
                    </Button>
                </ButtonGroup>
            </td>
            <td>{ subtotal }</td>
            <td>
                <ButtonGroup>
                    <Button onClick={ handleDelete } color="link" className="text-danger">
                        <i className="fas fa-solid fa-xmark"></i>
                    </Button>
                </ButtonGroup>
            </td>
        </tr>
    )
}