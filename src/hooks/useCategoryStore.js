import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { tpcsApi } from '../api';
import { messageAlert } from '../helpers';
import { onAddNewCategory, onDeleteCategory, onLoadCategories, onSetActiveCategory, onUpdateCategory } from '../store';

export const useCategoryStore = () => {

    const dispatch = useDispatch();

    const {
        categories,
        activeCategory,
    } = useSelector( state => state.category );

    const setActiveCategory = ( category ) => {
        dispatch( onSetActiveCategory( category ) );
    }

    const startLoadingCategories = async () => {

        try {
            
            const { data } = await tpcsApi.get( '/category' );
            dispatch( onLoadCategories( data.categories ) );

        } catch (error) {
            console.log('Error al cargar las categorías');
            console.log( error );
        }

    }

    const startSavingCategory = async ( category ) => {
        try {
            if ( category._id ) {
                //* Update
                await tpcsApi.put( `/category/${ category._id }`, category );
                dispatch( onUpdateCategory({ ...category }) );
                return true;
            }
            //* Create
            const { data } = await tpcsApi.post( '/category', category );
            dispatch( onAddNewCategory({ _id: data.category._id, ...category }) );
            return true;
        } catch (error) {
            console.log( error );
            messageAlert('Error al Guardar', error.response.data?.msg, 'error');
            return false;
        }
    }

    const startDeletingCategory = async ( category ) => {
        try {
            //* eliminando
            await tpcsApi.delete( `/category/${ category._id }` );
            dispatch( onDeleteCategory() );
            return;
        } catch (error) {
            console.log( error );
            messageAlert('Error al eliminar', error.response.data?.msg, 'error');
        }
    }

    return {
        //* Properties
        categories,
        activeCategory,
        //* Methods
        setActiveCategory,
        startLoadingCategories,
        startSavingCategory,
        startDeletingCategory,
    }

}