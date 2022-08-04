import { FormModal } from '../ui';
import { useUiStore, useCategoryStore } from '../../hooks';
import { Row } from './Row';

export const CategoryPage = () => {

    const { openModal } = useUiStore();

    const { categories } = useCategoryStore();

    return (
        <>
            <div className="text-center">
                <h1>CategoryPage</h1>
            </div>
            <div className="d-flex justify-content-md-end justify-content-center">
                <button className="btn btn-dark m-3"
                    onClick={ openModal }
                >
                    Nueva Categoría
                </button>
            </div>
            <div className="m-md-auto table-responsive">
                <table className="table table-striped text-center">
                    <thead className="bg-dark text-white">
                        <tr>
                            <th scope="col">Id</th>
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
            <FormModal />
        </>
    )
}
