import { Button } from 'reactstrap';
import { useCategoryStore, useUiStore } from '../../../hooks';

export const AddNewCategory = () => {
    const { activeButton, toggleModal } = useUiStore();
    const { setActiveCategory } = useCategoryStore();

    const handleClickNew = () => {
        setActiveCategory({name: '',description: ''});
        activeButton( true );
        toggleModal();
    }
    
    return (
        <div className="d-flex justify-content-md-end justify-content-center">
            <Button onClick={ handleClickNew } color="dark" className="m-3">
                <i className="fas fa-solid fa-plus"></i> &nbsp; Nueva Categoría
            </Button>
        </div>
    )
}
