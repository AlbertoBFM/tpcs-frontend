import { useSelector, useDispatch } from 'react-redux';
import { 
    onDeleteSaleDetail, 
    onAddNewSaleDetail, 
    onSetActiveSaleDetail 
} from '../store';

export const useSaleDetailStore = () => {

    const dispatch = useDispatch();

    const { sales } = useSelector( state => state.sale );

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
    }

    const startDeletingSaleDetail = async ( sale ) => {
        // TODO: Backend
        
        dispatch( onDeleteSaleDetail( sale ) );
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