import { useProviderStore, useUiStore } from '../../../hooks';


export const AddNewProvider = () => {

    const { openModal, activeButton } = useUiStore();
    const { setActiveProvider } = useProviderStore();

    const handleClickNew = () => {
        setActiveProvider({
            name: '',
            description: '',
            phone: '',
            address: ''
        });
        activeButton( true );
        openModal();
    }
    
    return (
        <div className="d-flex justify-content-md-end justify-content-center">
            <button className="btn btn-dark m-3"
                onClick={ handleClickNew }
            >
                <i className="fas fa-solid fa-plus"></i> Nuevo Proveedor
            </button>
        </div>
    )

}
