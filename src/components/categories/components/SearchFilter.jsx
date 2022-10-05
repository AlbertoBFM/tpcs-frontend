import { useEffect } from 'react';
import { Input, InputGroup, InputGroupText } from 'reactstrap';
import { useCategoryStore } from '../../../hooks';

export const SearchFilter = () => {

    const { searchedName, startChangeSearchName, startLoadingCategories } = useCategoryStore();

    const handleInputChange = ( e ) => {
        const name = e.target.value;
        startChangeSearchName( name );
        startLoadingCategories( 1, name );
    }

    useEffect(() => {
        const name = localStorage.getItem('searchedCategoryName') || '';
        startChangeSearchName( name );
    }, [])

    return (
        <div>
            <InputGroup>
                <InputGroupText><i className="fas fa-sharp fa-solid fa-magnifying-glass"></i></InputGroupText>
                <Input value={ searchedName } onChange={ handleInputChange } placeholder="Buscar..." />
            </InputGroup>
        </div>
    )
}
