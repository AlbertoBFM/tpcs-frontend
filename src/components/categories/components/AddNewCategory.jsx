import { useCategoryStore, useUiStore } from '../../../hooks';


export const AddNewCategory = () => {

    const { openModal, activeButton } = useUiStore();
    const { setActiveCategory } = useCategoryStore();

    const handleClickNew = () => {
        setActiveCategory({
            name: '',
            description: '',
        });
        activeButton( true );
        openModal();
    }
    
    return (
        <div className="d-flex justify-content-md-end justify-content-center">
            <button className="btn btn-dark m-3"
                onClick={ handleClickNew }
            >
                <i className="fas fa-solid fa-plus"></i> Nueva Categoría
            </button>
        </div>
    )

}
