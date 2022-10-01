import { Button, ButtonGroup } from 'reactstrap';
import { useAuthStore, useSaleDetailStore, useSaleStore, useUiStore } from '../../../hooks';
import { formatDate, messageAlert, queryAlert } from '../../../helpers';

export const SaleRow = ( sale ) => {
    const { _id, user, client, date, total } = sale;

    const { toggleModal } = useUiStore();
    const { user: { uid, userType } } = useAuthStore();
    const { setActiveSale, startDeletingSale } = useSaleStore();
    const { startLoadingSaleDetails, startDeletingSaleDetail } =useSaleDetailStore();

    const handleView = () => {
        setActiveSale( sale );
        startLoadingSaleDetails( _id );
        toggleModal();
    }

    const handleDelete = async () => { //* Eliminar
        const resp = await queryAlert('¿Eliminar Venta?', 'warning', 'Eliminar', 'Cancelar');
        if ( !resp ) return;

        startDeletingSale( _id );
        startDeletingSaleDetail( _id );

        return messageAlert('Venta Eliminada', '', 'success');
    }
    
    return (
        <tr className={`${( ( user._id || user.uid ) === uid ) && 'bg-primary p-2 text-dark bg-opacity-25'}`}>
            <td><b>{ user.name }</b></td>
            <td>{ client || '----' }</td>
            <td><b>{ formatDate( new Date(date) ) }</b></td>
            <td>{ total }</td>
            <td>
                <ButtonGroup>
                    <Button outline color="primary" onClick={ handleView }>
                        <i className="fas fa-solid fa-eye"></i>
                    </Button>
                    {
                        userType === 'admin' 
                        && 
                        <Button color="danger" onClick={ handleDelete }>
                            <i className="fas fa-trash-alt"></i>
                        </Button>
                    }
                </ButtonGroup>
            </td>
        </tr>
    )  
}
