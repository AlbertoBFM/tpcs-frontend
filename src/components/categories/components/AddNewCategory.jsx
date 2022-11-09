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
        <div className="mx-sm-5 px-sm-5">
            <Button onClick={ handleClickNew } color="dark" style={{ width: "100%" }}>
                <i className="fas fa-solid fa-plus"></i> &nbsp; Nueva Categoría
            </Button>
        </div>
    )
}
