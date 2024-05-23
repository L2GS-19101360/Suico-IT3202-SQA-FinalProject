import { Component, useState } from 'react'
import { Container, Nav, Navbar, NavDropdown, Button, Form, InputGroup, Dropdown, Table } from 'react-bootstrap'
import webName from '../../assets/website name.jpg'
import ClockComponent from '../../components/ClockComponent'
import LibrarianSidebar from '../../components/Librarian/LibrarianSidebar'
import LibrarianNavbar from '../../components/Librarian/LibrarianNavbar'
import { FaCheckSquare } from 'react-icons/fa' 

class LibrarianBorrowBooks extends Component {

    constructor() {
        super();
        this.state = {
            borrowBooksRequest: [],
            searchInput: "",
            selectBookGenreOption: "All",
            filteredBooks: [],
        }
    }

    componentDidMount() {

    }
    componentWillUnmount() {

    }

    getBorrowBooksRequests() {
        const apiLink = [
            `https://suico-it3202-sqa-finalproject-backend.onrender.com/api/borrow-books-request`,
            `http://localhost:3306/api/borrow-books-request`
        ];

        axios.get(apiLink[0])
            .then(response => {
                console.log("API Response:", response.data.data);
                this.setState({ borrowBooksRequest: response.data.data });
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
            this.getAllBooks(option);
        });
    };

    render() {
        const { selectBookGenreOption } = this.state;

        return (
            <div>
                <LibrarianNavbar />
                <div>
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
                                        <th>Book Genre</th>
                                        <th>View Request</th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default LibrarianBorrowBooks
