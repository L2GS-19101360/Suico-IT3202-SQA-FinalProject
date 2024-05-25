import { Component } from 'react'
import { Container, Nav, Navbar, NavDropdown, Button, Form, InputGroup, Dropdown, Table, Spinner } from 'react-bootstrap'
import webName from '../../assets/website name.jpg'
import ClockComponent from '../../components/ClockComponent'
import LibrarianSidebar from '../../components/Librarian/LibrarianSidebar'
import LibrarianNavbar from '../../components/Librarian/LibrarianNavbar'
import axios from 'axios'
import { FaCheckSquare, FaTimesCircle } from 'react-icons/fa'

class LibrarianReturnBooks extends Component {

    constructor() {
        super();
        this.state = {
            returnBooksRequest: [],
            searchInput: "",
            selectBookGenreOption: "All",
            filteredBooks: [],
            loading: false, // Add loading state
            userId: localStorage.getItem("userId"),
        }
    }

    componentDidMount() {
        this.getReturnBooksRequests();
    }
    componentWillUnmount() {

    }

    getReturnBooksRequests() {
        const apiLink = [
            `https://suico-it3202-sqa-finalproject-backend.onrender.com/api/return-books-request/View-Book-Request`,
            `http://localhost:3306/api/return-books-request/View-Book-Request`
        ];

        axios.get(apiLink[0])
            .then(response => {
                console.log("API Response:", response.data.data);
                this.setState({
                    returnBooksRequest: response.data.data,
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
                this.setState({ filteredBooks: this.state.returnBooksRequest });
            } else {
                const filteredBooks = this.state.returnBooksRequest.filter(book =>
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
            const { returnBooksRequest } = this.state;
            if (option === "All") {
                this.setState({ filteredBooks: returnBooksRequest });
            } else {
                const filteredBooks = returnBooksRequest.filter(book => book.genre === option);
                this.setState({ filteredBooks });
            }
        });
    };

    approvedReturnRequest = (returnRequestId) => {
        const { userId } = this.state;

        console.log(userId + " " + returnRequestId);

        const apiLinks = [
            `https://suico-it3202-sqa-finalproject-backend.onrender.com/api/return-books-request/approved-return-book-request/${returnRequestId}`,
            `http://localhost:3306/api/return-books-request/approved-return-book-request/${returnRequestId}`
        ]

        const data = {
            librarian_id_fk: userId
        }

        this.setState({ loading: true }); // Set loading to true

        axios.put(apiLinks[0], data)
            .then((response) => {
                console.log(response);
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
                this.setState({ loading: false }); // Set loading to false in case of error
            });
    }

    deniedReturnRequest = (returnRequestId, deniedtoReturnBookId) => {
        const { userId } = this.state;

        console.log(userId + " " + returnRequestId + " " + deniedtoReturnBookId);

        const apiLinks = [
            `https://suico-it3202-sqa-finalproject-backend.onrender.com/api/return-books-request/denied-return-book-request/${returnRequestId}`,
            `http://localhost:3306/api/return-books-request/denied-return-book-request/${returnRequestId}`,
            `https://suico-it3202-sqa-finalproject-backend.onrender.com/api/return-books-request/denied-borrow-to-return-book-request/${deniedtoReturnBookId}`,
            `http://localhost:3306/api/return-books-request/denied-borrow-to-return-book-request/${deniedtoReturnBookId}`
        ]

        const data = {
            librarian_id_fk: userId
        }

        this.setState({ loading: true }); // Set loading to true

        axios.put(apiLinks[2])
            .then((response) => {
                console.log(response)
                axios.put(apiLinks[0], data)
                    .then((response) => {
                        console.log(response);
                        window.location.reload();
                    })
                    .catch((error) => {
                        console.log(error);
                        this.setState({ loading: false }); // Set loading to false in case of error
                    });
            })
            .catch((error) => {
                console.log(error);
                this.setState({ loading: false }); // Set loading to false in case of error
            });
    }

    render() {
        const { selectBookGenreOption, filteredBooks, loading } = this.state;

        return (
            <div>
                <LibrarianNavbar />
                <div>
                    <h1>Return Books Request Page</h1>
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
                                    {filteredBooks.filter((returnRequests => returnRequests.returned_status === "Pending")).map((returnRequests) => (
                                        <tr key={returnRequests.id}>
                                            <td><img src={returnRequests.bookImage} height={75} width={75} alt="" /></td>
                                            <td style={{ wordWrap: "break-word", wordBreak: "break-word", maxWidth: "150px" }}>{returnRequests.name}</td>
                                            <td>{returnRequests.author}</td>
                                            <td>
                                                {returnRequests.userImage !== "#%&{}>" ? <img src={returnRequests.userImage} height={75} width={75} alt="" /> : <img src={`https://ui-avatars.com/api/?name=${returnRequests.firstname}+${returnRequests.lastname}&background=random&size=75`} alt="" />}
                                            </td>
                                            <td>{returnRequests.firstname + " " + returnRequests.lastname}</td>
                                            <td>{returnRequests.email}</td>
                                            <td>{returnRequests.returned_status}</td>
                                            <td>
                                                {returnRequests.returned_status === "Pending" ? (
                                                    <div style={{ display: "inline-flex", gap: "15px" }}>
                                                        <Button
                                                            variant='success'
                                                            onClick={() => this.approvedReturnRequest(returnRequests.id)}
                                                            disabled={loading}
                                                        >
                                                            {loading ? <Spinner as="span" animation="border" size="sm" /> : <FaCheckSquare />}
                                                        </Button>
                                                        <Button
                                                            variant='danger'
                                                            onClick={() => this.deniedReturnRequest(returnRequests.id, returnRequests.borrow_books_request_id_fk)}
                                                            disabled={loading}
                                                        >
                                                            {loading ? <Spinner as="span" animation="border" size="sm" /> : <FaTimesCircle />}
                                                        </Button>
                                                    </div>
                                                ) : null}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LibrarianReturnBooks;
