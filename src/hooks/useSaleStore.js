import { useSelector, useDispatch } from 'react-redux';
import { tpcsApi } from '../api';
import { messageAlert } from '../helpers';

import { onAddNewSale, onDeleteSale, onLoadSales, onSetActiveSale } from '../store';

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
    
    const validateStock = async ( item ) => {
        await tpcsApi.post( '/sale/validateStock', { _id: item._id, quantity: item.quantity } );
        // console.log( 'item -> ', item );
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
            const { data } = await tpcsApi.post( '/sale', { client: ci_nit, date, total } );
            console.log( data );
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
        activeSale,
        //* Methods
        setActiveSale,
        startLoadingSales,
        startProductStockValidation,
        startSavingSale,
        startDeletingSale,
    }

}