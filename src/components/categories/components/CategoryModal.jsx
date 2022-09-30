import { useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Button, Label, Input } from 'reactstrap';
import { useForm } from 'react-hook-form';

import { useCategoryStore, useUiStore } from '../../../hooks';
import { messageAlert, validateName } from '../../../helpers';

export const CategoryModal = () => {

    const { isModalOpen, closeModal, isActiveButton, activeButton, toggleModal } = useUiStore();
    const { activeCategory, startSavingCategory } = useCategoryStore();

    const { register, reset, formState: { errors }, handleSubmit, watch } = useForm();

    const _id = watch('_id');

    const onSubmit = async ( data ) => {
        activeButton( false );

        const resp = await startSavingCategory( data );
        if ( resp ) {
            toggleModal();
            return messageAlert( 'Categoría guardada', '', 'success' );
        }
        
        activeButton( true );
    }

    const { ref: name, ...nameRest } = register('name', validateName( 'Nombre', 50 ));
    const { ref: description, ...descriptionRest } = register('description');

    useEffect(() => {
        if ( activeCategory !== null ) 
            reset( activeCategory );
    }, [ activeCategory ])

    return (
        <Modal
            fullscreen="md"
            isOpen={ isModalOpen }
            toggle={ toggleModal }
        >
            <Form onSubmit={ handleSubmit( onSubmit ) }>
                <ModalHeader toggle={ toggleModal }>
                    { !_id ? 'Nueva Categoría' : 'Actualizar Categoría' }
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="name">Nombre de Categoría</Label>
                        <Input 
                            className={`form-control ${ errors.name?.type && 'is-invalid' }`} id="name" type="text" placeholder="Ej: Impresoras"
                            innerRef={ name }
                            { ...nameRest }
                        />
                        { errors.name &&  <small className="text-danger">{ errors.name?.message }</small> }
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Descripción</Label>
                        <Input 
                            className="form-control" id="description" type="textarea" placeholder="Datos Adicionales..." rows="5"
                            innerRef={ description }   
                            { ...descriptionRest }
                        />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" color="dark" disabled={ isActiveButton }>
                        <i className="far fa-save"></i>
                        <span> Guardar</span>
                    </Button>
                </ModalFooter>
            </Form>
        </Modal>
    )
}
