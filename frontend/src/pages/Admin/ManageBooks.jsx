import React, { Component } from 'react';
import { Container, Form, InputGroup, Dropdown, Table, Button, Spinner } from 'react-bootstrap';
import { FaBookOpen, FaSync, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import AdminNavbar from '../../components/Admin/AdminNavbar';
import CreateModalBook from '../../components/Admin/CreateModalBook';
import UpdateModalBook from '../../components/Admin/UpdateModalBook';
import wallpaper from '../../assets/wallpaper.jpeg'; // Import the wallpaper image

class ManageBooks extends Component {
    constructor(props) {
        super(props);
        this.deleteBooks = this.deleteBooks.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.state = {
            books: [],
            searchInput: "",
            selectBookGenreOption: "All",
            filteredBooks: [],

            showModal: false,
            selectedBook: null,
            loadingBookId: null // Add this state variable to track loading state
        };
    }

    componentDidMount() {
        this.getAllBooks(this.state.selectBookGenreOption);
    }

    getAllBooks = (selectBookGenreOption) => {
        const apiLinks = [
            'https://suico-it3202-sqa-finalproject-backend.onrender.com/api/books/',
            'http://localhost:3306/api/books/',
            `https://suico-it3202-sqa-finalproject-backend.onrender.com/api/books/genre/${selectBookGenreOption}`,
            `http://localhost:3306/api/books/genre/${selectBookGenreOption}`
        ];

        const apiUrl = selectBookGenreOption === "All" ? apiLinks[0] : apiLinks[2];

        axios.get(apiUrl)
            .then(response => {
                this.setState({
                    books: response.data.data,
                    filteredBooks: response.data.data
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
                this.setState({ filteredBooks: this.state.books });
            } else {
                const filteredBooks = this.state.books.filter(book =>
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
            this.getAllBooks(option);
        });
    };

    deleteBooks = (id, bookimage, bookcontent) => {
        console.log(id)
        console.log(bookimage)
        console.log(bookcontent)

        this.setState({ loadingBookId: id }); // Set loading state for the book being deleted

        const apiLinks = [
            `https://suico-it3202-sqa-finalproject-backend.onrender.com/api/books/${id}`,
            `http://localhost:3306/api/books/${id}`,
            `https://suico-it3202-sqa-finalproject-backend.onrender.com/api/book-image/${bookimage}`,
            `http://localhost:3306/api/book-image/${bookimage}`,
            `https://suico-it3202-sqa-finalproject-backend.onrender.com/api/book-content/${bookcontent}`,
            `http://localhost:3306/api/book-content/${bookcontent}`,
        ]

        axios.delete(apiLinks[2]).then(
            (response) => {
                console.log(response)
                axios.delete(apiLinks[4]).then(
                    (response) => {
                        console.log(response)
                        axios.delete(apiLinks[0]).then(
                            (response) => {
                                console.log(response)
                                this.setState({ loadingBookId: null }); // Reset loading state after deletion
                                window.location.reload();
                            }
                        ).catch(
                            (error) => {
                                console.log(error)
                                this.setState({ loadingBookId: null }); // Reset loading state on error
                            }
                        )
                    }
                ).catch(
                    (error) => {
                        console.log(error)
                        this.setState({ loadingBookId: null }); // Reset loading state on error
                    }
                )
            }
        ).catch(
            (error) => {
                console.log(error)
                this.setState({ loadingBookId: null }); // Reset loading state on error
            }
        )
    }

    openModal = (book) => {
        this.setState({ showModal: true, selectedBook: book });
    }

    closeModal = () => {
        this.setState({ showModal: false, selectedBook: null });
    }

    render() {
        const { selectBookGenreOption, showModal, selectedBook, loadingBookId } = this.state;

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
                <AdminNavbar />
                <div style={styles.overlay}></div>
                <div style={styles.content}>
                    <h1>Manage Books Page</h1>
                    <div style={{ padding: "1%", textAlign: "center" }}>
                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder="Enter Book Information"
                                value={this.state.searchInput}
                                onChange={this.searchBook}
                            />
                        </InputGroup>
                        <div style={{ display: "inline-flex", gap: "20px" }}>
                            <CreateModalBook />
                            <Dropdown>
                                <Dropdown.Toggle variant="primary" id="bookGenreOptions">
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
                                        <th>Book ID</th>
                                        <th>Book Image</th>
                                        <th>Book Title</th>
                                        <th>Book Author</th>
                                        <th>Book Genre</th>
                                        <th>Book Content</th>
                                        <th>Update</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.filteredBooks.map((book) => (
                                        <tr key={book.id}>
                                            <td>{book.id}</td>
                                            <td><img src={book.image} height={75} width={75} alt="" /></td>
                                            <td style={{ wordWrap: "break-word", wordBreak: "break-word", maxWidth: "150px" }}>{book.name}</td>
                                            <td>{book.author}</td>
                                            <td>{book.genre}</td>
                                            <td>
                                                <a href={book.content} target="_blank" rel="noopener noreferrer">
                                                    <Button variant="primary"><FaBookOpen /></Button>
                                                </a>
                                            </td>
                                            <td>
                                                <Button variant="warning" onClick={() => this.openModal(book)}>
                                                    <FaSync />
                                                </Button>
                                            </td>
                                            <td>
                                                <Button id={`delete-book-${book.id}`} variant="danger" onClick={() => this.deleteBooks(book.id, book.image_filename, book.content_filename)}>
                                                    {loadingBookId === book.id ? <Spinner as="span" animation="border" size="sm" /> : <FaTrash />}
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </div>

                    {selectedBook && (
                        <UpdateModalBook
                            show={showModal}
                            handleClose={this.closeModal}
                            book={selectedBook}
                        />
                    )}
                </div>
            </div>
        );
    }
}

export default withRouter(ManageBooks);
