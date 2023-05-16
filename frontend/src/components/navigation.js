import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet, Link } from "react-router-dom"
import React, { useState, useContext } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { AppContext } from '../App';
import axios from 'axios';

const LOGIN_URI = 'https://practica8sdbackend.onrender.com/api/login/';
export default function Navigation() {

    const { user, setUser } = useContext(AppContext);

    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false);
    const {showButtons, setShowButtons} = useState(true);
 
    const handleCloseLoginModal = () => setShowLoginModal(false);
    const handleCloseSignupModal = () => setShowSignupModal(false);

    const handleShowLoginModal = () => {
        if(!user){
        setShowLoginModal(true)
        console.log(user);
        }
    };
    const handleShowSignupModal = () => { if(!user){setShowSignupModal(true) }};

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(e.target.loginUsrName.value);
        console.log(e.target.loginPasswd.value);
        const loginForm = {
            password: e.target.loginPasswd.value,
            username: e.target.loginUsrName.value
        }
        console.log(loginForm)
        const res = await axios.post(LOGIN_URI, loginForm)
        console.log(res.data);
        setUser(res.data);
        handleCloseLoginModal();
        

    };
    const handleSignup = async (e) => {
        e.preventDefault();
        if(e.target.singPasswd.value !== e.target.singPasswd2.value){
            
        }else{
        const singForm = {
            password: e.target.singUsername.value,
            username: e.target.singPasswd.value
        }
        const res = await axios.post('https://practica8sdbackend.onrender.com/api/singup/',singForm);
        if(res) alert("Success")
        handleCloseSignupModal();
        }

        console.log('Registrarse');
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-light">
                <div className="container">
                    <Link className="navbar-brand text-dark" to="/" >Movie app</Link>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link text-dark" to="/">Movies list</Link>
                            </li>
                        </ul>
                        <div className='my-2 my-lg-0'>
                            <button className="btn btn-success" onClick={handleShowLoginModal}>Iniciar sesión</button>
                            <button  className="btn btn-primary" onClick={handleShowSignupModal}>Registrarse</button>
                        </div>
                    </div>
                </div>
            </nav>
            <section>
                <Outlet></Outlet>
            </section>

            <Modal show={showLoginModal} onHide={handleCloseLoginModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Iniciar sesión</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleLogin}>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Usuario</Form.Label>
                            <Form.Control name="loginUsrName" type="text" placeholder="Ingresa tu usuario" />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control name="loginPasswd" type="password" placeholder="Ingresa tu contraseña" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Iniciar sesión
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
            <Modal show={showSignupModal} onHide={handleCloseSignupModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Registrarse</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSignup}>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Usuario</Form.Label>
                            <Form.Control name="singUsername" type="text" placeholder="Ingresa tu usuario" />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control name="singPasswd" type="password" placeholder="Ingresa tu contraseña" />
                        </Form.Group>
                        <Form.Group controlId="confirmPasswd">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control name="singPasswd2" type="password" placeholder="Ingresa tu contraseña" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Registrarse
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )

}
