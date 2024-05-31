import { Component } from 'react'
import { Navbar, Container, Nav, Button, NavDropdown, Form, Offcanvas, OffcanvasBody, Spinner } from 'react-bootstrap'
import webName from '../../assets/website name.jpg'
import ClockComponent from '../../components/ClockComponent'
import axios from 'axios'
import { withRouter, Link } from 'react-router-dom'
import LibrarianBorrowBooks from '../../pages/Librarian/LibrarianBorrowBooks'
import LibrarianReturnBooks from '../../pages/Librarian/LibrarianReturnBooks'

class LibrarianSidebar extends Component {

    constructor() {
        super();
        this.toLogoutUser = this.toLogoutUser.bind(this);
        this.state = {
            LAfirstname: localStorage.getItem("firstname"),
            LAlastname: localStorage.getItem("lastname"),
            getAccessToken: localStorage.getItem("accessToken"),
            getRefreshToken: localStorage.getItem("refreshToken"),
            imageFileName: localStorage.getItem('userImage'),

            show: false,
            loading: false, // New state variable for loading
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

    toLogoutUser() {
        this.setState({ loading: true }); // Set loading to true when logout starts
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
                localStorage.removeItem('userId');
                localStorage.removeItem('userImage');
                localStorage.removeItem('userImage_filename');
                localStorage.removeItem('firstname');
                localStorage.removeItem('lastname');
                localStorage.removeItem('role');
                localStorage.removeItem('email');
                localStorage.removeItem('password');

                this.props.history.push('/');
            }
        ).catch(
            (error) => {
                console.log(error);
            }
        ).finally(() => {
            this.setState({ loading: false }); // Set loading to false when logout completes
        });
    }

    render() {
        const profileImage = [
            `https://ui-avatars.com/api/?name=${this.state.LAfirstname}+${this.state.LAlastname}&background=random&size=75`,
            `https://ui-avatars.com/api/?name=${this.state.LAfirstname}+${this.state.LAlastname}&background=random&size=128`,
        ]

        return (
            <div>
                {this.state.imageFileName === "#%&{}>" ?
                    <img src={profileImage[0]} alt="" onClick={this.handleShow} style={{ cursor: "pointer" }} /> :
                    <img src={this.state.imageFileName} height={75} width={75} alt="" onClick={this.handleShow} style={{ cursor: "pointer" }} />
                }

                <Offcanvas show={this.state.show} onHide={this.handleClose} placement="end">
                    <Offcanvas.Header>
                        <div>
                            <ClockComponent />
                            <h3>Librarian Sidebar Menu</h3>
                        </div>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <div>
                            {this.state.imageFileName === "#%&{}>" ?
                                <img src={profileImage[1]} alt="" onClick={this.handleShow} /> :
                                <img src={this.state.imageFileName} height={128} width={128} alt="" onClick={this.handleShow} />
                            }<br />
                            <h5>{this.state.LAfirstname} {this.state.LAlastname}</h5><br /><br />
                            <ul style={{ listStyle: "none" }}>
                                <li><Link style={{ textDecoration: "none", color: "black" }} to='/LibrarianDashboard'>Librarian Dashboard</Link></li>
                                <li><Link style={{ textDecoration: "none", color: "black" }} to='/LibrarianBorrowBooks'>Borrow Books Requests</Link></li>
                                <li><Link style={{ textDecoration: "none", color: "black" }} to='/LibrarianReturnBooks'>Return Books Requests</Link></li>
                                <li><Link style={{ textDecoration: "none", color: "black" }} to='/LibrarianProfile'>Librarian Profile</Link></li>
                            </ul><br /><br />
                            <Button variant="danger" onClick={this.toLogoutUser} disabled={this.state.loading}>
                                {this.state.loading ? (
                                    <>
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />{' '}
                                    </>
                                ) : (
                                    "Logout Account"
                                )}
                            </Button>
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>
            </div>
        );
    }

}

export default withRouter(LibrarianSidebar);
