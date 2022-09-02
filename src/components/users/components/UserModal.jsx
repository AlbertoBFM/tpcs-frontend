// import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';

import { useUserStore, useUiStore } from '../../../hooks';
import { validateEmail, validateName, validatePassword } from '../../../helpers';

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

export const UserModal = () => {

    const { isModalOpen, closeModal, isActiveButton, activeButton } = useUiStore();
    const { activeUser, startSavingUser } = useUserStore();

    const { register, reset, formState: { errors }, handleSubmit } = useForm();

    const onSubmit = async ( data ) => {
        activeButton( false );

        // TODO:
        await startSavingUser( data );
        closeModal();
    }


    const onCloseModal = () => closeModal();

    // useEffect(() => {
    //     if ( activeUser !== null ) 
    //         reset( activeUser );
    // }, [ activeUser ])

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

                    <button type="submit" className="btn btn-dark btn-block" disabled={ isActiveButton }>
                        <i className="far fa-save"></i>
                        <span> Guardar</span>
                    </button>
                </form>
            </div>
        </Modal>
    )
}
