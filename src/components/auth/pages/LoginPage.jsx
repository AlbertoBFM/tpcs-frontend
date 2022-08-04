import React from 'react';
import './login.css';

export const LoginPage = () => {
    return (
        <section className="vh-100">
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-md-9 col-lg-6 col-xl-5">
                    <img 
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                        className="img-fluid" 
                        alt="Sample image" 
                    />
                </div>
                <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                    <form>
                    <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                        <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                        <button type="button" className="btn btn-dark btn-floating mx-1">
                        <i className="fab fa-facebook-f"></i>
                        </button>

                        <button type="button" className="btn btn-dark btn-floating mx-1">
                        <i className="fab fa-twitter"></i>
                        </button>

                        <button type="button" className="btn btn-dark btn-floating mx-1">
                        <i className="fab fa-linkedin-in"></i>
                        </button>
                    </div>

                    <div className="divider d-flex align-items-center my-4">
                        <p className="text-center fw-bold mx-3 mb-0">Or</p>
                    </div>

                    {/* <!-- Email input --> */}
                    <div className="form-floating mb-4">
                        <input type="email" id="form3Example3" className="form-control form-control-lg"
                        placeholder="Enter a valid email address" />
                        <label className="form-label" htmlFor="form3Example3">Email address</label>
                    </div>

                    {/* <!-- Password input --> */}
                    <div className="form-floating mb-3">
                        <input type="password" id="form3Example4" className="form-control form-control-lg"
                        placeholder="Enter password" />
                        <label className="form-label" htmlFor="form3Example4">Password</label>
                    </div>

                    <div className="text-center text-lg-start mt-4 pt-2">
                        <button 
                            type="button" 
                            className="btn btn-dark btn-lg w-100"
                            style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem", }}
                        >
                                Login
                        </button>
                        <p className="small fw-bold mt-2 pt-1 mb-0">¿Olvidó su cuenta o contraseña? <a href="#!"
                            className="link-danger"> Consulte con el Administrador</a></p>
                    </div>

                    </form>
                </div>
                </div>
            </div>
            <div
                className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-dark">
                {/* <!-- Copyright --> */}
                <div className="text-white mb-3 mb-md-0">
                Copyright © 2020. All rights reserved.
                </div>
                {/* <!-- Copyright --> */}

                {/* <!-- Right --> */}
                <div>
                <a href="#!" className="text-white me-4">
                    <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#!" className="text-white me-4">
                    <i className="fab fa-twitter"></i>
                </a>
                <a href="#!" className="text-white me-4">
                    <i className="fab fa-google"></i>
                </a>
                <a href="#!" className="text-white">
                    <i className="fab fa-linkedin-in"></i>
                </a>
                </div>
                {/* <!-- Right --> */}
            </div>
        </section>
    )
}