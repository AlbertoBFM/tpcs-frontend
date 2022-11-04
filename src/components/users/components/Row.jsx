import { Button, ButtonGroup, FormGroup, Input, Label } from 'reactstrap';
import { useUserStore, useSaleStore, useAuthStore } from '../../../hooks';
import { messageAlert, queryAlert } from '../../../helpers';

export const Row = ( user ) => {
    const { _id, name, email, enabled } = user;

    const { user: { uid } } = useAuthStore();
    const { setActiveUser, startDeletingUser, startToggleEnabledUser } = useUserStore();
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

    const toggleEnabled = async () => {
        await startToggleEnabledUser(_id);
    }

    return (
        <tr>
            <td><b>{ name }</b></td>
            <td>{ email }</td>
            {   
                uid !== _id 
                &&
                <td>
                    <div className="d-flex justify-content-around align-items-center">
                        <FormGroup switch>
                            <Label for={`${_id}`} check>Habilitado</Label>
                            <Input type="switch" role="switch" id={`${_id}`} onChange={ toggleEnabled } checked={ enabled }/>
                        </FormGroup>
                        &nbsp;
                        <Button onClick={ handleDelete } color="danger">
                            <i className="fas fa-trash-alt"></i>
                        </Button>
                    </div>
                </td>
                ||
                <td>
                    &nbsp;
                </td>
            }
        </tr>
    )
}
