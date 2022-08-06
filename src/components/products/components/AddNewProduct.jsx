import { useProductStore, useUiStore } from '../../../hooks';


export const AddNewProduct = () => {

    const { openModal } = useUiStore();
    const { setActiveProduct } = useProductStore();

    const handleClickNew = () => {
        setActiveProduct({
            name: '',
            description: '',
            stock: '',
            purchasePrice: '',
            salePrice: '',
            category: '',
        });
        openModal();
    }
    
    return (
        <div className="d-flex justify-content-md-end justify-content-center">
            <button className="btn btn-dark m-3"
                onClick={ handleClickNew }
            >
                <i className="fas fa-solid fa-plus"></i> Nuevo Producto
            </button>
        </div>
    )

}
