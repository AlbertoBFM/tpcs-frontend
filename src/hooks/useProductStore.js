import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { tpcsApi } from '../api';
import { 
    onAddNewProduct, 
    onDeleteProduct, 
    onLoadProducts, 
    onSetActiveProduct, 
    onUpdateProduct, 
    onUpdateProductStockAddSale,
    onUpdateProductStockSubSale
} from '../store';

export const useProductStore = () => {

    const dispatch = useDispatch();

    const { products, activeProduct } = useSelector( state => state.product );
    const { categories } = useSelector( state => state.category );
    const { providers } = useSelector( state => state.provider );

    const setActiveProduct = ( product ) => {
        dispatch( onSetActiveProduct( product ) );
    }

    const startLoadingProducts = async () => {

        try {
            const { data } = await tpcsApi.get( '/product' );
            dispatch( onLoadProducts( data.products ) );

        } catch (error) {
            console.log('Error al cargar los productos');
            console.log( error );
        }

    }

    const startSavingProduct = async ( product ) => {
        // TODO: Backend
        try {
            if ( product._id ) {
                //* Update *\\
                if( product.category._id && product.provider._id ) { //* Si regresa con la misma CATEGORÍA y PROVEEDOR
                    const idProvider = product.provider._id;
                    const idCategory = product.category._id;
                    
                    await tpcsApi.put( 
                        `/product/${ product._id }`,
                        { ...product, provider: idProvider, category: idCategory } // Solo se requieren los id's para el registro
                    );
                    dispatch( onUpdateProduct({ ...product }) );  
                    return true;  
                }
                else {
                    let category, idCategory, provider, idProvider;
                    
                    if ( !product.category._id ) {
                        const { _id, name } = categories.find( category => category._id === product.category.toString() );
                        delete product.category;
                    
                        category = { _id, name };
                        idCategory = _id;
                    } 
                    else {
                        category = product.category;
                        idCategory = product.category._id;
                    }
                    
                    if ( !product.provider._id ) {
                        const { _id, name } = providers.find( provider => provider._id === product.provider.toString() );
                        delete product.provider;
                    
                        provider = { _id, name };
                        idProvider = _id;
                    } 
                    else {
                        provider = product.provider;
                        idProvider = product.provider._id;
                    }
    
                    await tpcsApi.put( 
                        `/product/${ product._id }`,
                        { ...product, provider: idProvider, category: idCategory } // Solo se requieren los id's para el registro
                    );
                    dispatch( onUpdateProduct({ ...product, category, provider }) );
                    return true;
                }
            } else {
                //* Create *\\
                //* Para tener el nombre de la categoría
                const { data } = await tpcsApi.post( '/product', product );

                const Selectcategory = categories.find( category => category._id === product.category );
                const Selectprovider = providers.find( provider => provider._id === product.provider );
                delete product.category;
                delete product.provider;
    
                const newProduct = { 
                    _id: data.product._id, 
                    ...product, 
                    category: { _id: Selectcategory._id, name: Selectcategory.name },
                    provider: { _id: Selectprovider._id, name: Selectprovider.name }
                };
                dispatch( onAddNewProduct( newProduct ) );
                return true;
            }
        } catch (error) {
            console.log( error );
            Swal.fire( 'Error al Guardar', error.response.data?.msg, 'error' );
            return false;
        }
    }

    const startDeletingProduct = async ( product ) => {
        try {
            await tpcsApi.delete( `/product/${ product._id }` );
            dispatch( onDeleteProduct() );
        } catch (error) {
            console.log( error );
            Swal.fire( 'Error al Eliminar', error.response.data?.msg, 'error' );
        }
    }

    const startUpdateProductStockAddSale = async ( cart ) => {
        cart.map( item => {
            dispatch( onUpdateProductStockAddSale( item ));
        });
    }

    const startUpdateProductStockSubSale = async ( selectedDetails ) => {
        selectedDetails.map( saleDetail => {
            dispatch( onUpdateProductStockSubSale( saleDetail ));
        });
    }

    return {
        //* Properties
        products,
        activeProduct,
        //* Methods
        setActiveProduct,
        startLoadingProducts,
        startSavingProduct,
        startDeletingProduct,
        startUpdateProductStockAddSale,
        startUpdateProductStockSubSale
    }

}