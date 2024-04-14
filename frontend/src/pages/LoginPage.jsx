import { Component, useState } from 'react'
import { Container, Nav, Navbar, NavDropdown, Button, Form, InputGroup } from 'react-bootstrap'
import webName from '../assets/website name.jpg'
import ClockComponent from '../components/ClockComponent'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

class LoginPage extends Component {

    constructor() {
        super();
        this.toRegisterPage = this.toRegisterPage.bind(this);
        this.togglePasswordVisibility = this.togglePasswordVisibility.bind(this);
        this.toLoginUser = this.toLoginUser.bind(this);
        this.state = {
            showPassword: false,

            enterEmail: "",
            enterPassword: ""
        }
    }

    componentDidMount() {

    }
    componentWillUnmount() {

    }

    toRegisterPage() {
        this.props.history.push('RegisterPage');
    }

    togglePasswordVisibility() {
        this.setState(prevState => ({
            showPassword: !prevState.showPassword
        }));
    }

    toLoginUser = (e) => {
        event.preventDefault();

        console.log(this.state.enterEmail + this.state.enterPassword);
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
                                    <Nav.Link><Button variant="secondary" disabled>Login Account</Button></Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link><Button variant="primary" onClick={this.toRegisterPage}>Register Account</Button></Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <div>
                    <h1>Login Page</h1>
                </div>

                <div style={{
                    backgroundColor: "white",
                    height: "60%",
                    width: "40%",
                    padding: "3%",
                    textAlign: "center",
                    margin: "auto"
                }}>
                    <Form>
                        <Form.Control
                            type="email"
                            placeholder="Enter Email"
                            value={this.state.enterEmail}
                            onChange={(e) => { this.setState({ enterEmail: e.target.value }) }} /><br />
                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder="Enter Password"
                                type={this.state.showPassword ? "text" : "password"}
                                value={this.state.enterPassword}
                                onChange={(e) => { this.setState({ enterPassword: e.target.value }) }}
                            />
                            <InputGroup.Text style={{ backgroundColor: "lightgray" }} onClick={this.togglePasswordVisibility}>{this.state.showPassword ? <FaEyeSlash style={{ cursor: "pointer" }} /> : <FaEye style={{ cursor: "pointer" }} />}</InputGroup.Text>
                        </InputGroup><br />
                        <Button variant="secondary" onClick={this.toLoginUser} type='submit'>Login Account</Button>
                    </Form>
                </div>

            </div>
        );
    }

}

export default LoginPage
