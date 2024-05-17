import React, { Component } from 'react';
import { Container, Form, InputGroup, Dropdown, Table, Button } from 'react-bootstrap';
import { FaBookOpen, FaSync, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import AdminNavbar from '../../components/Admin/AdminNavbar';
import CreateModalBook from '../../components/Admin/CreateModalBook';

class ManageBooks extends Component {
    constructor(props) {
        super(props);
        this.deleteBooks = this.deleteBooks.bind(this);
        this.state = {
            books: [],
            searchInput: "",
            selectBookGenreOption: "All",
            filteredBooks: []
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
    }

    render() {
        const { selectBookGenreOption } = this.state

        return (
            <div>
                <AdminNavbar />
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
                                    <th>Book Genre</th>
                                    <th>Book Content</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.filteredBooks.map((book) => (
                                    <tr key={book.id}>
                                        <td><img src={book.image} height={75} width={75} alt="" /></td>
                                        <td style={{ wordWrap: "break-word", wordBreak: "break-word", maxWidth: "150px" }}>{book.name}</td>
                                        <td>{book.author}</td>
                                        <td>{book.genre}</td>
                                        <td>
                                            <a href={book.content} target="_blank" rel="noopener noreferrer">
                                                <Button variant="primary"><FaBookOpen /></Button>
                                            </a>
                                        </td>
                                        <td><Button variant="warning"><FaSync /></Button></td>
                                        <td><Button variant="danger" onClick={() => this.deleteBooks(book.id, book.image, book.content)}><FaTrash /></Button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ManageBooks);
