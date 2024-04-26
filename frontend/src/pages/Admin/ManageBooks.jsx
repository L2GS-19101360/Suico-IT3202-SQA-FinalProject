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
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.storeBook = this.storeBook.bind(this);
        this.state = {
            show: false,

            bookImageUrl: null,
            bookImageFile: null,

            bookContentUrl: null,
            bookContentFile: null
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

    handleImageChange(e) {
        const file = e.target.files[0];
        if (file) {
            const fileName = file.name;
            this.setState({
                bookImageUrl: URL.createObjectURL(file) || null, // Reset to null when new image selected
                bookImageFile: file
            });
        }
    }
    // Update handleContentChange method to handle PDF files
    handleContentChange(e) {
        const file = e.target.files[0];
        if (file) {
            const fileName = file.name;
            // Ensure the file type is PDF before setting the state
            if (file.type === 'application/pdf') {
                this.setState({
                    bookContentUrl: URL.createObjectURL(file),
                    bookContentFile: file
                });
            } else {
                alert('Please select a PDF file.');
            }
        }
    }


    storeBook = async (event) => {
        event.preventDefault();

        const selectedImageFile = this.state.bookImageFile;
        const selectedImageContent = this.state.bookContentFile
        const apiLinks = [
            'https://suico-it3202-sqa-finalproject-backend.onrender.com/api/book-image',
            'http://localhost:3306/api/book-image',
            'https://suico-it3202-sqa-finalproject-backend.onrender.com/api/book-content',
            'http://localhost:3306/api/book-content'
        ];

        if (selectedImageFile) {
            const formImageData = new FormData();
            formImageData.append('file', selectedImageFile);

            try {
                const response = await axios.post(apiLinks[0], formImageData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                });
                console.log('File uploaded successfully:', response.data);
                console.log('Public URL:', response.data.imageUrl);

                if (selectedImageContent) {
                    const formContentData = new FormData();
                    formContentData.append('file', selectedImageContent);

                    try {
                        const response = await axios.post(apiLinks[2], formContentData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            },
                        });
                        console.log('File uploaded successfully:', response.data);
                        console.log('Public URL:', response.data.pdfUrl);
                    } catch (error) {
                        console.error('Error uploading file:', error);
                    }
                }
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    };

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

                    <Modal show={this.state.show} onHide={this.handleClose} size='lg'>
                        <Modal.Header closeButton>
                            <Modal.Title><FaBook /> Create New Book</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <div style={{ display: 'inline-flex' }}>
                                    <div id='leftDiv'>
                                        {this.state.bookImageUrl ? (
                                            <img
                                                src={this.state.bookImageUrl}
                                                alt="Book Cover"
                                                height={300}
                                                width={200}
                                            />
                                        ) : (
                                            <img src="" alt="" height={300} width={200} />
                                        )}
                                    </div>
                                    <div id='rightDiv' style={{ flex: '1', marginLeft: '20px', width: '469px' }}>
                                        <Form.Group controlId="formFile" className="mb-3">
                                            <Form.Control type="file" onChange={this.handleImageChange} />
                                        </Form.Group>
                                        <Form.Group controlId="formFile" className="mb-3">
                                            <Form.Control type="file" onChange={this.handleContentChange} />
                                        </Form.Group>
                                        <Button variant="success" onClick={this.storeBook} type='submit'>Store Book</Button>
                                    </div>
                                </div>
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
