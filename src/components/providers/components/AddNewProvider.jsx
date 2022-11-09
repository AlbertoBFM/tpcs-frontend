import { Button } from 'reactstrap';
import { useProviderStore, useUiStore } from '../../../hooks';

export const AddNewProvider = () => {
    const { toggleModal, activeButton } = useUiStore();
    const { setActiveProvider } = useProviderStore();

    const handleClickNew = () => {
        setActiveProvider({name: '', description: '', phone: '', address: ''});
        activeButton( true );
        toggleModal();
    }
    
    return (
        <div className="mx-sm-5 px-sm-5">
            <Button onClick={ handleClickNew } color="dark" style={{ width: "100%" }}>
                <i className="fas fa-solid fa-plus"></i> &nbsp; Nuevo Proveedor
            </Button>
        </div>
    )
}
