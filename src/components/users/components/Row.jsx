import { Button, ButtonGroup } from 'reactstrap';
import { useUserStore, useSaleStore } from '../../../hooks';
import { messageAlert, queryAlert } from '../../../helpers';

export const Row = ( user ) => {
    const { _id, name, email } = user;

    const { setActiveUser, startDeletingUser } = useUserStore();
    const { allSales } = useSaleStore();

    const handleDelete = async () => { //* Eliminar
        setActiveUser( user );
        const salesByUser = allSales.find( sale => sale.user?._id === _id );
        if ( salesByUser ) {
            return messageAlert(`No puedes borrar el usuario "${ name }"`, 'Tienes ventas registradas con este Usuario', 'error');
        }
        else {
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
                <ButtonGroup>
                    <Button onClick={ handleDelete } color="danger">
                        <i className="fas fa-trash-alt"></i>
                    </Button>
                </ButtonGroup>
            </td>
        </tr>
    )
}
