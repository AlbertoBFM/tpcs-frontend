import { useEffect } from 'react';
import { Button, Label, Input } from 'reactstrap';
import { useProductStore, useSaleCartStore, useSaleDetailStore, useSaleStore, useUiStore } from '../../../hooks';
import { messageAlert, queryAlert } from '../../../helpers/alerts';

export const AddNewSale = () => {
    const { activeButton, isActiveButton, closeCartModal } = useUiStore();
    const { startLoadingProducts } = useProductStore();
    const { startSavingSale, startProductStockValidation } = useSaleStore();
    const { startSavingSaleDetail } = useSaleDetailStore();
    const { cart, ciNit, total, startCiNitChange, startClearCart } = useSaleCartStore();

    const handleInputChange = ( e ) => {
        const value = Number( e.target.value );
        if ( isNaN( value ) ) return "";

        if ( value === 0 )
            startCiNitChange( "" );
        else
            startCiNitChange( value );
    }

    const handleClickNew = async () => {

        const resp = await startProductStockValidation( cart );
        if ( !resp ) return;

        const ciNitLength = ciNit.toString().trim().length;
        if ( ( ciNitLength >= 1 && ciNitLength <= 7 ) || ciNitLength > 10  ) 
            return messageAlert( 'CI / NIT Invalido', 'Debe ingresar de 8 a 10 digitos', 'error' );

        if ( ciNitLength === 0 ) {
            const resp = await queryAlert('¿Esta seguro de registrar esta venta sin CI o NIT?', 'warning', 'Si', 'No');
            if ( !resp ) return;
        }

        const idVenta = await startSavingSale( total, ciNit );
        await startSavingSaleDetail( cart, idVenta );
        await startLoadingProducts();

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
        <div className="d-flex justify-content-between align-items-center pb-3">
            <div className="d-flex justify-content-between align-items-center">
                <Label for="ci_nit" className="m-0 me-3"><b>CI/NIT</b></Label>
                <Input 
                    onChange={ handleInputChange } value={ ciNit } 
                    className="form-control" type="text" id="ci_nit"
                />
            </div>
            <Button onClick={ handleClickNew } disabled={ isActiveButton } color="primary">
                <i className="fas fa-solid fa-plus"></i> Registrar Venta
            </Button>
        </div> 
    )

}
