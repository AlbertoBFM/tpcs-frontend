import { useEffect } from 'react';
import { Table } from 'reactstrap';
import { useSaleStore, useUserStore } from '../../../hooks';
import { Row, AddNewUser, UserModal } from '../';
import './style.css';

export const UserPage = () => {
    const { users, startLoadingUsers } = useUserStore();
    const { startLoadingSales } = useSaleStore();

    useEffect(() => {
        startLoadingUsers();
        startLoadingSales();
    }, [])

    return (
        <>
            <div className="text-center">
                <h1>Usuarios</h1>
            </div>
            <div className="col-md-8 m-md-auto">
                <AddNewUser />
                <Table responsive striped className="text-center">
                    <thead className="bg-dark text-white">
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Email</th>
                            <th scope="col">&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        { users.map( user => (<Row key={ user._id } { ...user } />) ) }
                    </tbody>
                </Table>
            </div>
            <UserModal />
        </>
    )
}
