import { Component, useState } from 'react'
import { Navbar, Container, Nav, Button, NavDropdown, Form, Offcanvas, OffcanvasBody } from 'react-bootstrap'
import webName from '../../assets/website name.jpg'
import ClockComponent from '../../components/ClockComponent'
import axios from 'axios'
import { withRouter, Link } from 'react-router-dom'

class AdminSidebar extends Component {

    constructor() {
        super();
        this.toLogoutUser = this.toLogoutUser.bind(this);
        this.state = {
            LAfirstname: localStorage.getItem("firstname"),
            LAlastname: localStorage.getItem("lastname"),
            getAccessToken: localStorage.getItem("accessToken"),
            getRefreshToken: localStorage.getItem("refreshToken"),

            show: false,
        }
    }

    componentDidMount() {

    }
    componentWillUnmount() {

    }

    handleClose = () => {
        this.setState({ show: false });
    }
    handleShow = () => {
        this.setState({ show: true });
    }

    toLogoutUser () {
        console.log(this.state.getAccessToken + this.state.getRefreshToken);

        const tokens = {
            accessToken: this.state.getAccessToken,
            refreshToken: this.state.getRefreshToken
        }

        const apiLink = [
            'https://suico-it3202-sqa-finalproject-backend.onrender.com/api/users/logout-user',
            'http://localhost:3306/api/users/logout-user'
        ]

        axios.post(
            apiLink[0], tokens
        ).then(
            (response) => {
                console.log(response.data);

                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('firstname');
                localStorage.removeItem('lastname');
                localStorage.removeItem('role')

                this.props.history.push('/');
            }
        ).catch(
            (error) => {
                console.log(error);
            }
        )
    }

    render() {
        const profileImage = [
            `https://ui-avatars.com/api/?name=${this.state.LAfirstname}+${this.state.LAlastname}&background=random&size=75`,
            `https://ui-avatars.com/api/?name=${this.state.LAfirstname}+${this.state.LAlastname}&background=random&size=128`,
        ]

        return (
            <div>
                <img src={profileImage[0]} alt="" onClick={this.handleShow} style={{ cursor: "pointer" }} />

                <Offcanvas show={this.state.show} onHide={this.handleClose} placement="end">
                    <Offcanvas.Header>
                        <div>
                            <ClockComponent />
                            <h3>Admin Sidebar Menu</h3>
                        </div>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <div>
                            <img src={profileImage[1]} alt="" onClick={this.handleShow} /><br />
                            <h5>{this.state.LAfirstname} {this.state.LAlastname}</h5><br /><br />
                            <ul style={{ listStyle: "none" }}>
                                <li><Link style={{ textDecoration: "none", color: "black" }} to='/AdminDashboard'>Admin Dashboard</Link></li>
                                <li><Link style={{ textDecoration: "none", color: "black" }} to='/AdminProfile'>Admin Profile</Link></li>
                            </ul><br /><br />
                            <Button variant="danger" onClick={this.toLogoutUser}>Logout Account</Button>
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
        );
    }

}

export default withRouter(AdminSidebar);
