import { useSelector, useDispatch } from 'react-redux';
import { onAddNewCategory, onDeleteCategory, onSetActiveCategory, onUpdateCategory } from '../store';
import { useProductStore } from './useProductStore';

export const useCategoryStore = () => {

    const dispatch = useDispatch();

    // const { products } = useProductStore();

    const {
        categories,
        activeCategory,
    } = useSelector( state => state.category );

    const setActiveCategory = ( category ) => {
        dispatch( onSetActiveCategory( category ) );
    }

    const startSavingCategory = async ( category ) => {
        // TODO: Backend

        if ( category._id ) {
            //* Update
            dispatch( onUpdateCategory({ ...category }) );
        } else {
            //* Create
            dispatch( onAddNewCategory({ _id: new Date().getTime().toString(), ...category }) );
        }
    }

    const startDeletingCategory = async () => {
        // TODO: Backend
        
        dispatch( onDeleteCategory() );
    }

    return {
        //* Properties
        categories,
        activeCategory,
        //* Methods
        setActiveCategory,
        startSavingCategory,
        startDeletingCategory,
    }

}