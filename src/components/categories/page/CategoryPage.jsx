import { useEffect } from 'react';
import { Table } from 'reactstrap';
import { useAuthStore, useCategoryStore, useProductStore } from '../../../hooks';
import { Row, AddNewCategory, CategoryModal, SearchFilter, MyPagination } from '../';
import './style.css';

export const CategoryPage = () => {
    const { user } = useAuthStore();
    const { categories: { docs }, startLoadingCategories } = useCategoryStore();
    const { startLoadingAllProducts } = useProductStore();

    useEffect(() => {
        startLoadingCategories({});
        startLoadingAllProducts();
    }, [])

    return (
        <>
            <div className="text-center">
                <h1>Categorías</h1>
            </div>
            <div className="col-md-8 m-md-auto">
                <div className="row m-3">
                    <div className="col-sm-12 col-md-6 mt-3">
                        <SearchFilter/>
                    </div>
                    {
                        user.userType === 'admin' && 
                        <div className="col-sm-12 col-md-6 mt-3">
                            <AddNewCategory />
                        </div>
                    }
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
