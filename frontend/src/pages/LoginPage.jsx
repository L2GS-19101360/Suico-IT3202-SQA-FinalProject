import { Component } from 'react'
import { Container, Nav, Navbar, NavDropdown, Button, Form, InputGroup, Alert, Spinner } from 'react-bootstrap'
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
            enterPassword: "",
            showAlert: false,
            alertMessage: "",
            alertVariant: "",
            isLoading: false // State to track loading state
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
        e.preventDefault();

        // Check if email and password are not empty
        if (!this.state.enterEmail || !this.state.enterPassword) {
            this.setState({
                showAlert: true,
                alertMessage: "Please fill in all input fields.",
                alertVariant: "danger"
            });
            return; // Stop further execution
        }

        // Set loading state to true
        this.setState({ isLoading: true });

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

                if (response.data.tokens.user.active_status === 1) {
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
                let alertMessage = "An error occurred. Please try again.";
                let alertVariant = "danger";
                if (!error.response) {
                    alertMessage = "Unable to connect to the server. Please check your connection.";
                } else if (error.response.status === 401) {
                    alertMessage = "Invalid email or password. Please try again.";
                } else if (error.response.status === 404) {
                    alertMessage = "User does not exist. Please register.";
                } else {
                    alertMessage = "An unexpected error occurred. Please try again later.";
                }
                this.setState({ showAlert: true, alertMessage, alertVariant });
                console.log(error);
            }
        ).finally(() => {
            // Set loading state to false after API call is completed
            this.setState({ isLoading: false });
        });
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
                    {this.state.showAlert && (
                        <Alert variant={this.state.alertVariant} onClose={() => this.setState({ showAlert: false })} dismissible>
                            {this.state.alertMessage}
                        </Alert>
                    )}
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
                            <InputGroup.Text style={{ backgroundColor: "lightgray" }} onClick={this.togglePasswordVisibility}>
                                {this.state.showPassword ? <FaEyeSlash style={{ cursor: "pointer" }} /> : <FaEye style={{ cursor: "pointer" }} />}
                            </InputGroup.Text>
                        </InputGroup><br />
                        <Button variant="secondary" onClick={this.toLoginUser} type='submit' disabled={this.state.isLoading}>
                            {this.state.isLoading ? <Spinner animation="border" size="sm" /> : "Login Account"}
                        </Button>
                    </Form>
                </div>

            </div>
        );
    }

}

export default LoginPage
