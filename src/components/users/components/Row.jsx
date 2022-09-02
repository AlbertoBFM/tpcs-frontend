import { useUserStore, useSaleStore, useUiStore } from '../../../hooks';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export const Row = ( user ) => {

    const { setActiveUser, startDeletingUser } = useUserStore();
    const { sales } = useSaleStore();

    const { _id, name, email } = user;

    const handleDelete = () => { //* Eliminar
        setActiveUser( user );

        const salesByUser = sales.find( sale => sale.user?._id === user._id );
        // console.log(salesByUser);
        if ( salesByUser ) {
            Swal.fire({
                icon: 'error',
                title: `No puedes borrar el usuario "${ user.name }"`,
                text: 'Tienes ventas registradas con este Usuario',
                showConfirmButton: false
            })
        }
        else{
            Swal.fire({
                title: `¿Eliminar el usuario "${ name }"?`, icon: 'warning', showCancelButton: true,
                confirmButtonColor: '#3085d6', confirmButtonText: 'Eliminar',
                cancelButtonColor: '#d33', cancelButtonText: 'Cancelar'
            }).then( result => {
                if ( result.isConfirmed ) {
                    Swal.fire({
                        position: 'top-end', icon: 'success', title: 'Usuario Eliminado',
                        showConfirmButton: false, timer: 1500
                    })
                    startDeletingUser();
                }
            })
        }


    }

    return (
        <tr>
            {/* <td scope="row" className="">{ _id }</td> */}
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
