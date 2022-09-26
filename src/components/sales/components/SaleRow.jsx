import { useAuthStore, useSaleDetailStore, useSaleStore, useUiStore } from '../../../hooks';
import { formatDate, messageAlert, queryAlert } from '../../../helpers';

export const SaleRow = ( sale ) => {

    const { openModal } = useUiStore();
    const { user: { uid, userType } } = useAuthStore();
    const { setActiveSale, startDeletingSale } = useSaleStore();
    const { startLoadingSaleDetails, startDeletingSaleDetail } =useSaleDetailStore();

    const { _id, user, client, date, total } = sale;

    const handleView = () => {
        setActiveSale( sale );
        startLoadingSaleDetails( _id );
        openModal();
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
                <div className="btn-group" role="group">
                    <button type="button" className="btn btn-outline-primary"
                        onClick={ handleView }
                    >
                        <i className="fas fa-solid fa-eye"></i>
                    </button>
                    {
                        userType === 'admin' 
                        && 
                        <>
                            <button type="button" className="btn btn-danger"
                                onClick={ handleDelete }
                            >
                                <i className="fas fa-trash-alt"></i>
                            </button>
                        </>
                    }
                    {/* {
                        ( ( user._id || user.uid ) === uid ) 
                        && 
                        <button type="button" className="btn btn-danger"
                            onClick={ handleDelete }
                        >
                            <i className="fas fa-trash-alt"></i>
                        </button>
                    } */}
                </div>
            </td>
        </tr>
    )
    
}
