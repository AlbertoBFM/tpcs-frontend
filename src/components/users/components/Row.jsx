import { useUserStore, useSaleStore } from '../../../hooks';
import { messageAlert, queryAlert } from '../../../helpers';

export const Row = ( user ) => {

    const { setActiveUser, startDeletingUser } = useUserStore();
    const { sales } = useSaleStore();

    const { _id, name, email } = user;

    const handleDelete = async () => { //* Eliminar
        setActiveUser( user );

        const salesByUser = sales.find( sale => sale.user?._id === _id );
        if ( salesByUser ) {
            return messageAlert(`No puedes borrar el usuario "${ name }"`, 'Tienes ventas registradas con este Usuario', 'error');
        }
        else{
            const resp = await queryAlert(`¿Eliminar el usuario "${ name }"?`, 'warning', 'Eliminar', 'Cancelar');
            if ( !resp ) return;

            startDeletingUser( _id );
        }
    }

    return (
        <tr>
            <td><b>{ name }</b></td>
            <td>{ email }</td>
            <td>
                <div className="btn-group" role="group">
                    <button type="button" className="btn btn-danger"
                        onClick={ handleDelete }
                    >
                        <i className="fas fa-trash-alt"></i>
                    </button>
                </div>
            </td>
        </tr>
    )
    
}
