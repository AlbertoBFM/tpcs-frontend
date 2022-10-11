import { useEffect } from 'react';
import { Input, InputGroup, InputGroupText } from 'reactstrap';
import { useUserStore } from '../../../hooks';

export const SearchFilter = () => {

    const { searchedUser, startChangeSearchUser, startLoadingUsers } = useUserStore();

    const { localName = '', localEmail = '' } = searchedUser;

    const handleInputChange = ( e, valueName ) => {
        const value = e.target.value;

        startChangeSearchUser({ 
            ...searchedUser,
            [ valueName ]: value, 
        });
        startLoadingUsers({ pageNumber: 1, searchedUser: {
            ...searchedUser,  
            [ valueName ]: value, 
        }});
    }

    useEffect(() => {
        const searchedUser = JSON.parse( localStorage.getItem('searchedUser') ) || {};
        startChangeSearchUser( searchedUser );
    }, [])

    return (
        <div>
            <InputGroup>
                <InputGroupText><i className="fas fa-sharp fa-solid fa-magnifying-glass"></i></InputGroupText>
                <Input value={ localName } onChange={ (e) => handleInputChange(e,'localName') } placeholder="Nombre..."/>
                <Input value={ localEmail } onChange={ (e) => handleInputChange(e,'localEmail') } placeholder="Email..."/>
            </InputGroup>
        </div>
    )
}
