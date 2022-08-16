import { useEffect } from 'react';
import { useSaleCartStore, useUiStore } from '../../../hooks';


export const AddNewSale = () => {

    const { activeButton, isActiveButton, closeCartModal } = useUiStore();

    const { cart } = useSaleCartStore();

    const handleClickNew = () => {
        
        // console.log('hola');

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
        <div className="d-flex justify-content-md-end justify-content-center">
            <button className="btn btn-primary mb-3"
                onClick={ handleClickNew }
                disabled={ isActiveButton }
            >
                <i className="fas fa-solid fa-plus"></i> Registrar Venta
            </button>
        </div>
    )

}
