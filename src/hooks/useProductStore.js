import { useSelector, useDispatch } from 'react-redux';
import { onAddNewProduct, onDeleteProduct, onSetActiveProduct, onUpdateProduct } from '../store';

export const useProductStore = () => {

    const dispatch = useDispatch();

    const { products, activeProduct } = useSelector( state => state.product );
    const { categories } = useSelector( state => state.category );
    const { providers } = useSelector( state => state.provider );

    const setActiveProduct = ( product ) => {
        dispatch( onSetActiveProduct( product ) );
    }

    const startSavingProduct = async ( product ) => {
        // TODO: Backend

        if ( product._id ) {
            //* Update
            if( product.category._id && product.provider._id ) { //* Si regresa con la misma CATEGORÍA y PROVEEDOR
                dispatch( onUpdateProduct({ ...product }) );    
            }
            else {
                let category, provider;
                
                if ( !product.category._id ) {
                    const { _id, name } = categories.find( category => category._id === product.category.toString() );
                    delete product.category;
                
                    category = { _id, name };
                } 
                else category = product.category;
                
                if ( !product.provider._id ) {
                    const { _id, name } = providers.find( provider => provider._id === product.provider.toString() );
                    delete product.provider;
                
                    provider = { _id, name };
                } 
                else provider = product.provider;

                dispatch( onUpdateProduct({ ...product, category, provider }) );
            }
        } else {
            //* Create //*
            //* Para tener el nombre de la categoría
            const Selectcategory = categories.find( category => category._id === product.category );
            delete product.category;
            const Selectprovider = providers.find( provider => provider._id === product.provider );
            delete product.provider;

            const newProduct = { 
                _id: new Date().getTime().toString(), 
                ...product, 
                category: { 
                    _id: Selectcategory._id, 
                    name: Selectcategory.name 
                },
                provider: { 
                    _id: Selectprovider._id, 
                    name: Selectprovider.name 
                }
            };
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