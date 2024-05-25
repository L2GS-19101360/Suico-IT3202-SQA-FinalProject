import { Component } from 'react';
import { Container, Nav, Navbar, NavDropdown, Button, Form, InputGroup, Alert, Spinner } from 'react-bootstrap';
import webName from '../assets/website name.jpg';
import ClockComponent from '../components/ClockComponent';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import GeneralNavbar from '../components/GeneralNavbar';

class RegisterPage extends Component {

    constructor() {
        super();
        this.toLoginPage = this.toLoginPage.bind(this);
        this.togglePasswordVisibility = this.togglePasswordVisibility.bind(this);
        this.toggleRePasswordVisibility = this.toggleRePasswordVisibility.bind(this);
        this.toRegisterUser = this.toRegisterUser.bind(this);
        this.state = {
            showPassword: false,
            reshowPassword: false,
            newFirstName: "",
            newLastName: "",
            newEmail: "",
            newPassword: "",
            rePassword: "",
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

    toRegisterUser = (e) => {
        e.preventDefault();

        const { newFirstName, newLastName, newEmail, newPassword, rePassword } = this.state;

        // Check if any input field is empty
        if (!newFirstName || !newLastName || !newEmail || !newPassword || !rePassword) {
            this.setState({
                showAlert: true,
                alertMessage: "Please fill in all input fields.",
                alertVariant: "danger"
            });
            return;
        }

        // Check if passwords match
        if (newPassword !== rePassword) {
            this.setState({
                showAlert: true,
                alertMessage: "Passwords do not match.",
                alertVariant: "danger"
            });
            return;
        }

        // Set loading state to true
        this.setState({ isLoading: true });

        const email = newEmail + "@gmail.com";

        console.log(newFirstName + newLastName + email + newPassword);

        const data = {
            image: "#%&{}>",
            firstname: newFirstName,
            lastname: newLastName,
            email: email,
            password: newPassword,
            role: "user"
        };

        const apiLink = [
            `https://suico-it3202-sqa-finalproject-backend.onrender.com/api/users/register-user`,
            `http://localhost:3306/api/users/register-user`
        ];

        axios.post(apiLink[0], data).then((response) => {
            console.log("Server Response", response.data);
            if (response.data && response.data.data) {
                const { accessToken, refreshToken, insertId } = response.data.data;
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                localStorage.setItem('userId', insertId);
                localStorage.setItem('userImage', data.image);
                localStorage.setItem('firstname', newFirstName);
                localStorage.setItem('lastname', newLastName);
                localStorage.setItem('email', data.email);
                localStorage.setItem('password', data.password);
                localStorage.setItem('role', data.role);

                this.props.history.push('/UserDashboard');
            }
        }).catch((error) => {
            let alertMessage = "An error occurred. Please try again.";
            let alertVariant = "danger";
            if (!error.response) {
                alertMessage = "Unable to connect to the server. Please check your connection.";
            } else {
                alertMessage = "An unexpected error occurred. Please try again later.";
            }
            this.setState({ showAlert: true, alertMessage, alertVariant });
            console.log(error);
        }).finally(() => {
            // Set loading state to false after API call is completed
            this.setState({ isLoading: false });
        });
    }

    render() {
        return (
            <div>
                <GeneralNavbar />
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
                    {this.state.showAlert && (
                        <Alert variant={this.state.alertVariant} onClose={() => this.setState({ showAlert: false })} dismissible>
                            {this.state.alertMessage}
                        </Alert>
                    )}
                    <Form>
                        <div style={{ alignItems: "center", display: "inline-flex", width: "100%", marginBottom: "20px" }}>
                            <Form.Control
                                type="text"
                                placeholder="Enter First Name"
                                value={this.state.newFirstName}
                                onChange={(e) => { this.setState({ newFirstName: e.target.value }) }} /> &nbsp;&nbsp;
                            <Form.Control
                                type="text"
                                placeholder="Enter Last Name"
                                value={this.state.newLastName}
                                onChange={(e) => { this.setState({ newLastName: e.target.value }) }} />
                        </div>

                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder="Enter Email"
                                type='text'
                                value={this.state.newEmail}
                                onChange={(e) => { this.setState({ newEmail: e.target.value }) }}
                            />
                            <InputGroup.Text id="basic-addon2">@gmail.com</InputGroup.Text>
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder="Enter Password"
                                type={this.state.showPassword ? "text" : "password"}
                                value={this.state.newPassword}
                                onChange={(e) => { this.setState({ newPassword: e.target.value }) }}
                            />
                            <InputGroup.Text style={{ backgroundColor: "lightgray" }} onClick={this.togglePasswordVisibility}>{this.state.showPassword ? <FaEyeSlash style={{ cursor: "pointer" }} /> : <FaEye style={{ cursor: "pointer" }} />}</InputGroup.Text>
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder="Confirm Password"
                                type={this.state.reshowPassword ? "text" : "password"}
                                value={this.state.rePassword}
                                onChange={(e) => { this.setState({ rePassword: e.target.value }) }}
                            />
                            <InputGroup.Text style={{ backgroundColor: "lightgray" }} onClick={this.toggleRePasswordVisibility}>{this.state.reshowPassword ? <FaEyeSlash style={{ cursor: "pointer" }} /> : <FaEye style={{ cursor: "pointer" }} />}</InputGroup.Text>
                        </InputGroup><br />
                        <Button variant="primary" onClick={this.toRegisterUser} type='submit' disabled={this.state.isLoading}>
                            {this.state.isLoading ? <Spinner animation="border" size="sm" /> : "Register Account"}
                        </Button>
                    </Form>
                </div>

            </div>
        );
    }

}

export default RegisterPage
