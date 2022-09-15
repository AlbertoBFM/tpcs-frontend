import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useUiStore, useAuthStore } from '../../../hooks';
import { useForm } from 'react-hook-form';

import { validateEmail, validateName, validatePassword } from '../../../helpers';
import './login.css';

export const LoginPage = () => {

    const { startLogin, errorMessage } = useAuthStore();

    const { register, formState: { errors }, handleSubmit } = useForm();

    const onSubmit = async ( data ) => {
        // activeButton( false );
        startLogin(data);
        // TODO:
        // await startSavingCategory( data );
        // closeModal();
    }

    useEffect(() => {
      
        if ( errorMessage !== undefined ) {
            Swal.fire( 'Error en la autenticación', errorMessage, 'error' );
        }

    }, [ errorMessage ])
    

    return (
        <div className="wrapper">
            <div className="logo">
                <img src="https://solvex.com.do/media/bp4gyluf/1280px-react-icon-svg.png" alt=""/>
            </div>
            <div className="text-center mt-4 name">
                Inicio de Sesión
            </div>

            <form 
                onSubmit={ handleSubmit( onSubmit ) }
                className="p-3 mt-3 "
            >
                <div className="form-field d-flex align-items-center">
                    <span className="far fa-user"></span>
                    <input type="text" name="email" id="email" placeholder="Email"
                        { ...register( 'email', validateEmail( 30 ) ) } 
                    />
                </div>
                    { errors.email &&  <small className="text-danger">{ errors.email?.message }</small> }

                <div className="form-field d-flex align-items-center">
                    <span className="fas fa-key"></span>
                    <input type="password" name="password" id="password" placeholder="Password"
                        { ...register( 'password', validatePassword( 8, 30 ) ) } 
                    />
                </div>
                    { errors.password &&  <small className="text-danger">{ errors.password?.message }</small> }

                <button className="btn mt-3">Login</button>
            </form>

            <div className="text-center fs-6">
                Si olvido su contraseña contacte al Administrador <a href="https://www.facebook.com/albertbrandon.cristianoflores" target="_blank">Aquí</a>
            </div>
        </div>
    )


}