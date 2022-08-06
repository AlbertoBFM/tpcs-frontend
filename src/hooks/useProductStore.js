import { useSelector, useDispatch } from 'react-redux';
import { onAddNewProduct, onDeleteProduct, onSetActiveProduct, onUpdateProduct } from '../store';

export const useProductStore = () => {

    const dispatch = useDispatch();

    const { products, activeProduct } = useSelector( state => state.product );
    const { categories } = useSelector( state => state.category );

    const setActiveProduct = ( product ) => {
        dispatch( onSetActiveProduct( product ) );
    }

    const startSavingProduct = async ( product ) => {
        // TODO: Backend

        if ( product._id ) {
            //* Update
            if( product.category._id ) { //* Si regresa con la misma categoría
                dispatch( onUpdateProduct({ ...product }) );    
            }
            else {
                const { _id, name } = categories.find( category => category._id === product.category.toString() );
                delete product.category;
                dispatch( onUpdateProduct({ ...product, category: { _id, name } }) );
            }
        } else {
            //* Create //*
            //* Para tener el nombre de la categoría
            console.log(categories);
            const { _id, name } = categories.find( category => category._id === product.category );
            delete product.category;

            const newProduct = { _id: new Date().getTime().toString(), ...product, category: { _id, name } };
            dispatch( onAddNewProduct( newProduct ) );
        }
    }

    const startDeletingProduct = async () => {
        // TODO: Backend

        dispatch( onDeleteProduct() );
    }

    return {
        //* Properties
        products,
        activeProduct,
        //* Methods
        setActiveProduct,
        startSavingProduct,
        startDeletingProduct,
    }

}