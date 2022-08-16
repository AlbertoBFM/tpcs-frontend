import { useSelector, useDispatch } from 'react-redux';
import { 
    // onAddNewSale, 
    // onDeleteSale, 
    onSetActiveSaleDetail 
} from '../store';

export const useSaleDetailStore = () => {

    const dispatch = useDispatch();

    const {
        saleDetails,
        activeSaleDetail,
    } = useSelector( state => state.saleDetail );

    const setActiveSaleDetail = ( saleDetail ) => {
        dispatch( onSetActiveSaleDetail( saleDetail ) );
    }

    return {
        //* Properties
        saleDetails,
        activeSaleDetail,
        //* Methods
        setActiveSaleDetail,
    }

}