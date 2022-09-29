import { Link } from 'react-router-dom';
import { useAuthStore } from '../../hooks';
import { queryAlert } from '../../helpers';

export const Navbar = () => {

    const { startLogout, user } = useAuthStore();

    const onClickLogout = async () => {
        const resp = await queryAlert(`¿Cerrar Sesión?`, 'info', 'Si', 'No');
        if ( !resp ) return;

        startLogout();
    }

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Reactstrap</Link>
                <button 
                    className="navbar-toggler" type="button" data-bs-toggle="collapse" 
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse " id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-sm-0 ">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="/sales">Ventas</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/products">Productos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/categories">Categorias</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/providers">Proveedores</Link>
                        </li>
                        {
                            user.userType === 'admin' 
                            && 
                            <li className="nav-item">
                                <Link className="nav-link" to="/users">Usuarios</Link>
                            </li>
                        }
                        {/* <li className="nav-item">
                            <Link className="nav-link" to="/repairs">Reparaciones</Link>
                        </li> */}
                        {/* <li className="nav-item">
                            <Link className="nav-link" to="/clients">Clientes</Link>
                        </li> */}
                    </ul>
                    <div>
                        <span className="text-white">{ user.name }</span>
                        &nbsp;
                        &nbsp;
                        <button className="btn btn-outline-danger"
                            onClick={ onClickLogout }
                        >
                            <i className="fas fa-sign-out-alt"></i>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}
