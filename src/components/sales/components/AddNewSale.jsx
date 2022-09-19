import { useState } from 'react';
import { useEffect } from 'react';
import { useSaleCartStore, useSaleDetailStore, useSaleStore, useUiStore } from '../../../hooks';


export const AddNewSale = () => {

    const { activeButton, isActiveButton, closeCartModal } = useUiStore();

    const { startSavingSale } = useSaleStore();
    const { startSavingSaleDetail } = useSaleDetailStore();

    const { cart, total, startClearCart } = useSaleCartStore();

    const [ci_nit, setCi_nit] = useState("");

    const handleInputChange = ( e ) => {
        const value = Number( e.target.value );
        if ( isNaN( value ) ) return;

        setCi_nit( value );
    }

    const handleClickNew = async () => {
        
        const idVenta = await startSavingSale( total, ci_nit );
        
        await startSavingSaleDetail( cart, idVenta );

        startClearCart();
        activeButton( false );
        closeCartModal();
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
