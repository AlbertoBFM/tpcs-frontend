import { useSelector, useDispatch } from 'react-redux';
import { tpcsApi } from '../api';
import { messageAlert } from '../helpers';
import { onAddNewCategory, onChangeSearchedName, onDeleteCategory, onLoadAllCategories, onLoadCategories, onSetActiveCategory, onUpdateCategory } from '../store';

export const useCategoryStore = () => {
    const dispatch = useDispatch();

    const {
        allCategories,
        categories,
        searchedName,
        activeCategory,
    } = useSelector( state => state.category );

    const setActiveCategory = ( category ) => {
        dispatch( onSetActiveCategory( category ) );
    }

    const startLoadingAllCategories = async () => {
        try {   
            const { data } = await tpcsApi.get( '/category/all' );
            dispatch( onLoadAllCategories( data.categories ) );
        } catch (error) {
            console.log('Error al cargar las categorías');
            console.log( error );
        }
    }

    const startChangeSearchName = ( searchedName ) => {
        dispatch( onChangeSearchedName( searchedName ) );
    }

    const startLoadingCategories = async ({pageNumber, searchedName}) => {
        const page = pageNumber || localStorage.getItem('categoryPage') || 1;
        let name;
        if ( searchedName === '' )
            name = ''
        else
            name = searchedName || localStorage.getItem('searchedCategoryName') || '';  
            
        try {
            const { data } = await tpcsApi.get( `/category?page=${ page }&name=${ name }` );
            localStorage.setItem('categoryPage', page);
            localStorage.setItem('searchedCategoryName', name);
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
        allCategories,
        categories,
        searchedName,
        activeCategory,
        //* Methods
        setActiveCategory,
        startLoadingAllCategories,
        startChangeSearchName,
        startLoadingCategories,
        startSavingCategory,
        startDeletingCategory,
    }
}