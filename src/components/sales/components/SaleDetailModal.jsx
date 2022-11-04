import { Modal, ModalHeader, ModalBody, Table } from 'reactstrap';
import { useSaleDetailStore, useSaleStore, useUiStore } from '../../../hooks';
import { SaleDetailRow } from './SaleDetailRow';

export const SaleDetailModal = () => {
    const { isModalOpen, toggleModal } = useUiStore();
    const { activeSale } = useSaleStore();
    const { activeSaleDetail } = useSaleDetailStore();

    return (
        <Modal centered isOpen={ isModalOpen } size="lg" toggle={ toggleModal }>
            <ModalHeader toggle={ toggleModal }><p className="fs-3">Detalle de Venta</p></ModalHeader>
            <ModalBody>
                <h5>Cliente: { activeSale?.client || '----' }</h5>
                <Table responsive striped className="text-center">
                    <thead className="bg-dark text-white">
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        { activeSaleDetail.map( detail => (<SaleDetailRow key={ detail._id } { ...detail } />) ) }
                    </tbody>
                    <tfoot className="bg-dark text-white border-light">
                        <tr>
                            <td colSpan="2" className="text-end">&nbsp;</td>
                            <td><b>Total</b></td>
                            <td>{ activeSale?.total }</td>
                        </tr>
                    </tfoot>
                </Table>
            </ModalBody>
        </Modal>
    )
}
