import { useSelector, useDispatch } from 'react-redux';
import { onCloseModal, onOpenModal, onOpenCartModal, onCloseCartModal, onActiveButton, onToggleAccountModal, onTogglePasswordModal } from '../store';

export const useUiStore = () => {

    const dispatch = useDispatch();

    const {
        isModalOpen,
        isCartModalOpen,
        isAccountModalOpen,
        isPasswordModalOpen,
        isActiveButton,
    } = useSelector( state => state.ui );

    const openModal = () => {
        dispatch( onOpenModal() );
    }

    const closeModal = () => {
        dispatch( onCloseModal() );
    }

    const toggleModal = () => {
        ( !isModalOpen )
            ? openModal()
            : closeModal();
    }

    const openCartModal = () => {
        dispatch( onOpenCartModal() );
    }

    const closeCartModal = () => {
        dispatch( onCloseCartModal() );
    }

    const toggleCartModal = () => {
        ( !isCartModalOpen )
            ? openCartModal()
            : closeCartModal();
    }

    const toggleAccountModal = () => {
        dispatch( onToggleAccountModal() );
    }

    const togglePasswordModal = () => {
        dispatch( onTogglePasswordModal() );
    }

    const activeButton = ( active ) => {
        dispatch( onActiveButton( active ) );
    }

    return {
        //* Properties
        isModalOpen,
        isAccountModalOpen,
        isPasswordModalOpen,
        isCartModalOpen,
        isActiveButton,
        //* Methods
        openCartModal,
        closeCartModal,
        toggleModal,
        toggleCartModal,
        toggleAccountModal,
        togglePasswordModal,
        openModal,
        closeModal,
        activeButton,
    }

}