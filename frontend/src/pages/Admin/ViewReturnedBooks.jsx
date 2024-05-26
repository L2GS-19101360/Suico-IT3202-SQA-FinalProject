import { Component, useState } from 'react'
import { Container, Nav, Navbar, NavDropdown, Button, Form, InputGroup, Dropdown, Table, Spinner } from 'react-bootstrap'
import webName from '../../assets/website name.jpg'
import ClockComponent from '../../components/ClockComponent'
import AdminSidebar from '../../components/Admin/AdminSidebar'
import AdminNavbar from '../../components/Admin/AdminNavbar'
import axios from 'axios'

class ViewReturnedBooks extends Component {

    constructor() {
        super();
        this.state = {
            returnBooksRequest: [],
            searchInput: "",
            selectBookGenreOption: "All",
            filteredBooks: [],

            userId: localStorage.getItem("userId"),
        }
    }

    componentDidMount() {
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

    render() {
        const { selectBookGenreOption, filteredBooks } = this.state;

        return (
            <div>
                <AdminNavbar />
                <div>
                    <h1>View Returned Books History</h1>
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
                                        <th>User Image</th>
                                        <th>User Full Name</th>
                                        <th>User Email</th>
                                        <th>Book Image</th>
                                        <th>Book Name</th>
                                        <th>Book Author</th>
                                        <th>Librarian Image</th>
                                        <th>Librarian Name</th>
                                        <th>Librarian Email</th>
                                        <th>Returned Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredBooks.map((returnBooksRequest) => (
                                        <tr key={returnBooksRequest.id}>
                                            <td>
                                                {returnBooksRequest.userImage !== "#%&{}>" ? <img src={returnBooksRequest.userImage} height={75} width={75} alt="" /> : <img src={`https://ui-avatars.com/api/?name=${returnBooksRequest.userFirstname}+${returnBooksRequest.userLastname}&background=random&size=75`} alt="" />}
                                            </td>
                                            <td>{returnBooksRequest.userFirstname + " " + returnBooksRequest.userLastname}</td>
                                            <td>{returnBooksRequest.userEmail}</td>
                                            <td><img src={returnBooksRequest.image} height={75} width={75} alt="" /></td>
                                            <td>{returnBooksRequest.name}</td>
                                            <td>{returnBooksRequest.author}</td>
                                            <td>
                                                {returnBooksRequest.librarianImage !== "#%&{}>" ? <img src={returnBooksRequest.librarianImage} height={75} width={75} alt="" /> : <img src={`https://ui-avatars.com/api/?name=${returnBooksRequest.librarianFirstname}+${returnBooksRequest.librarianLastname}&background=random&size=75`} alt="" />}
                                            </td>
                                            <td>{returnBooksRequest.librarianFirstname + " " + returnBooksRequest.librarianLastname}</td>
                                            <td>{returnBooksRequest.librarianEmail}</td>
                                            <td>{returnBooksRequest.returned_date}</td>
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

export default ViewReturnedBooks
