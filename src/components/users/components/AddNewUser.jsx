import { Button } from 'reactstrap';
import { useUserStore, useUiStore } from '../../../hooks';

export const AddNewUser = () => {

    const { toggleModal, activeButton } = useUiStore();
    const { setActiveUser } = useUserStore();

    const handleClickNew = () => {
        setActiveUser({ name: '', email: '', password: '', confirmPassword: ''});
        activeButton( true );
        toggleModal();
    }
    
    return (
        <div className="mx-sm-5 px-sm-5">
            <Button onClick={ handleClickNew } color="dark" style={{ width: "100%" }}>
                <i className="fas fa-solid fa-plus"></i> Nuevo Usuario
            </Button>
        </div>
    )

}
