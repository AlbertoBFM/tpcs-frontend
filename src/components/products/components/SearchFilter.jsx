import { useEffect } from 'react';
import { Input, InputGroup, InputGroupText } from 'reactstrap';
import { useCategoryStore, useProductStore, useProviderStore } from '../../../hooks';

export const SearchFilter = () => {
    const { searchedProduct, startChangeSearchProduct, startLoadingProducts } = useProductStore();
    const { allCategories } = useCategoryStore();
    const { allProviders } = useProviderStore();
    const { localName = '', localCategory = '', localProvider = '' } = searchedProduct;

    const handleInputChange = ( e, valueName ) => {
        const value = e.target.value;
        startChangeSearchProduct({ 
            ...searchedProduct,
            [ valueName ]: value, 
        });
        startLoadingProducts({ pageNumber: 1, searchedProduct: {
            ...searchedProduct,  
            [ valueName ]: value, 
        }});
    }

    useEffect(() => {
        const searchedProduct = JSON.parse( localStorage.getItem('searchedProduct') ) || {};
        startChangeSearchProduct( searchedProduct );
    }, [])

    return (
        <div>
            <InputGroup>
                <InputGroupText><i className="fas fa-sharp fa-solid fa-magnifying-glass"></i></InputGroupText>
                <Input value={ localName } onChange={ (e) => handleInputChange(e,'localName') } placeholder="Nombre..."/>
                <Input value={ localCategory } onChange={ (e) => handleInputChange(e,'localCategory') } list="categories" autoComplete="off" placeholder="Categoría..."/>
                <datalist id="categories">
                    { allCategories.map( item => <option key={ item._id } value={ item.name }/> ) }
                </datalist>
                <Input value={ localProvider } onChange={ (e) => handleInputChange(e,'localProvider') } list="providers" autoComplete="off" placeholder="Proveedor..."/>
                <datalist id="providers">
                    { allProviders.map( item => <option key={ item._id } value={ item.name }/> ) }
                </datalist>
            </InputGroup>
        </div>
    )
}
