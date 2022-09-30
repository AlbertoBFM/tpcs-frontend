import { useEffect } from 'react';
import { Table } from 'reactstrap';
import { useAuthStore, useCategoryStore, useProductStore } from '../../../hooks';
import { Row, AddNewCategory, CategoryModal } from '../';
import './style.css';

export const CategoryPage = () => {
    const { user } = useAuthStore();
    const { categories, startLoadingCategories } = useCategoryStore();
    const { startLoadingProducts } = useProductStore();

    useEffect(() => {
        startLoadingCategories();
        startLoadingProducts();
    }, [])

    return (
        <>
            <div className="text-center">
                <h1>Categorías</h1>
            </div>
            <div className="col-md-8 m-md-auto">
                {user.userType === 'admin' && <AddNewCategory />}
                <Table responsive striped className="text-center">
                    <thead className="bg-dark text-white">
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Descripción</th>
                            {user.userType === 'admin' && <th scope="col">&nbsp;</th>}
                        </tr>
                    </thead>
                    <tbody>
                        { categories.map( category => (<Row key={ category._id } { ...category } />) ) }
                    </tbody>
                </Table>
            </div>
            <CategoryModal />
        </>
    )
}
