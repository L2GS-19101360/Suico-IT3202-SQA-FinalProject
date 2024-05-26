import { Component } from 'react';
import { Container, Nav, Navbar, NavDropdown, Button, Card, Row, Col } from 'react-bootstrap';
import webName from '../../assets/website name.jpg';
import ClockComponent from '../../components/ClockComponent';
import LibrarianSidebar from '../../components/Librarian/LibrarianSidebar';
import LibrarianNavbar from '../../components/Librarian/LibrarianNavbar';
import wallpaper from '../../assets/wallpaper.jpeg'; // Import the wallpaper image
import axios from 'axios';

class LibrarianDashboard extends Component {

    constructor() {
        super();
        this.state = {
            currFirstname: localStorage.getItem('firstname'),
            currLastname: localStorage.getItem('lastname'),

            borrowBooksRequest: [],
            borrowStatistics: {
                pendingCount: 0,
                approvedCount: 0,
                deniedCount: 0
            },

            returnBooksRequest: [],
            returnStatistics: {
                pendingCount: 0,
                approvedCount: 0,
                deniedCount: 0
            },
        }
    }

    componentDidMount() {
        this.getBorrowBooksRequests();
        this.getReturnBooksRequests();
    }

    getBorrowBooksRequests() {
        const apiLink = [
            `https://suico-it3202-sqa-finalproject-backend.onrender.com/api/borrow-books-request/View-Book-Request`,
            `http://localhost:3306/api/borrow-books-request/View-Book-Request`
        ];

        axios.get(apiLink[0])
            .then(response => {
                this.setState({
                    borrowBooksRequest: response.data.data,
                }, () => {
                    console.log("Borrow Books Request:", this.state.borrowBooksRequest); // Log the updated borrowBooksRequest state
                    this.calculateBorrowStatistics(); // Call calculateBorrowStatistics after state update
                });
            })
            .catch(error => {
                console.error("Error fetching borrow books requests:", error); // Log the error
            });
    }

    getReturnBooksRequests() {
        const apiLink = [
            `https://suico-it3202-sqa-finalproject-backend.onrender.com/api/return-books-request/View-Book-Request`,
            `http://localhost:3306/api/return-books-request/View-Book-Request`
        ];

        axios.get(apiLink[0])
            .then(response => {
                this.setState({
                    returnBooksRequest: response.data.data,
                }, () => {
                    console.log("Return Books Request:", this.state.returnBooksRequest);
                    this.calculateReturnStatistics();
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    calculateReturnStatistics() {
        const { returnBooksRequest } = this.state;
        let updatedStatistics = {
            pendingCount: 0,
            approvedCount: 0,
            deniedCount: 0
        };

        returnBooksRequest.forEach(request => {
            if (request.returned_status === "Pending") {
                updatedStatistics.pendingCount++;
            } else if (request.returned_status === "Approved") {
                updatedStatistics.approvedCount++;
            } else if (request.returned_status === "Denied") {
                updatedStatistics.deniedCount++;
            }
        });

        // Update the returnStatistics state with the updated statistics
        this.setState({ returnStatistics: updatedStatistics });

        console.log(updatedStatistics);
    }

    calculateBorrowStatistics() {
        const { borrowBooksRequest } = this.state;
        let updatedStatistics = {
            pendingCount: 0,
            approvedCount: 0,
            deniedCount: 0
        };

        borrowBooksRequest.forEach(request => {
            if (request.borrowed_status === "Pending") {
                updatedStatistics.pendingCount++;
            } else if (request.borrowed_status === "Approved") {
                updatedStatistics.approvedCount++;
            } else if (request.borrowed_status === "Denied") {
                updatedStatistics.deniedCount++;
            }
        });

        // Update the borrowStatistics state with the updated statistics
        this.setState({ borrowStatistics: updatedStatistics });

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

        const { currFirstname, currLastname } = this.state

        return (
            <div style={styles.container}>
                <LibrarianNavbar />
                <div style={styles.overlay}></div>
                <div style={styles.content}>
                    <h1>Librarian Dashboard</h1>
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
                                    <Card.Title>Borrow Book Requests</Card.Title>
                                    <Button variant="primary" href="/LibrarianBorrowBooks">View Borrow Book Requests</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="mb-3">
                                <Card.Body>
                                    <Card.Title>Returned Book Requests</Card.Title>
                                    <Button variant="primary" href="/LibrarianReturnBooks">View Returned Book Requests</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <Card className="mb-3">
                                <Card.Body>
                                    <Card.Title>Borrow Books Statistics</Card.Title>
                                    <p>Pending Borrow Requests: {this.state.borrowStatistics.pendingCount}</p>
                                    <p>Approved Borrow Requests: {this.state.borrowStatistics.approvedCount}</p>
                                    <p>Denied Borrow Requests: {this.state.borrowStatistics.deniedCount}</p>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="mb-3">
                                <Card.Body>
                                    <Card.Title>Return Books Statistics</Card.Title>
                                    <p>Pending Return Requests: {this.state.returnStatistics.pendingCount}</p>
                                    <p>Approved Return Requests: {this.state.returnStatistics.approvedCount}</p>
                                    <p>Denied Return Requests: {this.state.returnStatistics.deniedCount}</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }

}

export default LibrarianDashboard;
