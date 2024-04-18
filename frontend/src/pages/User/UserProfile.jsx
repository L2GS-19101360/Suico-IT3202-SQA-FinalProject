import { Component, useState } from 'react'
import { Container, Nav, Navbar, NavDropdown, Button, Form, InputGroup } from 'react-bootstrap'
import webName from '../../assets/website name.jpg'
import ClockComponent from '../../components/ClockComponent'
import UserSidebar from '../../components/User/UserSidebar'
import UserNavbar from '../../components/User/UserNavbar'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

class UserProfile extends Component {

    constructor() {
        super();
        this.togglePasswordVisibility = this.togglePasswordVisibility.bind(this);
        this.toggleRePasswordVisibility = this.toggleRePasswordVisibility.bind(this);
        this.state = {
            LAfirstname: localStorage.getItem('firstname'),
            LAlastname: localStorage.getItem('lastname'),

            showPassword: false,
            reshowPassword: false,

            currFirstname: localStorage.getItem('firstname'),
            currLastname: localStorage.getItem('lastname'),
            currEmail: localStorage.getItem('email').replace(/@gmail\.com$/, ""),
            currPassword: localStorage.getItem('password'),
            confirmPassword: localStorage.getItem('password')
        }
    }

    componentDidMount() {

    }
    componentWillUnmount() {

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
        const profileImage = [
            `https://ui-avatars.com/api/?name=${this.state.LAfirstname}+${this.state.LAlastname}&background=random&size=75`,
            `https://ui-avatars.com/api/?name=${this.state.LAfirstname}+${this.state.LAlastname}&background=random&size=128`,
        ]

        return (
            <div>
                <UserNavbar />
                <div>
                    <h1>User Profile</h1>
                    <div style={{
                        backgroundColor: "white",
                        height: "60%",
                        width: "40%",
                        padding: "3%",
                        textAlign: "center",
                        margin: "auto"
                    }}>
                        <img src={profileImage[1]} alt="" /><br /><br />
                        <Form>
                            <div style={{ alignItems: "center", display: "inline-flex", width: "100%", marginBottom: "20px" }}>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter First Name"
                                    value={this.state.currFirstname}
                                    onChange={(e) => { this.setState({ currFirstname: e.target.value }) }} /> &nbsp;&nbsp;
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Last Name"
                                    value={this.state.currLastname}
                                    onChange={(e) => { this.setState({ currLastname: e.target.value }) }} />
                            </div>

                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="Enter Email"
                                    type='text'
                                    value={this.state.currEmail}
                                    onChange={(e) => { this.setState({ currEmail: e.target.value }) }}
                                />
                                <InputGroup.Text id="basic-addon2">@gmail.com</InputGroup.Text>
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="Enter Password"
                                    type={this.state.showPassword ? "text" : "password"}
                                    value={this.state.currPassword}
                                    onChange={(e) => { this.setState({ currPassword: e.target.value }) }}
                                />
                                <InputGroup.Text style={{ backgroundColor: "lightgray" }} onClick={this.togglePasswordVisibility}>{this.state.showPassword ? <FaEyeSlash style={{ cursor: "pointer" }} /> : <FaEye style={{ cursor: "pointer" }} />}</InputGroup.Text>
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="Enter Password"
                                    type={this.state.reshowPassword ? "text" : "password"}
                                    value={this.state.confirmPassword}
                                    onChange={(e) => { this.setState({ confirmPassword: e.target.value }) }}
                                />
                                <InputGroup.Text style={{ backgroundColor: "lightgray" }} onClick={this.toggleRePasswordVisibility}>{this.state.reshowPassword ? <FaEyeSlash style={{ cursor: "pointer" }} /> : <FaEye style={{ cursor: "pointer" }} />}</InputGroup.Text>
                            </InputGroup><br />

                            <Button variant="warning">Update Profile</Button>

                        </Form>
                    </div>
                </div>
            </div>
        );
    }

}

export default UserProfile
