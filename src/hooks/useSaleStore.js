import { useSelector, useDispatch } from 'react-redux';
import { tpcsApi } from '../api';
import { formatDate } from '../helpers';

import { 
    onAddNewSale, 
    onDeleteSale, 
    onLoadSales, 
    onSetActiveSale 
} from '../store';

export const useSaleStore = () => {

    const dispatch = useDispatch();

    const { sales, activeSale } = useSelector( state => state.sale );
    const { user } = useSelector( state => state.auth );

    const setActiveSale = ( sale ) => {
        dispatch( onSetActiveSale( sale ) );
    }

    const startLoadingSales = async () => {
        try {
            
            const { data } = await tpcsApi.get( '/sale' );
            dispatch( onLoadSales( data.sales ) );

        } catch (error) {
            console.log('Error al cargar las Ventas');
            console.log( error );
        }
    }

    const startSavingSale = async ( total ) => {
        try {
            //* Create
            const date = new Date().getTime();
            const { data } = await tpcsApi.post( '/sale', { date, total } );
    
            dispatch( onAddNewSale({ 
                _id: data.sale._id, 
                user,
                date,
                total 
                // client: { _id: '321789654', name: 'Juanito Alcachofa' },
            }));
            return data.sale._id;
        } catch (error) {
            console.log( error );
            Swal.fire( 'Error al Guardar', error.response.data?.msg, 'error' );
        }
    }

    const startDeletingSale = async ( saleId ) => {
        try {
            await tpcsApi.delete( `/sale/${ saleId }` );

            dispatch( onDeleteSale( saleId ) );
        } catch (error) {
            console.log( error );
            Swal.fire( 'Error al Eliminar', error.response.data?.msg, 'error' );
        }
    }

    return {
        //* Properties
        sales,
        activeSale,
        //* Methods
        setActiveSale,
        startLoadingSales,
        startSavingSale,
        startDeletingSale,
    }

}