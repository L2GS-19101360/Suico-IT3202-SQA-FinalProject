import { Component, useState } from 'react'
import { Container, Nav, Navbar, NavDropdown, Button, Form, InputGroup, Dropdown, Table, Modal, Spinner } from 'react-bootstrap'
import webName from '../../assets/website name.jpg'
import ClockComponent from '../../components/ClockComponent'
import AdminSidebar from '../../components/Admin/AdminSidebar'
import AdminNavbar from '../../components/Admin/AdminNavbar'
import axios from 'axios'
import { FaSearch, FaLock, FaUnlockAlt, FaBook } from 'react-icons/fa'

class ViewModalBook extends Component {

    constructor() {
        super();
        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.state = {
            show: false,
            loading: false,
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
        const { show, handleClose, book } = this.props;

        return (
            <div>
                <Modal show={show} onHide={handleClose} size='lg' aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title><FaBook /> {book.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }

}

export default ViewModalBook
