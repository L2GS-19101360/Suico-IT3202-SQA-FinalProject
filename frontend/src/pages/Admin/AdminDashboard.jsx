import { Component } from 'react';
import { Container, Nav, Navbar, NavDropdown, Button, Card, Row, Col } from 'react-bootstrap';
import webName from '../../assets/website name.jpg';
import ClockComponent from '../../components/ClockComponent';
import AdminSidebar from '../../components/Admin/AdminSidebar';
import AdminNavbar from '../../components/Admin/AdminNavbar';
import wallpaper from '../../assets/wallpaper.jpeg'; // Import the wallpaper image
import axios from 'axios';

class AdminDashboard extends Component {

    constructor() {
        super();
        this.state = {
            currFirstname: localStorage.getItem('firstname'),
            currLastname: localStorage.getItem('lastname'),

            users: [],
            userStatistics: {
                activeCount: 0,
                inactiveCount: 0
            },

            books: [],

            borrowBooksRequest: [],
            returnBooksRequest: [],
        }
    }

    componentDidMount() {
        this.getAllUsers();
        this.getAllBooks();
        this.getAllRecordedBorrowedBooks();
        this.getAllRecordedReturnedBooks();
    }
    componentWillUnmount() {

    }

    getAllRecordedReturnedBooks() {
        const apiLink = [
            `https://suico-it3202-sqa-finalproject-backend.onrender.com/api/users/get-recorded-returned-books`,
            `http://localhost:3306/api/users/get-recorded-returned-books`
        ];

        axios.get(apiLink[0])
            .then(response => {
                console.log("API Response:", response.data.data);
                this.setState({
                    returnBooksRequest: response.data.data,
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    getAllRecordedBorrowedBooks() {
        const apiLink = [
            `https://suico-it3202-sqa-finalproject-backend.onrender.com/api/users/get-recorded-borrowed-books`,
            `http://localhost:3306/api/users/get-recorded-borrowed-books`
        ];

        axios.get(apiLink[0])
            .then(response => {
                console.log("API Response:", response.data.data);
                this.setState({
                    borrowBooksRequest: response.data.data,
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    getAllBooks = () => {
        const apiLinks = [
            'https://suico-it3202-sqa-finalproject-backend.onrender.com/api/books/',
            'http://localhost:3306/api/books/',
        ];

        axios.get(apiLinks[0])
            .then(response => {
                this.setState({
                    books: response.data.data,
                }, () => {
                    console.log(this.state.books)
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    getAllUsers() {
        const apiLinks = [
            'https://suico-it3202-sqa-finalproject-backend.onrender.com/api/users/',
            'http://localhost:3306/api/users/'
        ];

        axios.get(apiLinks[0])
            .then(response => {
                this.setState({ users: response.data.data }, () => {
                    console.log(this.state.users)
                    this.calculateUserStatistics();
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    calculateUserStatistics() {
        const { users } = this.state;
        let updatedStatistics = {
            activeCount: 0,
            inactiveCount: 0
        };

        users.forEach(user => {
            if (user.active_status === 1) {
                updatedStatistics.activeCount++;
            } else if (user.active_status === 0) {
                updatedStatistics.inactiveCount++;
            }
        });

        this.setState({ userStatistics: updatedStatistics });
        // Update the userStatistics state with the updated statistics
        console.log(updatedStatistics);
    }

    render() {
        // Styles for the overlay and the content
        const styles = {
            container: {
                position: 'relative',
                height: '100vh',
                width: '100%',
                overflow: 'hidden',
            },
            overlay: {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `url(${wallpaper})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                opacity: 0.1, // Adjust the opacity as needed
                zIndex: -1, // Ensure the overlay is behind other content
            },
            content: {
                position: 'relative',
                zIndex: 1, // Ensure content is above the overlay
                padding: '20px',
            },
        };

        const { currFirstname, currLastname, userStatistics } = this.state

        return (
            <div style={styles.container}>
                <AdminNavbar />
                <div style={styles.overlay}></div>
                <div style={styles.content}>
                    <h1>Admin Dashboard</h1>
                    <Card className="mb-3">
                        <Card.Body>
                            <h2>Welcome, {currFirstname + " " + currLastname}</h2>
                            <p>Here is an overview of your library management system.</p>
                        </Card.Body>
                    </Card>
                    <Row>
                        <Col md={4}>
                            <Card className="mb-3">
                                <Card.Body>
                                    <Card.Title>Manage Users</Card.Title>
                                    <Button variant="primary" href="/ManageUsers">Go to Manage Users</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="mb-3">
                                <Card.Body>
                                    <Card.Title>Manage Books</Card.Title>
                                    <Button variant="primary" href="/ManageBooks">Go to Manage Books</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <Card className="mb-3">
                                <Card.Body>
                                    <Card.Title>Users Statistics</Card.Title>
                                    <p>Active Users: {userStatistics.activeCount}</p>
                                    <p>Inactive Users: {userStatistics.inactiveCount}</p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="mb-3">
                                <Card.Body>
                                    <Card.Title>Books Statistics</Card.Title>
                                    <p>Total Book Count: {this.state.books.length}</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <Card className="mb-3">
                                <Card.Body>
                                    <Card.Title>View Borrowed Books</Card.Title>
                                    <Button variant="primary" href="/ViewBorrowedBooks">Go to View Borrowed Books</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="mb-3">
                                <Card.Body>
                                    <Card.Title>View Returned Books</Card.Title>
                                    <Button variant="primary" href="/ViewReturnedBooks">Go to View Returned Books</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <Card className="mb-3">
                                <Card.Body>
                                    <Card.Title>Borrowed Books Statistics</Card.Title>
                                    <p>Total Borrowed Book Count: {this.state.borrowBooksRequest.length}</p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="mb-3">
                                <Card.Body>
                                    <Card.Title>Returned Books Statistics</Card.Title>
                                    <p>Total Returned Book Count: {this.state.returnBooksRequest.length}</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }

}

export default AdminDashboard;
