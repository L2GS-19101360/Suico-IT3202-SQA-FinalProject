import { Component } from 'react'
import { Container, Nav, Navbar, NavDropdown, Button, Form, InputGroup, Dropdown, Table, Spinner } from 'react-bootstrap'
import webName from '../../assets/website name.jpg'
import ClockComponent from '../../components/ClockComponent'
import LibrarianSidebar from '../../components/Librarian/LibrarianSidebar'
import LibrarianNavbar from '../../components/Librarian/LibrarianNavbar'
import { FaCheckSquare, FaTimesCircle } from 'react-icons/fa'
import axios from 'axios'
import wallpaper from '../../assets/wallpaper.jpeg' // Import the wallpaper image

class LibrarianBorrowBooks extends Component {

    constructor() {
        super();
        this.approvedBorrowRequest = this.approvedBorrowRequest.bind(this);
        this.deniedBorrowRequest = this.deniedBorrowRequest.bind(this);
        this.state = {
            borrowBooksRequest: [],
            searchInput: "",
            selectBookGenreOption: "All",
            filteredBooks: [],
            loading: false,
            userId: localStorage.getItem("userId"),
        }
    }

    componentDidMount() {
        this.getBorrowBooksRequests()
    }

    getBorrowBooksRequests() {
        const apiLink = [
            `https://suico-it3202-sqa-finalproject-backend.onrender.com/api/borrow-books-request/View-Book-Request`,
            `http://localhost:3306/api/borrow-books-request/View-Book-Request`
        ];

        axios.get(apiLink[0])
            .then(response => {
                console.log("API Response:", response.data.data);
                this.setState({
                    borrowBooksRequest: response.data.data,
                    filteredBooks: response.data.data // Set filteredBooks initially
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    searchBook = (event) => {
        const searchInput = event.target.value;
        this.setState({ searchInput }, () => {
            const searchQuery = searchInput.toLowerCase();
            if (searchQuery === "") {
                this.setState({ filteredBooks: this.state.borrowBooksRequest });
            } else {
                const filteredBooks = this.state.borrowBooksRequest.filter(book =>
                    book.name.toLowerCase().includes(searchQuery) ||
                    book.author.toLowerCase().includes(searchQuery) ||
                    book.genre.toLowerCase().includes(searchQuery)
                );
                this.setState({ filteredBooks });
            }
        });
    }

    handleOptionBookSelect = (option) => {
        this.setState({ selectBookGenreOption: option }, () => {
            const { borrowBooksRequest } = this.state;
            if (option === "All") {
                this.setState({ filteredBooks: borrowBooksRequest });
            } else {
                const filteredBooks = borrowBooksRequest.filter(book => book.genre === option);
                this.setState({ filteredBooks });
            }
        });
    };

    approvedBorrowRequest = (borrowRequestId) => {
        const { userId } = this.state;

        console.log(userId + " " + borrowRequestId);

        const apiLinks = [
            `https://suico-it3202-sqa-finalproject-backend.onrender.com/api/borrow-books-request/approved-borrow-book-request/${borrowRequestId}`,
            `http://localhost:3306/api/borrow-books-request/approved-borrow-book-request/${borrowRequestId}`
        ]

        const data = {
            librarian_id_fk: userId
        }

        this.setState({ loading: true });

        axios.put(apiLinks[0], data)
            .then((response) => {
                console.log(response);
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
                this.setState({ loading: false });
            });
    }

    deniedBorrowRequest = (borrowRequestId) => {
        const { userId } = this.state;

        console.log(userId + " " + borrowRequestId);

        const apiLinks = [
            `https://suico-it3202-sqa-finalproject-backend.onrender.com/api/borrow-books-request/denied-borrow-book-request/${borrowRequestId}`,
            `http://localhost:3306/api/borrow-books-request/denied-borrow-book-request/${borrowRequestId}`
        ]

        const data = {
            librarian_id_fk: userId
        }

        this.setState({ loading: true });

        axios.put(apiLinks[0], data)
            .then((response) => {
                console.log(response);
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
                this.setState({ loading: false });
            });
    }

    render() {
        const { selectBookGenreOption, filteredBooks, loading } = this.state;

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
            },
        };

        return (
            <div style={styles.container}>
                <LibrarianNavbar />
                <div style={styles.overlay}></div>
                <div style={styles.content}>
                    <h1>Borrow Books Request Page</h1>
                    <div style={{ padding: "1%", textAlign: "center" }}>
                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder="Enter Book Information"
                                value={this.state.searchInput}
                                onChange={this.searchBook}
                            />
                        </InputGroup>
                        <div style={{ display: "inline-flex", gap: "20px" }}>
                            <Dropdown>
                                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                    {selectBookGenreOption}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => this.handleOptionBookSelect("All")}>All</Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.handleOptionBookSelect("Historical Fiction")}>Historical Fiction</Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.handleOptionBookSelect("Crime and Mystery")}>Crime and Mystery</Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.handleOptionBookSelect("Horror")}>Horror</Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.handleOptionBookSelect("Science Fiction")}>Science Fiction</Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.handleOptionBookSelect("Education")}>Education</Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.handleOptionBookSelect("Romance")}>Romance</Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.handleOptionBookSelect("Fantasy")}>Fantasy</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <br /><br />
                        <div style={{ textAlign: "center", height: "600px", overflowY: "auto" }}>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Book Image</th>
                                        <th>Book Title</th>
                                        <th>Book Author</th>
                                        <th>User Image</th>
                                        <th>User Full Name</th>
                                        <th>User Email</th>
                                        <th>Request Status</th>
                                        <th>Request Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredBooks.filter((borrowRequests => borrowRequests.borrowed_status === "Pending")).map((borrowRequests) => (
                                        <tr key={borrowRequests.id}>
                                            <td><img src={borrowRequests.bookImage} height={75} width={75} alt="" /></td>
                                            <td style={{ wordWrap: "break-word", wordBreak: "break-word", maxWidth: "150px" }}>{borrowRequests.name}</td>
                                            <td>{borrowRequests.author}</td>
                                            <td>
                                                {borrowRequests.userImage !== "#%&{}>" ? <img src={borrowRequests.userImage} height={75} width={75} alt="" /> : <img src={`https://ui-avatars.com/api/?name=${borrowRequests.firstname}+${borrowRequests.lastname}&background=random&size=75`} alt="" />}
                                            </td>
                                            <td>{borrowRequests.firstname + " " + borrowRequests.lastname}</td>
                                            <td>{borrowRequests.email}</td>
                                            <td>{borrowRequests.borrowed_status}</td>
                                            <td>
                                                {borrowRequests.borrowed_status === "Pending" ? (
                                                    <div style={{ display: "inline-flex", gap: "15px" }}>
                                                        <Button
                                                            variant='success'
                                                            onClick={() => this.approvedBorrowRequest(borrowRequests.id)}
                                                            disabled={loading}
                                                        >
                                                            {loading ? <Spinner as="span" animation="border" size="sm" /> : <FaCheckSquare />}
                                                        </Button>
                                                        <Button
                                                            variant='danger'
                                                            onClick={() => this.deniedBorrowRequest(borrowRequests.id)}
                                                            disabled={loading}
                                                        >
                                                            {loading ? <Spinner as="span" animation="border" size="sm" /> : <FaTimesCircle />}
                                                        </Button>
                                                    </div>
                                                ) : (
                                                    <div style={{ display: "inline-flex", gap: "15px" }}>
                                                        <Button
                                                            variant='success'
                                                            disabled>
                                                            <FaCheckSquare />
                                                        </Button>
                                                        <Button
                                                            variant='danger'
                                                            disabled>
                                                            <FaTimesCircle />
                                                        </Button>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default LibrarianBorrowBooks;
