import { useUiStore } from '../../../hooks';


export const FabCart = () => {

    const { openCartModal } = useUiStore();
    // const { setActiveEvent } = useCalendarStore();

    const handleClickCart = () => {
        openCartModal();
    }

    return (
        <button 
            className="btn btn-primary fab"
            onClick={ handleClickCart }
        >
            <i className="fas fa-solid fa-cart-shopping"></i>
        </button>
    )
}
