import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Button, Label, Input, Row, Col } from 'reactstrap';
import { useCategoryStore, useProductStore, useProviderStore, useUiStore } from '../../../hooks';
import { validateProductName, validatePurchasePrice, validateRangeOfNumber, validateSalePrice, messageAlert } from '../../../helpers';

export const ProductModal = () => {
    const { isModalOpen, toggleModal, isActiveButton, activeButton } = useUiStore();
    const { activeProduct, startSavingProduct } = useProductStore();
    const { categories, startLoadingCategories } = useCategoryStore();
    const { providers, startLoadingProviders } = useProviderStore();

    const { register, reset, formState: { errors }, handleSubmit, watch, } = useForm();

    const _id = watch('_id');

    const purchaseLimit = watch('purchasePrice'); 
    const saleLimit = watch('salePrice');

    const selectedCategory = watch('category');
    const selectedProvider = watch('provider');

    const selectedElement = ( element ) => { //* Para controlar la categoría y proveedor seleccionados
        if ( element ){ //* Si ya se selecciono una categoría 
            if ( element?._id ) //* Si es un producto para actualizarse
                return element?._id //* Entonces que seleccione esa categoría 
            return element //* Sino que Seleccione la categoría escogida durante la insersión
        }
        return "";
    }

    const { ref: name, ...nameRest } = register('name', validateProductName( 'Nombre', 50 ));
    const { ref: description, ...descriptionRest } = register('description');
    const { ref: stock, ...stockRest } = register('stock', validateRangeOfNumber( 1, 1000 ));
    const { ref: purchasePrice, ...purchasePriceRest } = register('purchasePrice', validatePurchasePrice( 1, 20000, saleLimit ));
    const { ref: salePrice, ...salePriceRest } = register('salePrice', validateSalePrice( 1, 20000, purchaseLimit ));
    const { ref: category, ...categoryRest } = register('category', { required: 'La categoría es requerida' } );
    const { ref: provider, ...providerRest } = register('provider', { required: 'El proveedor es requerido' } );

    const onSubmit = async ( data ) => {
        activeButton( false );
        const resp = await startSavingProduct( data );
        if ( resp ) {
            toggleModal();
            return messageAlert('Producto Guardado', '', 'success');
        }
        activeButton( true );
    }

    useEffect(() => {
        if ( activeProduct !== null ){
            reset( activeProduct );
        }
    }, [ activeProduct ])

    useEffect(() => {
        startLoadingCategories();
        startLoadingProviders();
    }, [])

    return (
        <Modal centered fullscreen="md" isOpen={ isModalOpen } toggle={ toggleModal }>
            <Form onSubmit={ handleSubmit( onSubmit ) }>
                <ModalHeader toggle={ toggleModal }>{ !_id ? 'Nuevo Producto' : 'Actualizar Producto' }</ModalHeader>
                <ModalBody className="text-center">
                    <FormGroup>
                        <Label for="name">Nombre de Producto</Label>
                        <Input 
                            className={`form-control ${ errors.name?.type && 'is-invalid' }`} id="name" type="text" placeholder="Ej: Canon Pixma ts705"
                            innerRef={ name } { ...nameRest }
                        />
                        { errors.name &&  <small className="text-danger">{ errors.name?.message }</small> }
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Descripción</Label>
                        <Input className="form-control" id="description" type="textarea" placeholder="Datos Adicionales..." rows="2"
                            innerRef={ description } { ...descriptionRest }
                        />
                    </FormGroup>
                    <Row className="d-flex justify-content-center align-items-center">
                        <Col md={4}>
                            <FormGroup>
                                <Label for="stock">Stock</Label>
                                <Input 
                                    className={`form-control text-center ${ ( errors.stock?.type ) && 'is-invalid' }`} id="stock" type="number"
                                    innerRef={ stock } { ...stockRest }
                                />
                                { errors.stock &&  <small className="text-danger">{ errors.stock?.message }</small>}
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="purchasePrice">Precio Compra</Label>
                                <Input 
                                    className={`form-control text-center ${ ( errors.purchasePrice?.type ) && 'is-invalid' }`} id="purchasePrice" type="number" step=".1"
                                    innerRef={ purchasePrice } { ...purchasePriceRest }
                                />
                                { errors.purchasePrice &&  <small className="text-danger">{ errors.purchasePrice?.message }</small>}
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="salePrice">Precio Venta</Label>
                                <Input 
                                    className={`form-control text-center ${ ( errors.salePrice?.type ) && 'is-invalid' }`} id="salePrice" type="number" step=".1"
                                    innerRef={ salePrice } { ...salePriceRest }
                                />
                                { errors.salePrice &&  <small className="text-danger">{ errors.salePrice?.message }</small>}
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="category">Categoría</Label>
                                <Input 
                                    className={`form-select ${ ( errors.category?.type ) && 'is-invalid' }`} id="category" type="select"
                                    value={ selectedElement( selectedCategory ) }
                                    innerRef={ category } { ...categoryRest }
                                >
                                    <option value="" disabled>--Selecione Categoría--</option>
                                    { categories.map( category => (<option key={ category._id } value={category._id}>{ category.name }</option>) ) }
                                </Input>
                                { errors.category &&  <small className="text-danger">{ errors.category?.message }</small> }
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="provider">Proveedor</Label>
                                <Input 
                                    className={`form-select ${ ( errors.provider?.type ) && 'is-invalid' }`} id="provider" type="select"
                                    value={ selectedElement( selectedProvider ) }
                                    innerRef={ provider } { ...providerRest }
                                >
                                    <option value="" disabled>--Selecione Proveedor--</option>
                                    { providers.map( provider => (<option key={ provider._id } value={provider._id}>{ provider.name }</option>) ) }
                                </Input>
                                { errors.provider &&  <small className="text-danger">{ errors.provider?.message }</small> }
                            </FormGroup>
                        </Col>
                    </Row>
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
