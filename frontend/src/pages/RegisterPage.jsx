import { Component, useState } from 'react'
import { Container, Nav, Navbar, NavDropdown, Button, Form, InputGroup } from 'react-bootstrap'
import webName from '../assets/website name.jpg'
import ClockComponent from '../components/ClockComponent'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

class RegisterPage extends Component {

    constructor() {
        super();
        this.toLoginPage = this.toLoginPage.bind(this);
        this.togglePasswordVisibility = this.togglePasswordVisibility.bind(this);
        this.toggleRePasswordVisibility = this.toggleRePasswordVisibility.bind(this);
        this.state = {
            showPassword: false,
            reshowPassword: false,
        }
    }

    componentDidMount() {

    }
    componentWillUnmount() {

    }

    toLoginPage() {
        this.props.history.push('LoginPage');
    }

    togglePasswordVisibility() {
        this.setState(prevState => ({
            showPassword: !prevState.showPassword
        }));
    }
    toggleRePasswordVisibility() {
        this.setState(prevState => ({
            reshowPassword: !prevState.reshowPassword
        }));
    }

    render() {
        return (
            <div>
                <Navbar expand="lg" className="bg-body-tertiary">
                    <Container>
                        <Navbar.Brand href="/">
                            <img src={webName} alt="" height={75} width={75} /> &nbsp; L2GS Library System
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
                            <Nav>

                            </Nav>
                            <Nav>
                                <ClockComponent />
                            </Nav>
                            <Nav>
                                <Nav.Item>
                                    <Nav.Link><Button variant="secondary" onClick={this.toLoginPage}>Login Account</Button></Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link><Button variant="primary" disabled>Register Account</Button></Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <div>
                    <h1>Register Page</h1>
                </div>

                <div style={{
                    backgroundColor: "white",
                    height: "50%",
                    width: "40%",
                    padding: "3%",
                    textAlign: "center",
                    margin: "auto"
                }}>
                    <Form>
                        <div style={{ alignItems: "center", display: "inline-flex", width: "100%", marginBottom: "20px" }}>
                            <Form.Control type="text" placeholder="Enter First Name" /> &nbsp;&nbsp;
                            <Form.Control type="text" placeholder="Enter Last Name" />
                        </div>

                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder="Enter Email"
                                type='text'
                            />
                            <InputGroup.Text id="basic-addon2">@gmail.com</InputGroup.Text>
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder="Enter Password"
                                type={this.state.showPassword ? "text" : "password"}
                            />
                            <InputGroup.Text style={{ backgroundColor: "lightgray" }} onClick={this.togglePasswordVisibility}>{this.state.showPassword ? <FaEyeSlash style={{ cursor: "pointer" }} /> : <FaEye style={{ cursor: "pointer" }} />}</InputGroup.Text>
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder="Enter Password"
                                type={this.state.reshowPassword ? "text" : "password"}
                            />
                            <InputGroup.Text style={{ backgroundColor: "lightgray" }} onClick={this.toggleRePasswordVisibility}>{this.state.reshowPassword ? <FaEyeSlash style={{ cursor: "pointer" }} /> : <FaEye style={{ cursor: "pointer" }} />}</InputGroup.Text>
                        </InputGroup><br />
                        <Button variant="primary">Register Account</Button>
                    </Form>
                </div>

            </div>
        );
    }

}

export default RegisterPage
