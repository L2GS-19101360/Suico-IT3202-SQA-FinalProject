import { Component } from 'react';
import { Container, Nav, Navbar, NavDropdown, Button, Form, InputGroup, Dropdown, Table } from 'react-bootstrap';
import webName from '../../assets/website name.jpg';
import ClockComponent from '../../components/ClockComponent';
import UserSidebar from '../../components/User/UserSidebar';
import UserNavbar from '../../components/User/UserNavbar';
import axios from 'axios';
import ViewModalApprovedBook from '../../components/User/ViewModalApprovedBook';
import wallpaper from '../../assets/wallpaper.jpeg'; // Import the wallpaper image

class UserBookShelf extends Component {

    constructor() {
        super();
        this.state = {
            borrowBooksRequest: [],
            searchInput: "",
            selectBookGenreOption: "All",
            filteredBooks: [],
            selectedBook: null,
            showModal: false,
            userId: localStorage.getItem("userId"),
        };
    }

    componentDidMount() {
        this.getApproveBorrowBooksRequests();
    }

    getApproveBorrowBooksRequests() {
        const { userId } = this.state;

        const apiLink = [
            `https://suico-it3202-sqa-finalproject-backend.onrender.com/api/borrow-books-request/userId/${userId}`,
            `http://localhost:3306/api/borrow-books-request/userId/${userId}`
        ];

        axios.get(apiLink[0])
            .then(response => {
                const approvedBooks = response.data.data.filter(book => book.borrowed_status === "Approved");
                this.setState({
                    borrowBooksRequest: approvedBooks,
                    filteredBooks: approvedBooks
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
    };

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

    handleBookClick = (book) => {
        this.setState({ selectedBook: book, showModal: true });
    };

    handleCloseModal = () => {
        this.setState({ showModal: false, selectedBook: null });
    };

    render() {
        const { selectBookGenreOption, filteredBooks, selectedBook, showModal } = this.state;

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
                <UserNavbar />
                <div style={styles.overlay}></div>
                <div style={styles.content}>
                    <h1>User Book Shelf</h1>
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
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", backgroundColor: "white", height: "600px", overflowY: "auto" }}>
                            {filteredBooks.length > 0 ? (
                                [...new Set(filteredBooks.map(book => book.genre))].map(genre => (
                                    <div key={genre} style={{ width: "100%" }}>
                                        <h2 style={{ backgroundColor: "#b0c4de", padding: "10px", textAlign: "center" }}>{genre}</h2>
                                        <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
                                            {filteredBooks.filter(book => book.genre === genre).map(book => (
                                                <div key={book.id} style={{ textAlign: "center" }}>
                                                    <img src={book.image} alt={book.title} height={250} width={200} style={{ cursor: "pointer" }} onClick={() => this.handleBookClick(book)} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No books available</p>
                            )}
                        </div>
                    </div>
                </div>
                {selectedBook && (
                    <ViewModalApprovedBook show={showModal} handleClose={this.handleCloseModal} book={selectedBook} />
                )}
            </div>
        );
    }
}

export default UserBookShelf;
