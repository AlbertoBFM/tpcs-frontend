import { useSelector, useDispatch } from 'react-redux';
import { tpcsApi } from '../api';
import { formatDateInput, messageAlert } from '../helpers';

import { onAddNewSale, onChangeSearchedSale, onDeleteSale, onLoadAllSales, onLoadSales, onSetActiveSale } from '../store';

export const useSaleStore = () => {

    const dispatch = useDispatch();

    const { sales, searchedSale, activeSale } = useSelector( state => state.sale );
    const { user } = useSelector( state => state.auth );

    const setActiveSale = ( sale ) => {
        dispatch( onSetActiveSale( sale ) );
    }

    const startChangeSearchSale = ( searchedSale ) => {
        dispatch( onChangeSearchedSale( searchedSale ) );
    }

    const startLoadingAllSales = async () => {
        try {
            const { data } = await tpcsApi.get( '/sale/all' );
            dispatch( onLoadAllSales( data.sales ) );
        } catch (error) {
            console.log('Error al cargar las Ventas');
            console.log( error );
        }
    }

    const startLoadingSales = async ({ pageNumber, searchedSale }) => {
        try {
            const page = pageNumber || localStorage.getItem('salePage') || 1;
            const { localUser: searchedUser, localClient: searchedClient, localStartDate: searchedStartDate, localEndDate: searchedEndDate } = searchedSale || {};
            const { localUser, localClient, localStartDate, localEndDate } = JSON.parse( localStorage.getItem('searchedSale') ) || {};
            const user = (searchedUser === '') //* Si la cadena esta vacia que retorne eso, lo hago de esta manera ya que en la expresión OR cuando ve una cadena vacia lo toma como null
                            ? ('') 
                            : (searchedUser || localUser || ''); 
            const client = ( searchedClient === '' ) 
                            ? ('') 
                            : (searchedClient || localClient || '');
            const today = formatDateInput( new Date() );
            const startDate = ( searchedStartDate === '' ) 
                            ? (today) 
                            : (searchedStartDate || localStartDate || today);
            const endDate = ( searchedEndDate === '' ) 
                            ? (today) 
                            : (searchedEndDate || localEndDate || today);

            const { data } = await tpcsApi.get(`/sale?page=${ page }&user=${ user }&client=${ client }&startDate=${ startDate }&endDate=${ endDate }`);
            localStorage.setItem('salePage', page);
            localStorage.setItem('searchedSale', JSON.stringify({ localUser: user, localClient: client, localStartDate: startDate, localEndDate: endDate }));
            dispatch( onLoadSales( data.sales ) );
        } catch (error) {
            console.log('Error al cargar las Ventas');
            console.log( error );
        }
    }
    
    const validateStock = async ( item ) => {
        await tpcsApi.post('/sale/validateStock', { _id: item._id, quantity: item.quantity });
    }

    const startProductStockValidation = async ( cart ) => {
        const promises = cart.map( item => validateStock( item ) );
        try {
            await Promise.all( promises );
            return true;
        } catch (error) {
            messageAlert( error.response.data?.msg, '', 'error' );
            return false;
        }
    }

    const startSavingSale = async ( total, ci_nit ) => {
        try {
            //* Create
            const date = new Date().getTime();
            const { data } = await tpcsApi.post('/sale', { client: ci_nit, date, total });

            dispatch( onAddNewSale({ 
                _id: data.sale._id, 
                user,
                client: ci_nit,
                date,
                total
            }));
            return data.sale._id;
        } catch (error) {
            console.log( error );
            messageAlert( 'Error al Guardar', error.response.data?.msg, 'error' );
        }
    }

    const startDeletingSale = async ( saleId ) => {
        try {
            await tpcsApi.delete( `/sale/${ saleId }` );
            dispatch( onDeleteSale( saleId ) );
        } catch (error) {
            console.log( error );
            messageAlert( 'Error al Eliminar', error.response.data?.msg, 'error' );
        }
    }

    return {
        //* Properties
        sales,
        searchedSale,
        activeSale,
        //* Methods
        setActiveSale,
        startLoadingAllSales,
        startLoadingSales,
        startChangeSearchSale,
        startProductStockValidation,
        startSavingSale,
        startDeletingSale,
    }

}