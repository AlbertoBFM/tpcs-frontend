import Modal from 'react-modal';

import { useSaleCartStore, useUiStore } from '../../../hooks';
import { AddNewSale } from './AddNewSale';
import { SaleCartRow } from './SaleCartRow';

const customStyles = { content: { top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)', }, };

Modal.setAppElement('#root');

export const SaleCartModal = () => {

    const { isCartModalOpen, closeCartModal } = useUiStore();
    const { cart, total } = useSaleCartStore();
    
    const onCloseModal = () => {
        closeCartModal();
    };

    return (
        <Modal
            isOpen={ isCartModalOpen }
            onRequestClose={ onCloseModal }
            style={ customStyles }
            className="modal modal-sale"
            overlayClassName="modal-fondo"
            closeTimeoutMS={ 200 }
        >
            <div className="m-3">
                <h1> Carrito de Compras </h1>
                <hr />
                { cart.length > 0 && <AddNewSale /> }
                <div className="m-md-auto table-responsive">
                    <table className="table table-striped text-center">
                        <thead className="bg-dark text-white">
                            <tr>
                                <th scope="col">Producto</th>
                                <th scope="col">Precio</th>
                                <th scope="col">Cantidad</th>
                                <th scope="col">Subtotal</th>
                                <th scope="col">&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            { cart.map( item => (<SaleCartRow key={ item._id } { ...item } />) ) }
                        </tbody>
                        <tfoot className="bg-dark text-white border-light">
                            <tr>
                                <td colSpan="2" className="text-end">&nbsp;</td>
                                <td><b>Total</b></td>
                                <td>{ total }</td>
                                <td>&nbsp;</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </Modal>
    )
}
