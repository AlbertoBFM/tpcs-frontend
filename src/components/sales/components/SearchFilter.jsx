import { useEffect } from 'react';
import { Input, InputGroup, InputGroupText } from 'reactstrap';
import { formatDate, formatDateInput } from '../../../helpers';
import { useSaleStore } from '../../../hooks';

export const SearchFilter = () => {
    const { searchedSale, startChangeSearchSale, startLoadingSales } = useSaleStore();

    const { localUser = '', localClient = '', localStartDate = '', localEndDate = '' } = searchedSale;

    const handleInputChange = ( e, valueName ) => {
        const value = e.target.value;

        startChangeSearchSale({ 
            ...searchedSale,
            [ valueName ]: value, 
        });
        startLoadingSales({ pageNumber: 1, searchedSale: {
            ...searchedSale,  
            [ valueName ]: value, 
        }});
    }

    useEffect(() => {
        const searchedSale = JSON.parse( localStorage.getItem('searchedSale') ) || {};
        startChangeSearchSale( searchedSale );
    }, [])

    return (
        <div>
            <InputGroup>
                <InputGroupText><i className="fas fa-sharp fa-solid fa-magnifying-glass"></i></InputGroupText>
                <Input value={ localUser } onChange={ (e) => handleInputChange(e,'localUser') } placeholder="Usuario..."/>
                <Input value={ localClient } onChange={ (e) => handleInputChange(e,'localClient') } placeholder="Cliente..."/>
                <Input type="date" value={ localStartDate || formatDateInput( new Date() ) } onChange={ (e) => handleInputChange(e,'localStartDate') }/>
                <Input type="date" value={ localEndDate || formatDateInput( new Date() ) } onChange={ (e) => handleInputChange(e,'localEndDate') }/>
            </InputGroup>
        </div>
    )
}
