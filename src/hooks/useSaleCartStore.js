import { useSelector, useDispatch } from 'react-redux';
import { onAddToCart, onAddOneToCart, onRemoveOneToCart, onRemoveAllFromCart, onChangeSalePrice, onChangeQuantity, onClearCart, onCiNitChange } from '../store';

export const useSaleCartStore = () => {

    const dispatch = useDispatch();

    const {
        cart,
        ciNit,
        profit,
        total,
    } = useSelector( state => state.saleCart );

    const startCiNitChange = ( value ) => {
        dispatch( onCiNitChange( value ) );
    }

    const startAddToCart = ( selectedItem ) => {

        const searchItem = cart.find( item => item._id === selectedItem._id );
        
        if ( !searchItem ) {
            dispatch( onAddToCart({ ...selectedItem, quantity: 1, subtotal: selectedItem.salePrice, profit: selectedItem.salePrice - selectedItem.purchasePrice }) );
            return;
        }
        dispatch( onAddOneToCart( selectedItem ) );

    }

    const startRemoveToCart = ( selectedItem ) => {

        if( selectedItem.quantity > 1 ){
            dispatch( onRemoveOneToCart( selectedItem ) );
            return;
        }
        dispatch( onRemoveAllFromCart( selectedItem ) );
    }

    const startRemoveAllToCart = ( selectedItem ) => {
        dispatch( onRemoveAllFromCart( selectedItem ) );
    }
    
    const startChangeSalePrice = ( selectedItem, newSalePrice ) => {
        selectedItem = { ...selectedItem, salePrice: newSalePrice};
        dispatch( onChangeSalePrice( selectedItem ) );
    }

    const startChangeQuantity = ( selectedItem, newQuantity ) => {
        selectedItem = { ...selectedItem, quantity: newQuantity};
        dispatch( onChangeQuantity( selectedItem ) );
    }

    const startClearCart = () => {
        dispatch( onClearCart() );
    }

    return {
        //* Properties
        cart,
        ciNit,
        profit,
        total,
        //* Methods
        startCiNitChange,
        startAddToCart,
        startRemoveToCart,
        startRemoveAllToCart,
        startChangeQuantity,
        startChangeSalePrice,
        startClearCart
    }

}