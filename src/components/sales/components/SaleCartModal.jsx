import { Modal, ModalHeader, ModalBody, Table } from 'reactstrap';
import { useSaleCartStore, useUiStore } from '../../../hooks';
import { AddNewSale } from './AddNewSale';
import { SaleCartRow } from './SaleCartRow';

export const SaleCartModal = () => {
    const { isCartModalOpen, toggleCartModal } = useUiStore();
    const { cart, profit, total } = useSaleCartStore();

    return (
        <Modal centered isOpen={ isCartModalOpen } size="lg" toggle={ toggleCartModal }>
            <ModalHeader toggle={ toggleCartModal }><p className="fs-3">Carrito de Compras</p></ModalHeader>
            <ModalBody>
                { cart.length > 0 && <AddNewSale /> }
                <Table responsive striped className="text-center">
                    <thead className="bg-dark text-white">
                        <tr>
                            <th className="col-3">Producto</th>
                            <th className="col-3">Precio</th>
                            <th className="col-3">Cantidad</th>
                            <th className="col-3">Subtotal</th>
                            <th className="col-1">&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        { cart.map( item => (<SaleCartRow key={ item._id } { ...item } />) ) }
                    </tbody>
                    <tfoot className="bg-dark text-white border-light">
                        <tr>
                            {/* <td colSpan="0" className="text-end">&nbsp;</td> */}
                            <td><b>Ganancia</b></td>
                            <td><b>{ profit }</b></td>
                            <td><b>Total</b></td>
                            <td><b>{ total }</b></td>
                            <td>&nbsp;</td>
                        </tr>
                    </tfoot>
                </Table>
            </ModalBody>
        </Modal>
    )
}
