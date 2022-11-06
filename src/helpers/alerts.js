import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export const messageAlert = ( title = '', text = '', icon = '' ) => {
    return Swal.fire({ position: 'top-end', icon, title, text, showConfirmButton: false, timer: 2000 });
}

export const queryAlert = async ( title  = '', icon  = '', confirmButtonText  = '', cancelButtonText  = '', background = '', color = '') => {
    return await Swal.fire({
        background: background || '#fff',
        color: color || '#444',
        title, icon, showCancelButton: true,
        confirmButtonColor: '#3085d6', confirmButtonText,
        cancelButtonColor: '#d33', cancelButtonText
    }).then( result => {
        if ( result.isConfirmed ) 
            return true;
        return false;
    })
}