import { useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Button, Label, Input, Col, Row } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { useProviderStore, useUiStore } from '../../../hooks';
import { messageAlert, validatePhone, validateProductName } from '../../../helpers';

export const ProviderModal = () => {
    const { register, reset, formState: { errors }, handleSubmit, watch } = useForm();
    const _id = watch('_id');
    const { isModalOpen ,toggleModal, isActiveButton, activeButton } = useUiStore();
    const { activeProvider, startSavingProvider } = useProviderStore();

    const { ref: name, ...nameRest } = register('name', validateProductName( 'Nombre', 50 ));
    const { ref: phone, ...phoneRest } = register('phone', validatePhone( 20 ));
    const { ref: description, ...descriptionRest } = register('description');
    const { ref: address, ...addressRest } = register('address', validateProductName( 'Dato', 500 ));

    const onSubmit = async ( data ) => {
        activeButton( false );
        const resp = await startSavingProvider( data );
        if ( resp ) {
            toggleModal();
            return messageAlert( 'Proveedor Guardado', '', 'success' );
        }
        activeButton( true );
    }

    useEffect(() => {
        if ( activeProvider !== null ) 
            reset( activeProvider );
    }, [ activeProvider ])

    return (
        <Modal centered isOpen={ isModalOpen } toggle={ toggleModal }>
            <Form onSubmit={ handleSubmit( onSubmit ) }>
                <ModalHeader toggle={ toggleModal }>{ !_id ? 'Nuevo Proveedor' : 'Actualizar Proveedor' } </ModalHeader>
                <ModalBody>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="name">Nombre de Proveedor</Label>
                                <Input 
                                    className={`form-control ${ errors.name?.type && 'is-invalid' }`} id="name" type="text" placeholder="Empresa J y K"
                                    innerRef={ name } { ...nameRest }
                                />
                                { errors.name &&  <small className="text-danger">{ errors.name?.message }</small> }
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="phone">Celular</Label>
                                <Input 
                                    className={`form-control text-center ${ ( errors.phone?.type ) && 'is-invalid' }`} id="phone" type="tel" placeholder='Ej: +591 76167710' 
                                    innerRef={ phone } { ...phoneRest } 
                                />
                                { errors.phone &&  <small className="text-danger">{ errors.phone?.message }</small>}
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label for="description">Descripción</Label>
                        <Input 
                            className="form-control" id="description" type="textarea" placeholder="Datos Adicionales..." rows="2"
                            innerRef={ description } { ...descriptionRest }
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="address">Dirección</Label>
                        <Input  
                            className={`form-control ${ errors.address?.type && 'is-invalid' }`} id="address" type="textarea" placeholder="Ej: Av. Serrano S/N" rows="1"
                            innerRef={ address } { ...addressRest }
                        />
                        { errors.address &&  <small className="text-danger">{ errors.address?.message }</small>}
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button type="submit" color="dark" disabled={ isActiveButton }>
                        <i className="far fa-save"></i>
                        <span> Guardar</span>
                    </Button>
                    <Button color="secondary" onClick={ toggleModal }>
                        Cancel
                    </Button>
                </ModalFooter>
            </Form>
        </Modal>
    )
}
