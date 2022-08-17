import { useSelector, useDispatch } from 'react-redux';
import { formatDate } from '../helpers';

import { 
    onAddNewSale, 
    onDeleteSale, 
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

    const startSavingSale = async ( total ) => {
        // TODO: Backend
        
        //* Create
        const idVenta = new Date().getTime().toString();
        dispatch( onAddNewSale({ 
            _id: idVenta, 
            user: { _id: '321846987', name: 'batman' },
            client: { _id: '321789654', name: 'Juanito Alcachofa' },
            date: new Date().getTime(),
            total: total 
        }));
        return idVenta;
    }

    const startDeletingSale = async () => {
        // TODO: Backend
        
        dispatch( onDeleteSale() );
    }

    return {
        //* Properties
        sales,
        activeSale,
        //* Methods
        setActiveSale,
        startSavingSale,
        startDeletingSale,
    }

}