import { Component, useState } from 'react'
import { Container, Nav, Navbar, NavDropdown, Button, Form, InputGroup } from 'react-bootstrap'
import webName from '../assets/website name.jpg'
import ClockComponent from '../components/ClockComponent'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import axios from 'axios'
import GeneralNavbar from '../components/GeneralNavbar'

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

        const data = {
            email: this.state.enterEmail,
            password: this.state.enterPassword
        }

        const apiLink = [
            'https://suico-it3202-sqa-finalproject-backend.onrender.com/api/users/login-user',
            'http://localhost:3306/api/users/login-user'
        ]

        axios.post(
            apiLink[0], data
        ).then(
            (response) => {
                console.log(response.data.tokens.user);

                localStorage.setItem('accessToken', response.data.tokens.accessToken);
                localStorage.setItem('refreshToken', response.data.tokens.refreshToken);

                localStorage.setItem('userId', response.data.tokens.user.id);
                localStorage.setItem('userImage', response.data.tokens.user.image);
                localStorage.setItem('firstname', response.data.tokens.user.firstname);
                localStorage.setItem('lastname', response.data.tokens.user.lastname);
                localStorage.setItem('email', response.data.tokens.user.email);
                localStorage.setItem('password', this.state.enterPassword);
                localStorage.setItem('role', response.data.tokens.user.role)

                if (response.data.tokens.user.active_status == 1) {
                    if (response.data.tokens.user.role === "user") {
                        this.props.history.push('/UserDashboard');
                    } else if (response.data.tokens.user.role === "librarian") {
                        this.props.history.push('/LibrarianDashboard');
                    } else {
                        this.props.history.push('/AdminDashboard');
                    }
                } else {
                    console.log("User Deactivate")
                }
            }
        ).catch(
            (error) => {
                console.log(error);
            }
        )
    }

    render() {
        return (
            <div>
                <GeneralNavbar />
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
