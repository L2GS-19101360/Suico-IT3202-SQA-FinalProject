import { Component } from 'react';
import { Container, Nav, Navbar, NavDropdown, Button, Form, InputGroup, Dropdown, Table, Modal, Spinner, Alert } from 'react-bootstrap';
import webName from '../../assets/website name.jpg';
import ClockComponent from '../../components/ClockComponent';
import AdminSidebar from '../../components/Admin/AdminSidebar';
import AdminNavbar from '../../components/Admin/AdminNavbar';
import axios from 'axios';
import { FaSearch, FaLock, FaUnlockAlt, FaBook } from 'react-icons/fa';

class CreateModalBook extends Component {

    constructor() {
        super();
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.storeBook = this.storeBook.bind(this);
        this.state = {
            show: false,
            loading: false,
            showAlert: false,
            alertMessage: "",
            alertVariant: "danger",

            bookImageUrl: null,
            bookImageFile: null,
            bookImageFileName: "",

            bookContentUrl: null,
            bookContentFile: null,
            bookContentFileName: "",

            bookImageURL: "",
            bookTitle: "",
            authorName: "",
            selectedGenre: "Select Genre",
            bookGenre: "",
            bookContentURL: ""
        };
    }

    handleClose() {
        this.setState({ show: false, showAlert: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleImageChange(e) {
        const file = e.target.files[0];
        if (file) {
            const fileName = file.name;
            this.setState({
                bookImageUrl: URL.createObjectURL(file) || null,
                bookImageFile: file,
                bookImageFileName: fileName
            });
        }
    }

    handleContentChange(e) {
        const file = e.target.files[0];
        if (file) {
            const fileName = file.name;
            if (file.type === 'application/pdf') {
                this.setState({
                    bookContentUrl: URL.createObjectURL(file),
                    bookContentFile: file,
                    bookContentFileName: fileName
                });
            } else {
                alert('Please select a PDF file.');
            }
        }
    }

    validateInputs() {
        const { bookImageFile, bookContentFile, bookTitle, authorName, selectedGenre } = this.state;
        if (!bookImageFile || !bookContentFile || !bookTitle || !authorName || selectedGenre === "Select Genre") {
            this.setState({
                showAlert: true,
                alertMessage: "All fields are required.",
                alertVariant: "danger"
            });
            return false;
        }
        return true;
    }

    storeBook = async (event) => {
        event.preventDefault();

        if (!this.validateInputs()) {
            return;
        }

        this.setState({ loading: true, showAlert: false });

        const selectedImageFile = this.state.bookImageFile;
        const selectedImageContent = this.state.bookContentFile;
        const apiLinks = [
            'https://suico-it3202-sqa-finalproject-backend.onrender.com/api/book-image',
            'http://localhost:3306/api/book-image',
            'https://suico-it3202-sqa-finalproject-backend.onrender.com/api/book-content',
            'http://localhost:3306/api/book-content',
            'https://suico-it3202-sqa-finalproject-backend.onrender.com/api/books/',
            'http://localhost:3306/api/books/'
        ];

        try {
            if (selectedImageFile) {
                const formImageData = new FormData();
                formImageData.append('file', selectedImageFile);
                const imageResponse = await axios.post(apiLinks[0], formImageData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                this.setState({ bookImageURL: imageResponse.data.imageUrl });
            }

            if (selectedImageContent) {
                const formContentData = new FormData();
                formContentData.append('file', selectedImageContent);
                const contentResponse = await axios.post(apiLinks[2], formContentData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                this.setState({ bookContentURL: contentResponse.data.pdfUrl });
            }

            const { bookImageURL, bookTitle, authorName, selectedGenre, bookContentURL, bookImageFileName, bookContentFileName } = this.state;
            const data = {
                image_filename: bookImageFileName,
                image: bookImageURL,
                name: bookTitle,
                author: authorName,
                genre: selectedGenre,
                content_filename: bookContentFileName,
                content: bookContentURL
            };

            const response = await axios.post(apiLinks[4], data);
            console.log(response);
            this.setState({ loading: false });
            window.location.reload();

        } catch (error) {
            console.error('Error uploading file:', error);
            this.setState({
                loading: false,
                showAlert: true,
                alertMessage: "Failed to connect to the server.",
                alertVariant: "danger"
            });
        }
    };

    render() {
        const { show, loading, showAlert, alertMessage, alertVariant, bookImageUrl, bookTitle, authorName, selectedGenre, bookContentUrl } = this.state;

        return (
            <div>
                <Button variant="success" onClick={this.handleShow}>
                    <FaBook /> Create New Book
                </Button>

                <Modal show={show} onHide={this.handleClose} size='lg' aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title><FaBook /> Create New Book</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        {showAlert && (
                            <Alert variant={alertVariant} onClose={() => this.setState({ showAlert: false })} dismissible>
                                {alertMessage}
                            </Alert>
                        )}

                        <Form>
                            <div style={{ display: 'inline-flex' }}>
                                <div id='leftDiv'>
                                    {bookImageUrl ? (
                                        <img
                                            src={bookImageUrl}
                                            alt="Book Cover"
                                            height={300}
                                            width={200}
                                        />
                                    ) : (
                                        <img src="" alt="" height={300} width={200} />
                                    )}
                                </div>
                                <div id='rightDiv' style={{ flex: '1', marginLeft: '20px', width: '469px' }}>
                                    <Form.Label>Book Image</Form.Label>
                                    <Form.Group controlId="formFile" className="mb-3">
                                        <Form.Control type="file" accept="image/jpeg, image/png" onChange={this.handleImageChange} />
                                    </Form.Group>
                                    <Form.Control type="text" placeholder="Enter Book Title" value={bookTitle} onChange={(e) => this.setState({ bookTitle: e.target.value })} /><br />
                                    <Form.Control type="text" placeholder="Enter Book Author" value={authorName} onChange={(e) => this.setState({ authorName: e.target.value })} /><br />

                                    <Dropdown>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            {selectedGenre}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => this.setState({ selectedGenre: "Historical Fiction" })}>Historical Fiction</Dropdown.Item>
                                            <Dropdown.Item onClick={() => this.setState({ selectedGenre: "Crime and Mystery" })}>Crime and Mystery</Dropdown.Item>
                                            <Dropdown.Item onClick={() => this.setState({ selectedGenre: "Horror" })}>Horror</Dropdown.Item>
                                            <Dropdown.Item onClick={() => this.setState({ selectedGenre: "Science Fiction" })}>Science Fiction</Dropdown.Item>
                                            <Dropdown.Item onClick={() => this.setState({ selectedGenre: "Fantasy" })}>Fantasy</Dropdown.Item>
                                            <Dropdown.Item onClick={() => this.setState({ selectedGenre: "Education" })}>Education</Dropdown.Item>
                                            <Dropdown.Item onClick={() => this.setState({ selectedGenre: "Romance" })}>Romance</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown><br />

                                    <Form.Label>Book Content</Form.Label>
                                    <Form.Group controlId="formFile" className="mb-3">
                                        <Form.Control type="file" accept=".pdf" onChange={this.handleContentChange} />
                                    </Form.Group>
                                    <div style={{textAlign: "center"}}>
                                        <Button variant="success" onClick={this.storeBook} disabled={loading}>
                                            {loading ? <Spinner animation="border" size="sm" /> : 'Store Book'}
                                        </Button>
                                    </div>
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
        );
    }

}

export default CreateModalBook;
