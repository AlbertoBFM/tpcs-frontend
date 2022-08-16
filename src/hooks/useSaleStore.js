import { useSelector, useDispatch } from 'react-redux';
import { 
    // onAddNewSale, 
    // onDeleteSale, 
    onSetActiveSale 
} from '../store';

export const useSaleStore = () => {

    const dispatch = useDispatch();

    const {
        sales,
        activeSale,
    } = useSelector( state => state.sale );

    const setActiveSale = ( sale ) => {
        dispatch( onSetActiveSale( sale ) );
    }

    // const startSavingSale = async ( sale ) => {
    //     // TODO: Backend
    //     //* Create
    //     dispatch( onAddNewSale({ _id: new Date().getTime().toString(), ...sale }) );
    // }

    // const startDeletingSale = async () => {
    //     // TODO: Backend
        
    //     dispatch( onDeleteSale() );
    // }

    return {
        //* Properties
        sales,
        activeSale,
        //* Methods
        setActiveSale,
        // startSavingSale,
        // startDeletingSale,
    }

}