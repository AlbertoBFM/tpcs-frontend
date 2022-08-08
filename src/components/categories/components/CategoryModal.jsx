import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';

import { useCategoryStore, useUiStore } from '../../../hooks';
import { validateName } from '../../../helpers';

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

export const CategoryModal = () => {

    const { isModalOpen, closeModal, isActiveButton, activeButton } = useUiStore();
    const { activeCategory, startSavingCategory } = useCategoryStore();

    const { register, reset, formState: { errors }, handleSubmit } = useForm();

    const onSubmit = async ( data ) => {
        activeButton( false );

        // TODO:
        await startSavingCategory( data );
        closeModal();
    }


    const onCloseModal = () => closeModal();

    useEffect(() => {
        if ( activeCategory !== null ) 
            reset( activeCategory );
    }, [ activeCategory ])

    return (
        <Modal
            isOpen={ isModalOpen }
            onRequestClose={ onCloseModal }
            style={ customStyles }
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={ 200 }
        >
            <div className="m-3">
                <h1> Nueva Categoría </h1>
                <hr />
                <form onSubmit={ handleSubmit( onSubmit ) } className="row g-3">
                    <div className="col-md-12">
                        <label htmlFor="name" className="form-label">Nombre de Categoría</label>
                        <input className={`form-control ${ errors.name?.type && 'is-invalid' }`} 
                            id="name" type="text" placeholder="Ej: Impresoras"
                            { ...register( 'name', validateName( 'Nombre', 20 ) ) } 
                        />
                        { errors.name &&  <small className="text-danger">{ errors.name?.message }</small> }
                    </div>

                    <div className="col-md-12">
                        <label htmlFor="description" className="form-label">Descripción</label>
                        <textarea className="form-control" id="description" type="text" placeholder="Datos Adicionales..." rows="5"
                            { ...register( 'description' ) } ></textarea>
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
