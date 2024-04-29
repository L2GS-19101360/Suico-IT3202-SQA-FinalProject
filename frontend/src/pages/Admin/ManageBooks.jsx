import { Component, useState } from 'react'
import { Container, Nav, Navbar, NavDropdown, Button, Form, InputGroup, Dropdown, Table, Modal, Spinner } from 'react-bootstrap'
import webName from '../../assets/website name.jpg'
import ClockComponent from '../../components/ClockComponent'
import AdminSidebar from '../../components/Admin/AdminSidebar'
import AdminNavbar from '../../components/Admin/AdminNavbar'
import { withRouter } from 'react-router-dom'
import { FaSearch, FaLock, FaUnlockAlt, FaBook, FaSync, FaTrash, FaBookOpen } from 'react-icons/fa'
import axios from 'axios'
import CreateModalBook from '../../components/Admin/CreateModalBook'
import { NavLink } from 'react-router-dom'

class ManageBooks extends Component {

    constructor(props) {
        super(props);
        this.getAllBooks = this.getAllBooks.bind(this);
        this.state = {
            books: []
        }
    }

    componentDidMount() {
        this.getAllBooks();
    }
    componentWillUnmount() {

    }

    getAllBooks() {
        const apiLinks = [
            'https://suico-it3202-sqa-finalproject-backend.onrender.com/api/books/',
            'http://localhost:3306/api/books/'
        ]

        axios.get(
            apiLinks[0]
        ).then(
            (response) => {
                // console.log(response.data.data);
                this.setState({ books: response.data.data }, () => {
                    console.log(this.state.books);
                });
            }
        ).catch(
            (error) => {
                console.log(error)
            }
        );
    }

    render() {
        return (
            <div>
                <AdminNavbar />
                <h1>Manage Books Page</h1>
                <div style={{ padding: "1%", textAlign: "center" }}>
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Enter Book Information"
                        />
                        <Button variant="secondary" id="button-addon2">
                            <FaSearch />
                        </Button>
                    </InputGroup>
                    <CreateModalBook /><br />
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
                            {this.state.books.map((book) => (
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
                                    <td><Button variant="danger"><FaTrash /></Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }

}

export default withRouter(ManageBooks)
