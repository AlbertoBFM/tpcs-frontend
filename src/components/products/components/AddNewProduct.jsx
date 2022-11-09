import { Button, ButtonGroup } from 'reactstrap';
import { useProductStore, useReportStore, useUiStore } from '../../../hooks';

export const AddNewProduct = () => {
    const { openModal, activeButton } = useUiStore();
    const { setActiveProduct } = useProductStore();

    const { startGenerateProductsReport } = useReportStore();

    const generateProductsReport = async () => {
        await startGenerateProductsReport();
    }

    const handleClickNew = () => {
        setActiveProduct({name: '', description: '', stock: '', purchasePrice: '', salePrice: '', category: '', provider: ''});
        activeButton( true );
        openModal()
    }
    
    return (
        <div className="d-flex justify-content-md-end justify-content-center">
            <ButtonGroup>
                <Button color="secondary" onClick={ generateProductsReport }>
                        Reporte &nbsp;<i className="fas fa-solid fa-download"></i>
                </Button>
                &nbsp;
                <Button onClick={ handleClickNew } color="dark">
                    <i className="fas fa-solid fa-plus"></i> &nbsp; Nuevo Producto
                </Button>
            </ButtonGroup>
        </div>
    )

}
