import { useSelector, useDispatch } from 'react-redux';
import { tpcsApi } from '../api';
import { messageAlert } from '../helpers';
import { onAddNewProduct, onChangeSearchedProduct, onDeleteProduct, onLoadAllProducts, onLoadProducts, onSetActiveProduct, onUpdateProduct, onUpdateProductStockAddSale,onUpdateProductStockSubSale } from '../store';

export const useProductStore = () => {

    const dispatch = useDispatch();

    const { allProducts, products, searchedProduct, activeProduct } = useSelector( state => state.product );
    const { allCategories } = useSelector( state => state.category );
    const { allProviders } = useSelector( state => state.provider );

    const setActiveProduct = ( product ) => {
        dispatch( onSetActiveProduct( product ) );
    }
    
    const startChangeSearchProduct = ( searchedProduct ) => {
        dispatch( onChangeSearchedProduct( searchedProduct ) );
    }

    const startLoadingAllProducts = async () => {
        try {
            const { data } = await tpcsApi.get( '/product/all' );
            dispatch( onLoadAllProducts( data.products ) );
        } catch (error) {
            console.log('Error al cargar los productos');
            console.log( error );
        }
    }

    const startLoadingProducts = async ({pageNumber, searchedProduct}) => {
        try {
            const page = pageNumber || localStorage.getItem('productPage') || 1;
    
            const { localName: searchedName, localCategory: searchedCategory, localProvider: searchedProvider } = searchedProduct || {};
            const { localName, localCategory, localProvider } = JSON.parse( localStorage.getItem('searchedProduct') ) || {};
            const name = ( searchedName === '' ) //* Si la cadena esta vacia que retorne eso, lo hago de esta manera ya que en la expresión OR cuando ve una cadena vacia lo toma como null
                            ? ('') 
                            : (searchedName || localName || ''); 
            const category = ( searchedCategory === '' ) 
                            ? ('') 
                            : (searchedCategory || localCategory || '');
            const provider = ( searchedProvider === '' ) 
                            ? ('') 
                            : (searchedProvider || localProvider || '');
                            
            const { data } = await tpcsApi.get( `/product?page=${ page }&name=${ name }&category=${ category }&provider=${ provider }` );
            localStorage.setItem('productPage', page);
            localStorage.setItem('searchedProduct', JSON.stringify({ localName: name, localCategory: category, localProvider: provider }));
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
                        const { _id, name } = allCategories.find( category => category._id === product.category.toString() );
                        delete product.category;
                    
                        category = { _id, name };
                        idCategory = _id;
                    } 
                    else {
                        category = product.category;
                        idCategory = product.category._id;
                    }
                    
                    if ( !product.provider._id ) {
                        const { _id, name } = allProviders.find( provider => provider._id === product.provider.toString() );
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

                const Selectcategory = allCategories.find( category => category._id === product.category );
                const Selectprovider = allProviders.find( provider => provider._id === product.provider );
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
            messageAlert('Error al Guardar', error.response.data?.msg, 'error');
            return false;
        }
    }

    const startDeletingProduct = async ( product ) => {
        try {
            await tpcsApi.delete( `/product/${ product._id }` );
            dispatch( onDeleteProduct() );
            if ( products.docs.length === 1 ) //* Si solo queda un registro en la tabla, que muestre la primera pagina
                startLoadingProducts({ pageNumber: 1 });
            return true;
        } catch (error) {
            console.log( error );
            messageAlert( 'Error al Eliminar', error.response.data?.msg, 'error' );
            return false;
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
        allProducts,
        products,
        searchedProduct,
        activeProduct,
        //* Methods
        setActiveProduct,
        startLoadingAllProducts,
        startChangeSearchProduct,
        startLoadingProducts,
        startSavingProduct,
        startDeletingProduct,
        startUpdateProductStockAddSale,
        startUpdateProductStockSubSale
    }

}