import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavbarToggler, Collapse, Nav, NavItem, NavbarBrand, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { useAuthStore } from '../../hooks';
import { queryAlert } from '../../helpers';

export const MyNavbar = () => {

    const { startLogout, user } = useAuthStore();

    const [ isOpen, setIsOpen ] = useState(false);

    const toggle = () => setIsOpen( !isOpen );

    const onClickAccount = () => {
        console.log('cuenta');
    }

    const onClickPassword = () => {
        console.log('password');
    }

    const onClickLogout = async () => {
        const resp = await queryAlert(`¿Cerrar Sesión?`, 'info', 'Si', 'No');
        if ( !resp ) return;

        startLogout();
    }


    return (
        <Navbar
            className="navbar-expand-md"
            color="dark"
            dark
        >
            <NavbarBrand tag={Link} to='/'>Reactstrap</NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="me-auto" navbar>
                    <NavItem>
                        <NavLink tag={Link} to='/sales'>
                            Ventas
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to='/products'>
                            Productos
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to='/categories'>
                            Categorías
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to='/providers'>
                            Proveedores
                        </NavLink>
                    </NavItem>
                    {
                        user.userType === 'admin' 
                        && 
                        <NavItem>
                            <NavLink tag={Link} to="/users">
                                Usuarios
                            </NavLink>
                        </NavItem>
                    }
                </Nav>   
                <UncontrolledDropdown>
                    <DropdownToggle caret color="dark">{ user.name }</DropdownToggle>
                    <DropdownMenu dark>
                        <DropdownItem onClick={ onClickAccount }>Cuenta</DropdownItem>
                        <DropdownItem onClick={ onClickPassword }>Cambiar Contraseña</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={ onClickLogout }>Cerrar Sesión</DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
                {/* <span className="text-white">{ user.name }</span>
                &nbsp;
                &nbsp;
                <Button outline color="danger" onClick={ onClickLogout }>
                    <i className="fas fa-sign-out-alt"></i>
                </Button> */}
            </Collapse>
        </Navbar>
    );
}
