import { Component } from 'react';
import { Container, Nav, Navbar, NavDropdown, Button, Card, Row, Col } from 'react-bootstrap';
import webName from '../../assets/website name.jpg';
import ClockComponent from '../../components/ClockComponent';
import LibrarianSidebar from '../../components/Librarian/LibrarianSidebar';
import LibrarianNavbar from '../../components/Librarian/LibrarianNavbar';
import wallpaper from '../../assets/wallpaper.jpeg'; // Import the wallpaper image

class LibrarianDashboard extends Component {

    constructor() {
        super();
        this.state = {

        }
    }

    componentDidMount() {

    }
    componentWillUnmount() {

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

        return (
            <div style={styles.container}>
                <LibrarianNavbar />
                <div style={styles.overlay}></div>
                <div style={styles.content}>
                    <h1>Librarian Dashboard</h1>
                    <Card className="mb-3">
                        <Card.Body>
                            <h2>Welcome, [Librarian Name]</h2>
                            <p>Here is an overview of your library management system.</p>
                        </Card.Body>
                    </Card>
                    <Row>
                        <Col md={4}>
                            <Card className="mb-3">
                                <Card.Body>
                                    <Card.Title>Manage Books</Card.Title>
                                    <Button variant="primary" href="/manage-books">Go to Manage Books</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="mb-3">
                                <Card.Body>
                                    <Card.Title>Manage Users</Card.Title>
                                    <Button variant="primary" href="/manage-users">Go to Manage Users</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="mb-3">
                                <Card.Body>
                                    <Card.Title>Borrow Requests</Card.Title>
                                    <Button variant="primary" href="/borrow-requests">View Borrow Requests</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <Card className="mb-3">
                                <Card.Body>
                                    <Card.Title>Returned Books</Card.Title>
                                    <Button variant="primary" href="/returned-books">View Returned Books</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="mb-3">
                                <Card.Body>
                                    <Card.Title>Statistics</Card.Title>
                                    <p>Books Borrowed: 120</p>
                                    <p>Books Returned: 110</p>
                                    <p>Pending Requests: 10</p>
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
