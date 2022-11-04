import { useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Button, Label, Input } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { useAuthStore, useUiStore } from '../../../hooks';
import { messageAlert, validatePassword } from '../../../helpers';

export const PasswordModal = () => {
    const { isPasswordModalOpen, togglePasswordModal, isActiveButton, activeButton } = useUiStore();
    const { register, formState: { errors }, handleSubmit, watch, reset } = useForm();
    const { startUpdatingPassword } = useAuthStore();

    const { ref: oldPassword, ...oldPasswordRest } =register('oldPassword', validatePassword( 8, 30 ));
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
        const resp = await startUpdatingPassword( data );
        if ( resp ) return togglePasswordModal();

        activeButton( true );
    }

    useEffect(() => {
        reset({});
    }, [ isPasswordModalOpen ])

    return (
        <Modal centered isOpen={ isPasswordModalOpen } toggle={ togglePasswordModal }>
                <Form onSubmit={ handleSubmit( onSubmit ) } className="text-bg-dark">
                <ModalHeader 
                    toggle={ togglePasswordModal }
                    close={ <Button close onClick={togglePasswordModal} variant="white"></Button> }
                >Cambio de Contraseña</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="oldPassword">Contraseña Actual</Label>
                        <Input 
                            className={`form-control ${ errors.oldPassword?.type && 'is-invalid' }`} id="oldPassword" type="password" placeholder="**********"
                            innerRef={ oldPassword } { ...oldPasswordRest }
                        />
                        { errors.oldPassword &&  <small className="text-danger">{ errors.oldPassword?.message }</small> }
                    </FormGroup>
                    <hr />
                    <FormGroup>
                        <Label for="password">Nueva Contraseña</Label>
                        <Input 
                            className={`form-control ${ errors.password?.type && 'is-invalid' }`} id="password" type="password" placeholder="**********"
                            innerRef={ password } { ...passwordRest }
                        />
                        { errors.password &&  <small className="text-danger">{ errors.password?.message }</small> }
                    </FormGroup>
                    <FormGroup>
                        <Label for="confirmPassword">Confirmar Nueva Contraseña</Label>
                        <Input 
                            className={`form-control ${ errors.confirmPassword?.type && 'is-invalid' }`} id="confirmPassword" type="password" placeholder="**********"
                            innerRef={ confirmPassword } { ...confirmPasswordRest }
                        />
                        { errors.confirmPassword &&  <small className="text-danger">{ errors.confirmPassword?.message }</small> }
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" color="light" outline disabled={ isActiveButton }>
                        <i className="far fa-save"></i>
                        <span> Guardar</span>
                    </Button>
                    <Button color="danger" outline onClick={ togglePasswordModal }>Cancel</Button>
                </ModalFooter>
                </Form>
        </Modal>
    )
}
