import { useEffect } from 'react';

import { useSaleCartStore, useSaleDetailStore, useSaleStore, useUiStore } from '../../../hooks';
import { messageAlert, queryAlert } from '../../../helpers/alerts';

export const AddNewSale = () => {

    const { activeButton, isActiveButton, closeCartModal } = useUiStore();

    const { startSavingSale } = useSaleStore();
    const { startSavingSaleDetail } = useSaleDetailStore();

    const { cart, ciNit, total, startCiNitChange, startClearCart } = useSaleCartStore();

    const handleInputChange = ( e ) => {
        const value = Number( e.target.value );
        if ( isNaN( value ) ) 
            return "";

        if ( value === 0 )
            startCiNitChange( "" );
        else
            startCiNitChange( value );
    }

    const handleClickNew = async () => {
        const ciNitLength = ciNit.toString().trim().length;
        
        if ( ( ciNitLength >= 1 && ciNitLength <= 7 ) || ciNitLength > 10  ) 
            return messageAlert( 'CI / NIT Invalido', 'Debe ingresar de 8 a 10 digitos', 'error' );

        if ( ciNitLength === 0 ) {
            const resp = await queryAlert('¿Esta seguro de registrar esta venta sin CI o NIT?', 'warning', 'Si', 'No');
            if ( !resp ) return;
        }

        const idVenta = await startSavingSale( total, ciNit );
        await startSavingSaleDetail( cart, idVenta );

        startClearCart();
        activeButton( false );
        closeCartModal();

        return messageAlert( 'Venta Registrada', '', 'success' );
    }

    useEffect(() => {
        if ( cart.length > 0 )
            activeButton( true );
        else
            activeButton( false );
    }, [ cart ])
    
    
    return (
        <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex justify-content-between align-items-center m-0">
                <label className="m-3" htmlFor="ci_nit">CI/NIT</label>
                <input className="form-control" type="text" id="ci_nit"
                    value={ ciNit } 
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
