import { Component, useState } from 'react'
import { Container, Nav, Navbar, NavDropdown, Button, Form, InputGroup, Dropdown, Table, Modal, Spinner } from 'react-bootstrap'
import webName from '../../assets/website name.jpg'
import ClockComponent from '../../components/ClockComponent'
import AdminSidebar from '../../components/Admin/AdminSidebar'
import AdminNavbar from '../../components/Admin/AdminNavbar'
import axios from 'axios'
import { FaSearch, FaLock, FaUnlockAlt, FaBook, FaUserPlus, FaEye, FaEyeSlash } from 'react-icons/fa'

class CreateModalLibrarian extends Component {

    constructor() {
        super();
        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.togglePasswordVisibility = this.togglePasswordVisibility.bind(this);
        this.toggleRePasswordVisibility = this.toggleRePasswordVisibility.bind(this);
        this.toRegisterUser = this.toRegisterUser.bind(this);
        this.state = {
            show: false,
            loading: false,

            newFirstName: "",
            newLastName: "",
            newEmail: "",
            newPassword: "",
            rePassword: ""
        }
    }

    componentDidMount() {

    }
    componentWillUnmount() {

    }

    handleClose() {
        this.setState({ show: false });
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

    toRegisterUser = (e) => {
        event.preventDefault();

        const email = this.state.newEmail + "@gmail.com"

        if (this.state.newPassword === this.state.rePassword) {
            console.log(this.state.newFirstName + this.state.newLastName + email + this.state.newPassword)

            const data = {
                image: "#%&{}>",
                firstname: this.state.newFirstName,
                lastname: this.state.newLastName,
                email: email,
                password: this.state.newPassword,
                role: "librarian"
            }

            console.log(data);

            const apiLink = [
                `https://suico-it3202-sqa-finalproject-backend.onrender.com/api/users/register-user`,
                `http://localhost:3306/api/users/register-user`
            ]

            axios.post(
                apiLink[0], data
            ).then(
                (response) => {
                    console.log("Server Response", response.data);

                    window.location.reload();
                }
            ).catch(
                (error) => {
                    console.log(error);
                }
            );
        }
    }

    render() {
        return (
            <div>
                <Button variant="success" onClick={this.handleShow}>
                    <FaUserPlus /> Create New Librarian
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose} size='lg' aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title><FaUserPlus /> Create New Librarian</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

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
                                    placeholder="Enter Password"
                                    type={this.state.reshowPassword ? "text" : "password"}
                                    value={this.state.rePassword}
                                    onChange={(e) => { this.setState({ rePassword: e.target.value }) }}
                                />
                                <InputGroup.Text style={{ backgroundColor: "lightgray" }} onClick={this.toggleRePasswordVisibility}>{this.state.reshowPassword ? <FaEyeSlash style={{ cursor: "pointer" }} /> : <FaEye style={{ cursor: "pointer" }} />}</InputGroup.Text>
                            </InputGroup><br />
                            <Button variant="primary" onClick={this.toRegisterUser} type='submit'>Register Account</Button>
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

export default CreateModalLibrarian
