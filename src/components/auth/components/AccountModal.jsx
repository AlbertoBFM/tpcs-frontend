import { useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Button, Label, Input } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { useUiStore, useAuthStore } from '../../../hooks';
import { validateEmail, validateName } from '../../../helpers';

export const AccountModal = () => {
    const { isAccountModalOpen, toggleAccountModal, isActiveButton, activeButton } = useUiStore();
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const { user, startUpdatingUser } = useAuthStore();

    const { ref: name, ...nameRest } = register('name', validateName( 'Nombre', 50 ));
    const { ref: email, ...emailRest } = register('email', validateEmail( 50 ));

    const onSubmit = async ( data ) => {
        activeButton( false );

        const resp = await startUpdatingUser( data );
        if ( resp ) return toggleAccountModal();

        activeButton( true );
    }

    useEffect(() => {
        if ( user !== null ) 
            reset( user );
    }, [ isAccountModalOpen ])

    return (
        <Modal centered isOpen={ isAccountModalOpen } toggle={ toggleAccountModal }>
                <Form onSubmit={ handleSubmit( onSubmit ) }>
                <ModalHeader toggle={ toggleAccountModal }>Usuario</ModalHeader>
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
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" color="dark" disabled={ isActiveButton }>
                        <i className="far fa-save"></i>
                        <span> Guardar</span>
                    </Button>
                    <Button color="secondary" onClick={ toggleAccountModal }>Cancel</Button>
                </ModalFooter>
                </Form>
        </Modal>
    )
}
