import { useEffect } from 'react';
import { Table } from 'reactstrap';
import { useSaleStore, useUserStore } from '../../../hooks';
import { Row, AddNewUser, UserModal, SearchFilter, MyPagination } from '../';
import './style.css';

export const UserPage = () => {
    const { users: { docs }, startLoadingUsers } = useUserStore();
    const { startLoadingAllSales } = useSaleStore();

    useEffect(() => {
        startLoadingUsers({});
        startLoadingAllSales();
    }, [])

    return (
        <>
            <div className="text-center">
                <h1>Usuarios</h1>
            </div>
            <div className="col-md-8 m-md-auto">
                <div className="row d-flex m-3">
                    <div className="col-sm-12 col-md-6 mt-3">
                        <SearchFilter/>
                    </div>
                    <div className="col-sm-12 col-md-6 mt-3">
                        <AddNewUser />
                    </div>
                </div>
                <Table responsive striped className="text-center">
                    <thead className="bg-dark text-white">
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Email</th>
                            <th scope="col">&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        { docs?.map( user => (<Row key={ user._id } { ...user } />) ) }
                    </tbody>
                </Table>
                <MyPagination />
            </div>
            <UserModal />
        </>
    )
}
