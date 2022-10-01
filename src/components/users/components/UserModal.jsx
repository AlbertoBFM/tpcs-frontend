import { useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Button, Label, Input } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { useUserStore, useUiStore } from '../../../hooks';
import { messageAlert, validateEmail, validateName, validatePassword } from '../../../helpers';

export const UserModal = () => {

    const { isModalOpen, toggleModal, isActiveButton, activeButton } = useUiStore();
    const { register, formState: { errors }, handleSubmit, watch, reset } = useForm();
    const { activeUser, startSavingUser } = useUserStore();

    const { ref: name, ...nameRest } = register('name', validateName( 'Nombre', 50 ));
    const { ref: email, ...emailRest } = register('email', validateEmail( 50 ));
    const { ref: password, ...passwordRest } =register('password', validatePassword( 8, 30 ));
    const { ref: confirmPassword, ...confirmPasswordRest } = register( 'confirmPassword', validatePassword( 8, 30 )) ;

    const onSubmit = async ( data ) => {
        activeButton( false );
        const password = watch('password');
        const confirmPassword = watch('confirmPassword');

        if ( password !== confirmPassword ) {
            activeButton( true );
            return messageAlert('La contraseña y la confirmación deben ser iguales', '', 'error');
        }
        const resp = await startSavingUser( data );
        if ( resp ) return toggleModal();

        activeButton( true );
    }

    useEffect(() => {
        if ( activeUser !== null ) 
            reset( activeUser );
    }, [ activeUser ])

    return (
        <Modal centered fullscreen="md" isOpen={ isModalOpen } toggle={ toggleModal }>
                <Form onSubmit={ handleSubmit( onSubmit ) }>
                <ModalHeader toggle={ toggleModal }>Nuevo Usuario</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="name">Nombre de Usuario</Label>
                        <Input 
                            className={`form-control ${ errors.name?.type && 'is-invalid' }`} id="name" type="text" placeholder="Ej: Big Mama"
                            innerRef={ name } { ...nameRest }
                        />
                        { errors.name &&  <small className="text-danger">{ errors.name?.message }</small> }
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input 
                            className={`form-control ${ errors.email?.type && 'is-invalid' }`} id="email" type="text" placeholder="Ej: motomoto@gmail.com"
                            innerRef={ email } { ...emailRest }
                        />
                        { errors.email &&  <small className="text-danger">{ errors.email?.message }</small> }
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Contraseña</Label>
                        <Input 
                            className={`form-control ${ errors.password?.type && 'is-invalid' }`} id="password" type="password" placeholder="**********"
                            innerRef={ password } { ...passwordRest }
                        />
                        { errors.password &&  <small className="text-danger">{ errors.password?.message }</small> }
                    </FormGroup>
                    <FormGroup>
                        <Label for="confirmPassword">Confirmar Contraseña</Label>
                        <Input 
                            className={`form-control ${ errors.confirmPassword?.type && 'is-invalid' }`} id="confirmPassword" type="password" placeholder="**********"
                            innerRef={ confirmPassword } { ...confirmPasswordRest }
                        />
                        { errors.confirmPassword &&  <small className="text-danger">{ errors.confirmPassword?.message }</small> }
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" color="dark" disabled={ isActiveButton }>
                        <i className="far fa-save"></i>
                        <span> Guardar</span>
                    </Button>
                    <Button color="secondary" onClick={ toggleModal }>Cancel</Button>
                </ModalFooter>
                </Form>
        </Modal>
    )
}
