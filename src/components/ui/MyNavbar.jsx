import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavbarToggler, Collapse, Nav, NavItem, NavbarBrand, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { useAuthStore, useUiStore } from '../../hooks';
import { queryAlert } from '../../helpers';

export const MyNavbar = () => {

    const { startLogout, user } = useAuthStore();
    const { toggleAccountModal, togglePasswordModal, activeButton } = useUiStore();

    const [ isOpen, setIsOpen ] = useState(false);

    const onOpenIcon = () => {
        setIsOpen( !isOpen );
    }

    const onOpen = () => {
        setIsOpen( true );
    };

    const onClose = () => {
        setIsOpen( false);
    };

    const onClickAccount = () => {
        activeButton(true);
        toggleAccountModal();
    }

    const onClickPassword = () => {
        activeButton(true);
        togglePasswordModal();
    }

    const onClickLogout = async () => {
        const resp = await queryAlert(`¿Cerrar Sesión?`, 'info', 'Si', 'No', '#252624', '#ccc');
        if ( !resp ) return;

        startLogout();
    }


    return (
        <Navbar
            className="navbar-expand-md"
            color="dark"
            dark
        >
            <NavbarBrand tag={Link} to='/'>TPCS</NavbarBrand>
            <NavbarToggler onClick={onOpenIcon} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="me-auto" navbar>
                    <NavItem>
                        <NavLink tag={Link} to='/sales' onClick={ onClose }>
                            Ventas
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to='/products' onClick={ onClose }>
                            Productos
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to='/categories' onClick={ onClose }>
                            Categorías
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to='/providers' onClick={ onClose }>
                            Proveedores
                        </NavLink>
                    </NavItem>
                    {
                        user.userType === 'admin' 
                        && 
                        <NavItem>
                            <NavLink tag={Link} to="/users" onClick={ onClose }>
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
            </Collapse>
        </Navbar>
    );
}
