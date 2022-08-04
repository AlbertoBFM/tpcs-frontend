import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import Modal from 'react-modal';
// import Swal from 'sweetalert2';
// import 'sweetalert2/dist/sweetalert2.min.css';

import { validateName } from '../../helpers';

import { useCategoryStore, useUiStore } from '../../hooks';

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

export const FormModal = () => {

    const { isModalOpen, closeModal } = useUiStore();
    const { activeCategory } = useCategoryStore();

    const { register, reset, formState: { errors }, handleSubmit } = useForm();

    const onSubmit = ( data ) => {
        console.log(data);

        // TODO:
        //*Remove errors of picture
        //*Close Modal
    }


    const onCloseModal = () => {
        console.log('Cerrando Modal');
        closeModal();
    }

    useEffect(() => {
        if ( activeCategory !== null ){
            reset( activeCategory );
        }
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
                        <input 
                            className={`form-control ${ errors.name?.type && 'is-invalid' }`} 
                            id="name" type="text" placeholder="Ej: Impresoras"
                            { ...register( 'name', validateName( 'Nombre', 20 ) ) } 
                        />
                        { errors.name &&  <small className="text-danger">{ errors.name?.message }</small> }
                    </div>

                    <div className="col-md-12">
                        <label htmlFor="description" className="form-label">Descripción</label>
                        <textarea 
                            className="form-control"
                            id="description" type="text" placeholder="Datos Adicionales..." 
                            rows="5"
                            { ...register( 'description' ) } 
                        ></textarea>
                        {/* <small className="form-text text-muted">Información adicional</small> */}
                    </div>

                    <button
                        type="submit"
                        className="btn btn-dark btn-block"
                    >
                        <i className="far fa-save"></i>
                        <span> Guardar</span>
                    </button>
                </form>
            </div>
        </Modal>
    )
}
