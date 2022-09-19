import { useEffect } from 'react';
import Modal from 'react-modal';

import { useSaleDetailStore, useSaleStore, useUiStore } from '../../../hooks';
import { SaleDetailRow } from './SaleDetailRow';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

export const SaleDetailModal = () => {

    const { isModalOpen, closeModal } = useUiStore();
    const { activeSale } = useSaleStore();
    const { activeSaleDetail, startCleaningSaleDetails } = useSaleDetailStore();

    const onCloseModal = () => {
        startCleaningSaleDetails();
        closeModal();
    };

    return (
        <Modal
            isOpen={ isModalOpen }
            onRequestClose={ onCloseModal }
            style={ customStyles }
            className="modal modal-sale"
            overlayClassName="modal-fondo"
            closeTimeoutMS={ 200 }
        >
            <div className="m-3">
                <h1> Detalle de Venta </h1>
                <hr />
                <div className="m-md-auto table-responsive">
                    <table className="table table-striped text-center">
                        <thead className="bg-dark text-white">
                            <tr>
                                <th scope="col">Id Producto</th>
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
                                <td colSpan="3" className="text-end">&nbsp;</td>
                                <td><b>Total</b></td>
                                <td>{ activeSale?.total }</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </Modal>
    )
}
