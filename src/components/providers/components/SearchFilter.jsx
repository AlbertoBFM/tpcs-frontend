import { useEffect } from 'react';
import { Input, InputGroup, InputGroupText } from 'reactstrap';
import { useProviderStore } from '../../../hooks';

export const SearchFilter = () => {

    const { searchedProvider, startChangeSearchProvider, startLoadingProviders } = useProviderStore();

    const { localName = "", localPhone = "" } = searchedProvider;

    const handleInputChange = ( e, valueName ) => {
        const value = e.target.value;
        startChangeSearchProvider({ 
            ...searchedProvider,
            [ valueName ]: value, 
        });
        startLoadingProviders({ pageNumber: 1, searchedProvider: {
            ...searchedProvider,  
            [ valueName ]: value, 
        }});
    }

    useEffect(() => {
        const searchedProvider = JSON.parse( localStorage.getItem('searchedProvider') ) || {};
        startChangeSearchProvider( searchedProvider );
    }, [])

    return (
        <div>
            <InputGroup>
                <InputGroupText><i className="fas fa-sharp fa-solid fa-magnifying-glass"></i></InputGroupText>
                <Input value={ localName } onChange={ (e) => handleInputChange(e,'localName') } placeholder="Nombre..."/>
                <Input value={ localPhone } onChange={ (e) => handleInputChange(e,'localPhone') } placeholder="Celular..."/>
            </InputGroup>
        </div>
    )
}
