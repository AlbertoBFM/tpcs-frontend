import { useSelector, useDispatch } from 'react-redux';
import { onCloseModal, onOpenModal, onOpenCartModal, onCloseCartModal, onActiveButton } from '../store';

export const useUiStore = () => {

    const dispatch = useDispatch();

    const {
        isModalOpen,
        isCartModalOpen,
        isActiveButton,
    } = useSelector( state => state.ui );

    const openModal = () => {
        dispatch( onOpenModal() );
    }

    const closeModal = () => {
        dispatch( onCloseModal() );
    }

    const openCartModal = () => {
        dispatch( onOpenCartModal() );
    }

    const closeCartModal = () => {
        dispatch( onCloseCartModal() );
    }

    const activeButton = ( active ) => {
        dispatch( onActiveButton( active ) );
    }

    return {
        //* Properties
        isModalOpen,
        isCartModalOpen,
        isActiveButton,
        //* Methods
        openCartModal,
        closeCartModal,
        openModal,
        closeModal,
        activeButton,
    }

}