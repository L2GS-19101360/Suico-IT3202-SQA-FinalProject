import { Component, useState } from 'react'
import { Container, Nav, Navbar, NavDropdown, Button, Form, InputGroup, Dropdown, Table, Modal } from 'react-bootstrap'
import webName from '../../assets/website name.jpg'
import ClockComponent from '../../components/ClockComponent'
import AdminSidebar from '../../components/Admin/AdminSidebar'
import AdminNavbar from '../../components/Admin/AdminNavbar'
import { withRouter } from 'react-router-dom'
import { FaSearch, FaLock, FaUnlockAlt, FaBook } from 'react-icons/fa'
import axios from 'axios'

class ManageBooks extends Component {

    constructor(props) {
        super(props);
        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.state = {
            show: false
        }
    }

    componentDidMount() {

    }
    componentWillUnmount() {

    }

    handleClose() {
        this.setState({ show: false });
    }
    handleShow() {
        this.setState({ show: true });
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

                    <Button variant="success" onClick={this.handleShow}>
                        <FaBook /> Create New Book
                    </Button>

                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title><FaBook /> Create New Book</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Control type="file" />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        );
    }

}

export default withRouter(ManageBooks)
