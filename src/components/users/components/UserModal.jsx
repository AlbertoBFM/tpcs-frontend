// import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useUserStore, useUiStore } from '../../../hooks';
import { messageAlert, validateEmail, validateName, validatePassword } from '../../../helpers';

import Modal from 'react-modal';
Modal.setAppElement('#root');
const customStyles = { content: { top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)', }, };

export const UserModal = () => {

    const { isModalOpen, closeModal, isActiveButton, activeButton } = useUiStore();
    const { startSavingUser } = useUserStore();

    const { register, formState: { errors }, handleSubmit, watch } = useForm();

    const onSubmit = async ( data ) => {
        activeButton( false );

        const password = watch('password');
        const confirmPassword = watch('confirmPassword');

        if ( password !== confirmPassword ) {
            activeButton( true );
            return messageAlert('La contraseña y la confirmación deben ser iguales', '', 'error');
        }
        const resp = await startSavingUser( data );
        if ( resp ) return closeModal();

        activeButton( true );
    }

    const onCloseModal = () => closeModal();

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
                <h1> Nuevo Usuario </h1>
                <hr />
                <form onSubmit={ handleSubmit( onSubmit ) } className="row g-3">
                    <div className="col-md-12">
                        <label htmlFor="name" className="form-label">Nombre de Usuario</label>
                        <input className={`form-control ${ errors.name?.type && 'is-invalid' }`} 
                            id="name" type="text" placeholder="Ej: Big Mama"
                            { ...register( 'name', validateName( 'Nombre', 20 ) ) } 
                        />
                        { errors.name &&  <small className="text-danger">{ errors.name?.message }</small> }
                    </div>

                    <div className="col-md-12">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input className={`form-control ${ errors.email?.type && 'is-invalid' }`} 
                            id="email" type="text" placeholder="Ej: motomoto@gmail.com"
                            { ...register( 'email', validateEmail( 50 ) ) } 
                        />
                        { errors.email &&  <small className="text-danger">{ errors.email?.message }</small> }
                    </div>

                    <div className="col-md-12">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input className={`form-control ${ errors.password?.type && 'is-invalid' }`} 
                            id="password" type="password" placeholder="**********"
                            { ...register( 'password', validatePassword( 8, 30 ) ) } 
                        />
                        { errors.password &&  <small className="text-danger">{ errors.password?.message }</small> }
                    </div>

                    <div className="col-md-12">
                        <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña</label>
                        <input className={`form-control ${ errors.confirmPassword?.type && 'is-invalid' }`} 
                            id="confirmPassword" type="password" placeholder="**********"
                            { ...register( 'confirmPassword', validatePassword( 8, 30 ) ) } 
                        />
                        { errors.confirmPassword &&  <small className="text-danger">{ errors.confirmPassword?.message }</small> }
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
