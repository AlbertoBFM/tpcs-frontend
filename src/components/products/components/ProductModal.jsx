import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useCategoryStore, useProductStore, useProviderStore, useUiStore } from '../../../hooks';
import { validateProductName, validatePurchasePrice, validateRangeOfNumber, validateSalePrice, messageAlert } from '../../../helpers';

import Modal from 'react-modal';
const customStyles = { content: { top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)',}, };
Modal.setAppElement('#root');

export const ProductModal = () => {

    const { isModalOpen, closeModal, isActiveButton, activeButton } = useUiStore();
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
        return element //? Si ya se selecciono una categoría 
                    ? 
                        element?._id //? Si es un producto para actualizarse
                            ?   // Al Actualizar
                                element?._id  //? Entonces que seleccione esa categoría 
                            :   // Al Insertar
                                element       //? Sino que Seleccione la categoría escogida durante la insersión
                    : 
                        ""
    }

    const onSubmit = async ( data ) => {
        activeButton( false );

        const resp = await startSavingProduct( data );

        if ( resp ) {
            closeModal();
            return messageAlert('Producto Guardado', '', 'success');
        }
        
        activeButton( true );
    }

    const onCloseModal = () => {
        closeModal();
    };

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
        <Modal
            isOpen={ isModalOpen }
            onRequestClose={ onCloseModal }
            style={ customStyles }
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={ 200 }
        >
            <div className="m-3">
                <h1> { !_id ? 'Nuevo Producto' : 'Actualizar Producto' } </h1>
                <hr />
                <form onSubmit={ handleSubmit( onSubmit ) } className="row g-3">
                    <div className="col-md-12">
                        <label htmlFor="name" className="form-label">Nombre de Producto</label>
                        <input className={`form-control ${ errors.name?.type && 'is-invalid' }`} 
                            id="name" type="text" placeholder="Ej: Canon Pixma ts705"
                            { ...register( 'name', validateProductName( 'Nombre', 50 ) ) } 
                        />
                        { errors.name &&  <small className="text-danger">{ errors.name?.message }</small> }
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="description" className="form-label">Descripción</label>
                        <textarea className="form-control" id="description" type="text" placeholder="Datos Adicionales..." rows="2"
                            { ...register( 'description' ) } 
                        ></textarea>
                    </div>
                    <div className="col-md-4 text-center">
                        <label htmlFor="stock" className="form-label">Stock</label>
                        <input 
                            id="stock" type="number"
                            className={`form-control text-center ${ ( errors.stock?.type ) && 'is-invalid' }`} 
                            { ...register( 'stock', validateRangeOfNumber( 1, 1000 ) ) }
                        />
                        { errors.stock &&  <small className="text-danger">{ errors.stock?.message }</small>}
                    </div>
                    <div className="col-md-4 text-center">
                        <label htmlFor="purchasePrice" className="form-label">Precio de Compra</label>
                        <input 
                            id="purchasePrice" type="number" step=".1"
                            className={`form-control text-center ${ ( errors.purchasePrice?.type ) && 'is-invalid' }`} 
                            { ...register( 'purchasePrice', validatePurchasePrice( 1, 20000, saleLimit ) ) }
                        />
                        { errors.purchasePrice &&  <small className="text-danger">{ errors.purchasePrice?.message }</small>}
                    </div>
                    <div className="col-md-4 text-center">
                        <label htmlFor="salePrice" className="form-label">Precio de Venta</label>
                        <input 
                            id="salePrice" type="number" step=".1"
                            className={`form-control text-center ${ ( errors.salePrice?.type ) && 'is-invalid' }`} 
                            { ...register( 'salePrice', validateSalePrice( 1, 20000, purchaseLimit ) ) }
                        />
                        { errors.salePrice &&  <small className="text-danger">{ errors.salePrice?.message }</small>}
                    </div>
                    <div className="col-md-6 text-center">
                        <label htmlFor="category">Categoría</label>
                        <select 
                            id="category" 
                            // value={ categoryValue() }
                            value={ selectedElement( selectedCategory ) }
                            className={`form-select ${ ( errors.category?.type ) && 'is-invalid' }`}
                            { ...register( 'category', { required: 'La categoría es requerida' } ) }
                        >
                            <option value="" disabled>--Selecione Categoría--</option>
                            { categories.map( category => (<option key={ category._id } value={category._id}>{ category.name }</option>) ) }
                        </select>
                        { errors.category &&  <small className="text-danger">{ errors.category?.message }</small> }
                    </div>
                    <div className="col-md-6 text-center">
                        <label htmlFor="provider">Proveedor</label>
                        <select 
                            id="provider" 
                            // value={ providerValue() }
                            value={ selectedElement( selectedProvider ) }
                            className={`form-select ${ ( errors.provider?.type ) && 'is-invalid' }`}
                            { ...register( 'provider', { required: 'El proveedor es requerido' } ) }
                        >
                            <option value="" disabled>--Selecione Proveedor--</option>
                            { providers.map( provider => (<option key={ provider._id } value={provider._id}>{ provider.name }</option>) ) }
                        </select>
                        { errors.provider &&  <small className="text-danger">{ errors.provider?.message }</small> }
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
