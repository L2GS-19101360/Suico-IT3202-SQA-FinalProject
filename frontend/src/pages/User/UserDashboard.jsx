import { Component, useState } from 'react'
import { Container, Form, InputGroup, Dropdown, Table, Button } from 'react-bootstrap';
import webName from '../../assets/website name.jpg'
import ClockComponent from '../../components/ClockComponent'
import UserSidebar from '../../components/User/UserSidebar'
import UserNavbar from '../../components/User/UserNavbar'
import axios from 'axios'
import { FaBookOpen, FaSync, FaTrash } from 'react-icons/fa';
import ViewModalBook from '../../components/User/ViewModalBook';

class UserDashboard extends Component {

    constructor() {
        super();
        this.state = {
            books: [],
            searchInput: "",
            selectBookGenreOption: "All",
            filteredBooks: [],
            selectedBook: null,
            showModal: false,

            userId: localStorage.getItem("userId"),
        }
    }

    componentDidMount() {
        this.getAllBooks(this.state.selectBookGenreOption);
        console.log(this.state.userId);
    }
    componentWillUnmount() {

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
                }, () => {
                    console.log(this.state.books)
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

    handleBookClick = (book) => {
        this.setState({ selectedBook: book, showModal: true });
    }

    handleCloseModal = () => {
        this.setState({ showModal: false, selectedBook: null });
    }

    render() {
        const { selectBookGenreOption, showModal, selectedBook } = this.state;

        return (
            <div>
                <UserNavbar />
                <div>
                    <h1>User Dashboard</h1>
                    <div style={{ padding: "1%", textAlign: "center" }}>
                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder="Enter Book Information"
                                value={this.state.searchInput}
                                onChange={this.searchBook}
                            />
                        </InputGroup>
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
                        </Dropdown><br />
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", backgroundColor: "white", height: "600px", overflowY: "auto" }}>
                            {this.state.filteredBooks.length > 0 ? (
                                [...new Set(this.state.filteredBooks.map(book => book.genre))].map(genre => (
                                    <div key={genre} style={{ width: "100%" }}>
                                        <h2 style={{ backgroundColor: "#b0c4de", padding: "10px", textAlign: "center" }}>{genre}</h2>
                                        <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
                                            {this.state.filteredBooks.filter(book => book.genre === genre).map(book => (
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
                    <ViewModalBook show={showModal} handleClose={this.handleCloseModal} book={selectedBook} />
                )}
            </div>
        );
    }

}

export default UserDashboard
