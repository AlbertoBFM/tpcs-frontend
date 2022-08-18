import { useSelector, useDispatch } from 'react-redux';
import { 
    onDeleteSaleDetail, 
    onAddNewSaleDetail, 
    onSetActiveSaleDetail 
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

    const startSavingSaleDetail = async ( cart, idVenta ) => {
        // TODO: Backend
        //* Create 
        cart.map( item => {

            dispatch( onAddNewSaleDetail({
                _id: new Date().getTime().toString(),
                sale: { _id: idVenta },
                product:  { _id: item._id, name: item.name, salePrice: item.salePrice },
                quantity: item.quantity,
                subtotal: item.subtotal
            }));
            
        });

        await startUpdateProductStockAddSale( cart );
    }

    const startDeletingSaleDetail = async ( sale ) => {
        // TODO: Backend
        const selectedDetails = saleDetails.filter( detail => detail.sale._id === sale._id );

        dispatch( onDeleteSaleDetail( sale ) );
        startUpdateProductStockSubSale( selectedDetails );

    }

    return {
        //* Properties
        saleDetails,
        activeSaleDetail,
        //* Methods
        setActiveSaleDetail,
        startSavingSaleDetail,
        startDeletingSaleDetail
    }

}