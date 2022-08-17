import { useEffect } from 'react';
import { useSaleCartStore, useSaleDetailStore, useSaleStore, useUiStore } from '../../../hooks';


export const AddNewSale = () => {

    const { activeButton, isActiveButton, closeCartModal } = useUiStore();

    const { startSavingSale } = useSaleStore();
    const { startSavingSaleDetail } = useSaleDetailStore();

    const { cart, total, startClearCart } = useSaleCartStore();

    const handleClickNew = async () => {
        
        const idVenta = await startSavingSale( total );
        
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
