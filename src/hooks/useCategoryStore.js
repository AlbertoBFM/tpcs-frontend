import { useSelector, useDispatch } from 'react-redux';
import { onSetActiveCategory } from '../store';

export const useCategoryStore = () => {

    const dispatch = useDispatch();

    const {
        categories,
        activeCategory,
    } = useSelector( state => state.category );

    const setActiveCategory = ( category ) => {
        dispatch( onSetActiveCategory( category ) );
    }

    return {
        //* Properties
        categories,
        activeCategory,
        //* Methods
        setActiveCategory,
    }

}