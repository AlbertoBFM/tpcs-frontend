import { Button } from 'reactstrap';
import { useProductStore, useUiStore } from '../../../hooks';

export const AddNewProduct = () => {
    const { openModal, activeButton } = useUiStore();
    const { setActiveProduct } = useProductStore();

    const handleClickNew = () => {
        setActiveProduct({name: '', description: '', stock: '', purchasePrice: '', salePrice: '', category: '', provider: ''});
        activeButton( true );
        openModal()
    }
    
    return (
        <div className="d-flex justify-content-md-end justify-content-center">
            <Button onClick={ handleClickNew } color="dark" className="m-3">
                <i className="fas fa-solid fa-plus"></i> &nbsp; Nuevo Producto
            </Button>
        </div>
    )

}
