import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useSaleCartStore, useSaleDetailStore, useSaleStore, useUiStore } from '../../../hooks';


export const AddNewSale = () => {

    const { activeButton, isActiveButton, closeCartModal } = useUiStore();

    const { startSavingSale } = useSaleStore();
    const { startSavingSaleDetail } = useSaleDetailStore();

    const { cart, total, startClearCart } = useSaleCartStore();

    const [ci_nit, setCi_Nit] = useState("");

    const handleInputChange = ( e ) => {
        const value = Number( e.target.value );
        if ( isNaN( value ) ) return "";

        if ( value === 0 )
            setCi_Nit( "" );
        else
            setCi_Nit( value );
    }

    const messageAlert = ( title, icon ) => Swal.fire({ position: 'top-end', icon, title, showConfirmButton: false, timer: 1500 });

    const handleClickNew = async () => {
        const ci_nit_Length = ci_nit.toString().trim().length;
        
        if ( ci_nit_Length >= 1 && ci_nit_Length <= 7 )
            return messageAlert( 'CI / NIT Invalido', 'error' );

        if ( ci_nit_Length === 0 ) {
            
            const resp = await Swal.fire({
                title: `¿Esta seguro de registrar esta venta sin CI o NIT?`,
                icon: 'warning', showCancelButton: true,
                confirmButtonColor: '#3085d6', confirmButtonText: 'Si',
                cancelButtonColor: '#d33', cancelButtonText: 'No'
            }).then( result => {
                if ( result.isConfirmed ) 
                    return true;

                return false;
            })
    
            if ( !resp ) return;
        }

        const idVenta = await startSavingSale( total, ci_nit );
                
        await startSavingSaleDetail( cart, idVenta );

        startClearCart();
        activeButton( false );
        closeCartModal();

        return messageAlert( 'Venta Registrada', 'success' );
        
    }

    useEffect(() => {
        if ( cart.length > 0 ) {
            activeButton( true );
        }
        else {
            activeButton( false );
        }
    }, [ cart ])
    
    
    return (
        // <div className="d-flex justify-content-md-end justify-content-center">
        <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-between align-items-center m-0">
                <label className="m-3" htmlFor="ci_nit">CI/NIT</label>
                <input className="form-control" type="text" id="ci_nit"
                    value={ ci_nit } 
                    onChange={ handleInputChange }
                />
            </div>
            <button className="btn btn-primary m-0"
                onClick={ handleClickNew }
                disabled={ isActiveButton }
            >
                <i className="fas fa-solid fa-plus"></i> Registrar Venta
            </button>
        </div>
        
    )

}
