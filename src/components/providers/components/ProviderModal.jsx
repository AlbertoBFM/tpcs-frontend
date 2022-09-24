import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useProviderStore, useUiStore } from '../../../hooks';
import { messageAlert, validatePhone, validateProductName } from '../../../helpers';

import Modal from 'react-modal';
Modal.setAppElement('#root');
const customStyles = { content: { top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)', }, };

export const ProviderModal = () => {

    const { isModalOpen, closeModal, isActiveButton, activeButton } = useUiStore();
    const { activeProvider, startSavingProvider } = useProviderStore();

    const { register, reset, formState: { errors }, handleSubmit, watch } = useForm();

    const _id = watch('_id');

    const onSubmit = async ( data ) => {
        activeButton( false );

        const resp = await startSavingProvider( data );
        if ( resp ) {
            closeModal();
            return messageAlert( 'Proveedor Guardado', '', 'success' );
        }
        
        activeButton( true );
    }


    const onCloseModal = () => closeModal();

    useEffect(() => {
        if ( activeProvider !== null ) 
            reset( activeProvider );
    }, [ activeProvider ])

    return (
        <Modal
            isOpen={ isModalOpen }
            onRequestClose={ onCloseModal }
            style={ customStyles }
            className="modal modal-provider"
            overlayClassName="modal-fondo"
            closeTimeoutMS={ 200 }
        >
            <div className="m-3">
                <h1> { !_id ? 'Nuevo Proveedor' : 'Actualizar Proveedor' } </h1>
                <hr />
                <form onSubmit={ handleSubmit( onSubmit ) } className="row g-3">
                    <div className="col-md-6">
                        <label htmlFor="name" className="form-label">Nombre de Proveedor</label>
                        <input className={`form-control ${ errors.name?.type && 'is-invalid' }`} 
                            id="name" type="text" placeholder="Empresa J y K"
                            { ...register( 'name', validateProductName( 'Nombre', 20 ) ) } 
                        />
                        { errors.name &&  <small className="text-danger">{ errors.name?.message }</small> }
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="phone" className="form-label">Celular</label>
                        <input 
                            id="phone" type="tel" placeholder='Ej: +591 76167710' 
                            className={`form-control text-center ${ ( errors.phone?.type ) && 'is-invalid' }`} 
                            { ...register( 'phone', validatePhone( 20 ) ) }
                        />
                        { errors.phone &&  <small className="text-danger">{ errors.phone?.message }</small>}
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="description" className="form-label">Descripción</label>
                        <textarea className="form-control" id="description" type="text" placeholder="Datos Adicionales..." rows="2"
                            { ...register( 'description' ) } ></textarea>
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="address" className="form-label">Dirección</label>
                        <textarea className={`form-control ${ errors.address?.type && 'is-invalid' }`} 
                            id="address" type="text" placeholder="Ej: Av. Serrano S/N" rows="1"
                            { ...register( 'address', validateProductName( 'Dato', 500 ) ) } ></textarea>
                        { errors.address &&  <small className="text-danger">{ errors.address?.message }</small>}
                    </div>
                    
                    <button type="submit" className="btn btn-dark btn-block" disabled={ isActiveButton }>
                        <i className="far fa-save"></i>
                        <span> Guardar</span>
                    </button>
                </form>
            </div>
        </Modal>
    )
}
