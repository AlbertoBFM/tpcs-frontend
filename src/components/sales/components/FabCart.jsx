import { Button } from 'reactstrap';
import { useUiStore } from '../../../hooks';

export const FabCart = () => {
    const { toggleCartModal } = useUiStore();

    const handleClickCart = () => {
        toggleCartModal();
    }

    return (
        <Button onClick={ handleClickCart } color="primary" className="fab">
            <i className="fas fa-solid fa-cart-shopping"></i>
        </Button>
    )
}
