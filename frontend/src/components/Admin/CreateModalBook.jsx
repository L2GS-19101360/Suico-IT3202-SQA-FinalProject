import { Component, useState } from 'react'
import { Container, Nav, Navbar, NavDropdown, Button, Form, InputGroup, Dropdown, Table, Modal, Spinner } from 'react-bootstrap'
import webName from '../../assets/website name.jpg'
import ClockComponent from '../../components/ClockComponent'
import AdminSidebar from '../../components/Admin/AdminSidebar'
import AdminNavbar from '../../components/Admin/AdminNavbar'
import axios from 'axios'
import { FaSearch, FaLock, FaUnlockAlt, FaBook } from 'react-icons/fa'

class CreateModalBook extends Component {

    constructor() {
        super();
        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.storeBook = this.storeBook.bind(this);
        this.state = {
            show: false,
            loading: false,

            bookImageUrl: null,
            bookImageFile: null,

            bookContentUrl: null,
            bookContentFile: null,

            bookImageURL: "",
            bookTitle: "",
            authorName: "",
            selectedGenre: "Select Genre",
            bookGenre: "",
            bookContentURL: ""
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
        this.setState({ loading: true }); // Set loading to true when saving starts

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

                this.setState({ bookImageURL: response.data.imageUrl }, async () => {
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

                            this.setState({ bookContentURL: response.data.pdfUrl }, async () => {
                                console.log('Book Image URL:', this.state.bookImageURL);
                                console.log('Book Title:', this.state.bookTitle);
                                console.log('Author Name:', this.state.authorName);
                                console.log('Selected Genre:', this.state.selectedGenre);
                                console.log('Book Content URL:', this.state.bookContentURL);

                                const data = {
                                    image: this.state.bookImageURL,
                                    name: this.state.bookTitle,
                                    author: this.state.authorName,
                                    genre: this.state.selectedGenre,
                                    content: this.state.bookContentURL
                                };

                                try {
                                    const response = await axios.post(apiLinks[4], data);
                                    console.log(response);
                                    this.setState({ loading: false }); // Set loading to false when saving finishes
                                    window.location.reload();
                                } catch (error) {
                                    console.log(error);
                                    this.setState({ loading: false }); // Set loading to false in case of error
                                }
                            });
                        } catch (error) {
                            console.error('Error uploading file:', error);
                            this.setState({ loading: false }); // Set loading to false in case of error
                        }
                    }
                });

            } catch (error) {
                console.error('Error uploading file:', error);
                this.setState({ loading: false }); // Set loading to false in case of error
            }
        }
    };

    render() {
        return (
            <div>
                <Button variant="success" onClick={this.handleShow}>
                    <FaBook /> Create New Book
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose} size='lg' aria-labelledby="contained-modal-title-vcenter" centered>
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
                                    <Form.Label>Book Image</Form.Label>
                                    <Form.Group controlId="formFile" className="mb-3">
                                        <Form.Control type="file" accept="image/jpeg, image/png" onChange={this.handleImageChange} />
                                    </Form.Group>
                                    <Form.Control type="text" placeholder="Enter Book Title" value={this.state.bookTitle} onChange={(e) => (this.setState({ bookTitle: e.target.value }))} /><br />
                                    <Form.Control type="text" placeholder="Enter Book Author" value={this.state.authorName} onChange={(e) => (this.setState({ authorName: e.target.value }))} /><br />

                                    <Dropdown>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            {this.state.selectedGenre}
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
                                    <Button variant="success" onClick={this.storeBook} disabled={this.state.loading}>
                                        {this.state.loading ? (
                                            <Spinner animation="border" />
                                        ) : (
                                            'Store Book'
                                        )}
                                    </Button>
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

export default CreateModalBook
