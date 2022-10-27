import { useSelector } from 'react-redux';
import { tpcsApi } from '../api';
import { formatDateInput } from '../helpers';

export const useReportStore = () => {
    const { searchedSale } = useSelector( state => state.sale );

    const startGenerateSalesReportByDates = async () => {
        const { localStartDate: searchedStartDate, localEndDate: searchedEndDate } = searchedSale || {};
        const { localStartDate, localEndDate } = JSON.parse( localStorage.getItem('searchedSale') ) || {};

        const today = formatDateInput( new Date() );
        const startDate = ( searchedStartDate === '' ) 
                            ? (today) 
                            : (searchedStartDate || localStartDate || today);
        const endDate = ( searchedEndDate === '' ) 
                            ? (today) 
                            : (searchedEndDate || localEndDate || today);

        const { data } = await tpcsApi.get( `/report/salesByDates?startDate=${ startDate }&endDate=${ endDate }`,{
            responseType: 'arraybuffer',
            headers: { Accept: 'application/pdf', },
        });
        const url = window.URL.createObjectURL( new Blob ([ data ], {type: 'application/pdf'}) );
        console.log('hola que hace');
        return window.open( url );
    }

    return {
        //* Properties
        searchedSale,
        //* Methods
        startGenerateSalesReportByDates,
    }
}