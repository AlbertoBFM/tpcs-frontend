import { useSelector, useDispatch } from 'react-redux';
import { onCloseModal, onOpenModal, onActiveButton } from '../store';

export const useUiStore = () => {

    const dispatch = useDispatch();

    const {
        isModalOpen,
        isActiveButton,
    } = useSelector( state => state.ui );

    const openModal = () => {
        dispatch( onOpenModal() );
    }

    const closeModal = () => {
        dispatch( onCloseModal() );
    }

    const activeButton = ( active ) => {
        dispatch( onActiveButton( active ) );
    }

    return {
        //* Properties
        isModalOpen,
        isActiveButton,
        //* Methods
        openModal,
        closeModal,
        activeButton,
    }

}