import { useSelector, useDispatch } from 'react-redux';
import { tpcsApi } from '../api';
import { 
    onDeleteSaleDetail, 
    onAddNewSaleDetail, 
    onSetActiveSaleDetail, 
    onLoadSaleDetail,
    onLoadAllDetail
} from '../store';
import { useProductStore } from './useProductStore';

export const useSaleDetailStore = () => {

    const dispatch = useDispatch();

    const { startUpdateProductStockAddSale, startUpdateProductStockSubSale } = useProductStore();

    const {
        saleDetails,
        activeSaleDetail,
    } = useSelector( state => state.saleDetail );

    const setActiveSaleDetail = ( saleDetail ) => {
        dispatch( onSetActiveSaleDetail( saleDetail ) );
    }

    const startLoadingAllDetails = async () => {
        try {
            const { data } = await tpcsApi.get( `/saleDetail` );
            // console.log( 'data: ', data );
            dispatch( onLoadAllDetail( data.salesDetails ) );
        } catch (error) {
            console.log('Error al cargar los Detalles de la Venta');
            console.log( error );
        }
    }

    const startLoadingSaleDetails = async ( saleId ) => {
        try {
            const { data } = await tpcsApi.get( `/saleDetail/${ saleId }` );

            dispatch( onLoadSaleDetail( data.saleDetails ) );
        } catch (error) {
            console.log('Error al cargar los Detalles de la Venta');
            console.log( error );
        }
    }

    const startCleaningSaleDetails = async () => {
        try {
            dispatch( onLoadSaleDetail( [] ) );
        } catch (error) {
            console.log('Error al limpiar los Detalles de la Venta');
            console.log( error );
        }
    }

    const savingDetail = async ( item, idVenta ) => {
        const { data } = await tpcsApi.post( 
            '/saleDetail', { 
                sale: idVenta, 
                product: item._id,
                quantity: item.quantity,
                subtotal: item.subtotal
            } 
        );
        dispatch( onAddNewSaleDetail({
            _id: data.saleDetail._id,
            sale: { _id: idVenta },
            product:  { _id: item._id, name: item.name, salePrice: item.salePrice },
            quantity: item.quantity,
            subtotal: item.subtotal
        }));
        // console.log('Item -> ', item);
    }

    const startSavingSaleDetail = async ( cart, idVenta ) => {
        //* Create 
        const promises = cart.map( item => savingDetail( item, idVenta ) );
        try {
            await Promise.all( promises );
            await startUpdateProductStockAddSale( cart );
        } catch (error) {
            messageAlert( error.response.data?.msg, '', 'error' );
            console.log( error );
        }
    }

    const startDeletingSaleDetail = async ( saleId ) => {
        try {
            const { data } = await tpcsApi.get( `/saleDetail/${ saleId }` );
            const { saleDetails } = data;

            saleDetails.map( async ( item ) => {
                await tpcsApi.delete( `/saleDetail/${ item._id }` );
            });
            startUpdateProductStockSubSale( saleDetails );
        } catch (error) {
            console.log('Error al Eliminar los Detalles de la Venta');
            console.log( error );
        }
    }

    return {
        //* Properties
        saleDetails,
        activeSaleDetail,
        //* Methods
        setActiveSaleDetail,
        startLoadingAllDetails,
        startLoadingSaleDetails,
        startCleaningSaleDetails,
        startSavingSaleDetail,
        startDeletingSaleDetail
    }

}