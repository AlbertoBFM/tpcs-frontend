import { useEffect } from 'react';
import { Table } from 'reactstrap';
import { useAuthStore, useCategoryStore, useProductStore } from '../../../hooks';
import { Row, AddNewCategory, CategoryModal, SearchFilter, MyPagination } from '../';
import './style.css';

export const CategoryPage = () => {
    const { user } = useAuthStore();
    const { categories: { docs }, startLoadingCategories } = useCategoryStore();
    const { startLoadingProducts } = useProductStore();

    useEffect(() => {
        startLoadingCategories({});
        startLoadingProducts({});
    }, [])

    return (
        <>
            <div className="text-center">
                <h1>Categorías</h1>
            </div>
            <div className="col-md-8 m-md-auto">
                <div className="d-flex justify-content-between align-items-center m-3">
                    <SearchFilter/>
                    {user.userType === 'admin' && <AddNewCategory />}
                </div>
                <Table responsive striped className="text-center">
                    <thead className="bg-dark text-white">
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Descripción</th>
                            {user.userType === 'admin' && <th scope="col">&nbsp;</th>}
                        </tr>
                    </thead>
                    <tbody>
                        { docs?.map( category => (<Row key={ category._id } { ...category } />) ) }
                    </tbody>
                </Table>
                <MyPagination />
            </div>
            <CategoryModal />
        </>
    )
}
