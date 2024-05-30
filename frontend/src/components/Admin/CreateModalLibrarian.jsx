import { Component, useState } from 'react';
import { Container, Nav, Navbar, NavDropdown, Button, Form, InputGroup, Dropdown, Table, Modal, Spinner, Alert } from 'react-bootstrap';
import webName from '../../assets/website name.jpg';
import ClockComponent from '../../components/ClockComponent';
import AdminSidebar from '../../components/Admin/AdminSidebar';
import AdminNavbar from '../../components/Admin/AdminNavbar';
import axios from 'axios';
import { FaSearch, FaLock, FaUnlockAlt, FaBook, FaUserPlus, FaEye, FaEyeSlash } from 'react-icons/fa';

class CreateModalLibrarian extends Component {

    constructor() {
        super();
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.togglePasswordVisibility = this.togglePasswordVisibility.bind(this);
        this.toggleRePasswordVisibility = this.toggleRePasswordVisibility.bind(this);
        this.toRegisterUser = this.toRegisterUser.bind(this);
        this.state = {
            show: false,
            loading: false,
            showAlert: false,
            alertMessage: "",
            alertVariant: "danger",

            newFirstName: "",
            newLastName: "",
            newEmail: "",
            newPassword: "",
            rePassword: "",
            showPassword: false,
            reshowPassword: false
        };
    }

    handleClose() {
        this.setState({ show: false, showAlert: false });
    }

    handleShow() {
        this.setState({ show: true });
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

    validateInputs() {
        const { newFirstName, newLastName, newEmail, newPassword, rePassword } = this.state;
        if (!newFirstName || !newLastName || !newEmail || !newPassword || !rePassword) {
            this.setState({
                showAlert: true,
                alertMessage: "All fields are required.",
                alertVariant: "danger"
            });
            return false;
        }
        if (newPassword !== rePassword) {
            this.setState({
                showAlert: true,
                alertMessage: "Passwords do not match.",
                alertVariant: "danger"
            });
            return false;
        }
        return true;
    }

    toRegisterUser(event) {
        event.preventDefault();

        if (!this.validateInputs()) {
            return;
        }

        this.setState({ loading: true, showAlert: false });

        const email = this.state.newEmail + "@gmail.com";

        const data = {
            image: "#%&{}>",
            image_filename: "#%&{}>",
            firstname: this.state.newFirstName,
            lastname: this.state.newLastName,
            email: email,
            password: this.state.newPassword,
            role: "librarian"
        };

        const apiLink = [
            `https://suico-it3202-sqa-finalproject-backend.onrender.com/api/users/register-user`,
            `http://localhost:3306/api/users/register-user`
        ];

        axios.post(apiLink[0], data)
            .then(response => {
                console.log("Server Response", response.data);
                window.location.reload();
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    showAlert: true,
                    alertMessage: "Failed to connect to the server.",
                    alertVariant: "danger"
                });
            })
            .finally(() => {
                this.setState({ loading: false });
            });
    }

    render() {
        const { show, loading, showAlert, alertMessage, alertVariant, showPassword, reshowPassword } = this.state;

        return (
            <div>
                <Button variant="success" onClick={this.handleShow}>
                    <FaUserPlus /> Create New Librarian
                </Button>

                <Modal show={show} onHide={this.handleClose} size='lg' aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title><FaUserPlus /> Create New Librarian</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        {showAlert && (
                            <Alert variant={alertVariant} onClose={() => this.setState({ showAlert: false })} dismissible>
                                {alertMessage}
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
                                    type={showPassword ? "text" : "password"}
                                    value={this.state.newPassword}
                                    onChange={(e) => { this.setState({ newPassword: e.target.value }) }}
                                />
                                <InputGroup.Text style={{ backgroundColor: "lightgray" }} onClick={this.togglePasswordVisibility}>{showPassword ? <FaEyeSlash style={{ cursor: "pointer" }} /> : <FaEye style={{ cursor: "pointer" }} />}</InputGroup.Text>
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="Re-Enter Password"
                                    type={reshowPassword ? "text" : "password"}
                                    value={this.state.rePassword}
                                    onChange={(e) => { this.setState({ rePassword: e.target.value }) }}
                                />
                                <InputGroup.Text style={{ backgroundColor: "lightgray" }} onClick={this.toggleRePasswordVisibility}>{reshowPassword ? <FaEyeSlash style={{ cursor: "pointer" }} /> : <FaEye style={{ cursor: "pointer" }} />}</InputGroup.Text>
                            </InputGroup>
                            <div style={{ textAlign: "center" }}>
                                <Button variant="success" onClick={this.toRegisterUser} type='submit' disabled={loading}>
                                    {loading ? <Spinner animation="border" size="sm" /> : "Register Account"}
                                </Button>
                            </div>
                        </Form>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default CreateModalLibrarian;
