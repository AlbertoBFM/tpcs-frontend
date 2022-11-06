import { Button, ButtonGroup, Input } from 'reactstrap';
import { useProductStore, useSaleCartStore } from '../../../hooks';
import { messageAlert } from '../../../helpers';

export const SaleCartRow = ( item ) => {
    const { _id, name, salePrice, quantity, subtotal  } = item;

    const { startAddToCart, startRemoveToCart, startRemoveAllToCart, startChangeQuantity, startChangeSalePrice } = useSaleCartStore();
    const { products, allProducts } = useProductStore();

    const handleDelete = () => {
        startRemoveAllToCart( item );
    }

    const handleIncrement = () => {

        const selectedProduct = allProducts.find( product => product._id === _id );

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

    
    const handleInputChangeSalePrice = ( e ) => {
        startChangeSalePrice( item, e.target.value );
    }
    
    const handleBlurSalePrice = ( e ) => {
        const selectedProduct = allProducts.find( product => product._id === _id );
        if ( Number(selectedProduct.purchasePrice) >= Number(e.target.value) ) {
            startChangeSalePrice( item, selectedProduct.purchasePrice + 1 );
            return messageAlert(`Límite del precio de venta es de ${ selectedProduct.purchasePrice }`, '', 'warning'); 
        }
        else if ( e.target.value <= 0 )
            startChangeSalePrice( item, 1 );
    };
    
    const handleInputChangeQuantity = ( e ) => {
        startChangeQuantity( item, e.target.value );
    }

    const handleBlurQuantity = ( e ) => {
        const selectedProduct = allProducts.find( product => product._id === _id );
        if ( Number(selectedProduct.stock) < Number(e.target.value) ) {
            startChangeQuantity( item, selectedProduct.stock );
            return messageAlert(`Límite de <i>"${ selectedProduct.name }"</i> disponibles ${ selectedProduct.stock }`, '', 'warning'); 
        }
        else if ( e.target.value <= 0 )
            startChangeQuantity( item, 1 );
    };
    return (
        <tr>
            <td><b>{ name }</b></td>
            {/* <td>{ salePrice }</td> */}
            <td>
                <Input 
                    value={ salePrice } onBlur={ handleBlurSalePrice } onChange={ handleInputChangeSalePrice } 
                    type="number" className="w-75 text-center m-auto" min="1" bsSize="sm"
                />
            </td>
            <td>
                <ButtonGroup>
                    <Button onClick={ handleDecrement } outline color="primary" size="sm" className="w-25">
                        <i className="fas fa-solid fa-minus"></i>
                    </Button>
                    <Input 
                        value={ quantity } onBlur={ handleBlurQuantity } onChange={ handleInputChangeQuantity } 
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