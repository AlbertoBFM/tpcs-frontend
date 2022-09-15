import { useEffect } from 'react';
import { useCategoryStore } from '../../../hooks';
import { Row, AddNewCategory, CategoryModal } from '../';

import './style.css';

export const CategoryPage = () => {

    const { categories, startLoadingCategories } = useCategoryStore();

    useEffect(() => {
      
        startLoadingCategories();

    }, [])
    

    return (
        <>
            <div className="text-center">
                <h1>CategoryPage</h1>
            </div>
            <div className="col-md-8 m-md-auto table-responsive">
                <AddNewCategory />
                <table className="table table-striped text-center">
                    <thead className="bg-dark text-white">
                        <tr>
                            {/* <th scope="col">Id</th> */}
                            <th scope="col">Nombre</th>
                            <th scope="col">Descripción</th>
                            <th scope="col">&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        { categories.map( category => (<Row key={ category._id } { ...category } />) ) }
                    </tbody>
                </table>
            </div>
            <CategoryModal />
        </>
    )
}
