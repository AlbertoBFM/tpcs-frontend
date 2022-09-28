import { useAuthStore, useProductStore, useSaleCartStore, useSaleDetailStore, useUiStore } from '../../../hooks';
import { messageAlert, queryAlert } from '../../../helpers';

export const Row = ( product ) => {

    const { user } = useAuthStore();
    const { openModal, activeButton } = useUiStore();
    const { setActiveProduct, startDeletingProduct } = useProductStore();
    const { saleDetails } = useSaleDetailStore();
    const { cart, startAddToCart, startChangeQuantity } = useSaleCartStore();

    const { _id, name, description, stock, purchasePrice, salePrice, category, provider } = product;

    const handleUpdate = () => { //* Actualizar
        activeButton( true );
        setActiveProduct( product );
        openModal();
    }

    const handleDelete = async () => { //* Eliminar
        setActiveProduct( product );

        const searchDetailWithProduct = saleDetails.find( saleDetail => saleDetail.product._id === product._id );
        if ( searchDetailWithProduct )
            return messageAlert(`No puede borrar el producto "${ product.name }"`, 'Tiene Ventas registradas con este Producto', 'error');
        else{
            const resp = await queryAlert(`¿Eliminar el producto "${ name }"?`, 'warning', 'Eliminar', 'Cancelar');            
            if ( !resp ) return;

            const ok = await startDeletingProduct( product );
            if ( !ok ) return;

            return messageAlert('Producto Eliminado', '','success');
        }
    }

    const handleAddToCart = () => {
        const selectedCartProduct = cart.find( item => item._id === _id );
        if ( selectedCartProduct ) {
            if ( Number( stock ) <= Number( selectedCartProduct.quantity ) ) {
                startChangeQuantity( product, stock );
                return messageAlert(`Límite de <i>"${ selectedCartProduct.name }"</i> disponibles ${ stock }`, '', 'warning');
            }
        }
        startAddToCart( product );
    }

    return (
        <tr>
            <td><b>{ name.toUpperCase() }</b></td>
            <td>{ description }</td>
            <td><b>{ stock }</b></td>
            {user.userType === 'admin' && <td>{ purchasePrice }</td>}
            <td><b>{ salePrice }</b></td>
            <td>{ category?.name }</td>
            <td><b>{ provider?.name }</b></td>
            <td>
                <div className="btn-group" role="group">
                    {
                        user.userType === 'admin' 
                        && 
                        <>
                            <button type="button" className="btn btn-warning"
                            onClick={ handleUpdate }
                            >
                                <i className="fas fa-pen"></i>
                            </button>
                            <button type="button" className="btn btn-danger"
                                onClick={ handleDelete }
                            >
                                <i className="fas fa-trash-alt"></i>
                            </button>
                        </>
                        
                    }
                &nbsp;
                &nbsp;
                    <button type="button" className="btn btn-primary"
                        onClick={ handleAddToCart }
                        disabled={ Number(stock) === 0 }
                    >
                        <i className="fas fa-solid fa-plus"></i>
                    </button>
                </div>
            </td>
        </tr>
    )
    
}
