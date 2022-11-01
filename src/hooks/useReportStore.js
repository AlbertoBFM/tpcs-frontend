import { useSelector } from 'react-redux';
import { tpcsApi } from '../api';
import { formatDateInput } from '../helpers';

export const useReportStore = () => {
    const { searchedSale } = useSelector( state => state.sale );

    const startGenerateSalesReport = async () => {
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

    const startGenerateSalesDetailsReport = async () => {
        const { localStartDate: searchedStartDate, localEndDate: searchedEndDate } = searchedSale || {};
        const { localStartDate, localEndDate } = JSON.parse( localStorage.getItem('searchedSale') ) || {};

        const today = formatDateInput( new Date() );
        const startDate = ( searchedStartDate === '' ) 
                            ? (today) 
                            : (searchedStartDate || localStartDate || today);
        const endDate = ( searchedEndDate === '' ) 
                            ? (today) 
                            : (searchedEndDate || localEndDate || today);

        const { data } = await tpcsApi.get( `/report/salesDetailsByDates?startDate=${ startDate }&endDate=${ endDate }`,{
            responseType: 'arraybuffer',
            headers: { Accept: 'application/pdf', },
        });
        const url = window.URL.createObjectURL( new Blob ([ data ], {type: 'application/pdf'}) );
        return window.open( url );
    }

    const startGenerateProductsReport = async () => {
        const { data } = await tpcsApi.get( `/report/products`,{
            responseType: 'arraybuffer',
            headers: { Accept: 'application/pdf', },
        });
        const url = window.URL.createObjectURL( new Blob ([ data ], {type: 'application/pdf'}) );
        return window.open( url );
    }

    return {
        //* Properties
        searchedSale,
        //* Methods
        startGenerateSalesReport,
        startGenerateSalesDetailsReport,
        startGenerateProductsReport
    }
}