import { useUserStore, useUiStore } from '../../../hooks';


export const AddNewUser = () => {

    const { openModal, activeButton } = useUiStore();
    const { setActiveUser } = useUserStore();

    const handleClickNew = () => {
        setActiveUser({
            name: '',
            email: '',
            password: '',
        });
        activeButton( true );
        openModal();
    }
    
    return (
        <div className="d-flex justify-content-md-end justify-content-center">
            <button className="btn btn-dark m-3"
                onClick={ handleClickNew }
            >
                <i className="fas fa-solid fa-plus"></i> Nuevo Usuario
            </button>
        </div>
    )

}
