import { useEffect } from 'react';
import { Button, Form, FormGroup, InputGroup, InputGroupText, Input} from 'reactstrap';
import { useAuthStore } from '../../../hooks';
import { useForm } from 'react-hook-form';
import { messageAlert, validateEmail, validatePassword } from '../../../helpers';
import './login.css';

export const LoginPage = () => {
    const { startLogin, errorMessage } = useAuthStore();
    const { register, formState: { errors }, handleSubmit } = useForm();

    const { ref: email, ...emailRest } = register('email', validateEmail( 30 ));
    const { ref: password, ...passwordRest } = register('password', validatePassword( 8, 30 ));

    const onSubmit = async ( data ) => {
        startLogin(data);
    }

    useEffect(() => {
        if ( errorMessage !== undefined )
            messageAlert('Error en la autenticación', errorMessage, 'error');
    }, [ errorMessage ])

    return (
        <div className="wrapper">
            <div className="logo">
                <img src="https://solvex.com.do/media/bp4gyluf/1280px-react-icon-svg.png" alt=""/>
            </div>
            <div className="text-center mt-4 name">
                Inicio de Sesión
            </div>
            <Form onSubmit={ handleSubmit( onSubmit ) } className="p-3 mt-3 ">
                <FormGroup floating>
                    <InputGroup>
                        <InputGroupText htmlFor="email"><i className="fas fa-regular fa-at"></i></InputGroupText>
                        <Input type="text" name="email" id="email" placeholder="Email"
                            innerRef={ email } { ...emailRest }
                        />
                    </InputGroup>
                    { errors.email &&  <small className="text-danger">{ errors.email?.message }</small> }
                </FormGroup>
                <FormGroup>
                    <InputGroup>
                        <InputGroupText htmlFor="email"><i className="fas fa-key"></i></InputGroupText>
                        <Input type="password" name="password" id="password" placeholder="Password"
                            innerRef={ password } { ...passwordRest } 
                        />
                    </InputGroup>
                    { errors.password &&  <small className="text-danger">{ errors.password?.message }</small> }
                </FormGroup>
                <Button type="submit" className="mt-3">Login</Button>
            </Form>
            <div className="text-center fs-6">
                Si olvido su contraseña contacte al Administrador <a href="https://www.facebook.com/albertbrandon.cristianoflores" target="_blank">Aquí</a>
            </div>
        </div>
    )
}