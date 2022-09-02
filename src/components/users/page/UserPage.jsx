import { useUserStore } from '../../../hooks';
import { Row, AddNewUser, UserModal } from '../';

import './style.css';

export const UserPage = () => {

    const { users } = useUserStore();

    return (
        <>
            <div className="text-center">
                <h1>UserPage</h1>
            </div>
            <div className="col-md-8 m-md-auto table-responsive">
                <AddNewUser />
                <table className="table table-striped text-center">
                    <thead className="bg-dark text-white">
                        <tr>
                            {/* <th scope="col">Id</th> */}
                            <th scope="col">Nombre</th>
                            <th scope="col">Email</th>
                            <th scope="col">&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        { users.map( user => (<Row key={ user._id } { ...user } />) ) }
                    </tbody>
                </table>
            </div>
            <UserModal />
        </>
    )
}
