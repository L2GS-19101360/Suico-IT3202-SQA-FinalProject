import React, { Component } from 'react';
import { Button, Form, Modal, Spinner, Alert, Dropdown } from 'react-bootstrap';
import { FaBook } from 'react-icons/fa';
import axios from 'axios';

class CreateModalBook extends Component {
    constructor() {
        super();
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
            bookTitle: "",
            authorName: "",
            selectedGenre: "Select Genre",
        };
    }

    handleClose = () => {
        this.setState({ show: false, showAlert: false });
    }

    handleShow = () => {
        this.setState({ show: true });
    }

    handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            this.setState({
                bookImageUrl: URL.createObjectURL(file),
                bookImageFile: file,
                bookImageFileName: file.name
            });
        }
    }

    handleContentChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/pdf') {
            this.setState({
                bookContentUrl: URL.createObjectURL(file),
                bookContentFile: file,
                bookContentFileName: file.name
            });
        } else {
            alert('Please select a PDF file.');
        }
    }

    validateInputs = () => {
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

        if (!this.validateInputs()) return;

        this.setState({ loading: true, showAlert: false });

        try {
            const { bookImageFile, bookContentFile } = this.state;

            const formData = new FormData();
            formData.append('file', bookImageFile);

            const imageResponse = await axios.post('https://suico-it3202-sqa-finalproject-backend.onrender.com/api/book-image', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            const contentData = new FormData();
            contentData.append('file', bookContentFile);

            const contentResponse = await axios.post('https://suico-it3202-sqa-finalproject-backend.onrender.com/api/book-content', contentData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            const bookData = {
                image_filename: this.state.bookImageFileName,
                image: imageResponse.data.imageUrl,
                name: this.state.bookTitle,
                author: this.state.authorName,
                genre: this.state.selectedGenre,
                content_filename: this.state.bookContentFileName,
                content: contentResponse.data.pdfUrl
            };

            await axios.post('https://suico-it3202-sqa-finalproject-backend.onrender.com/api/books/', bookData);

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
                <Button variant="success" onClick={this.handleShow} className="create-book-button">
                    <FaBook /> Create New Book
                </Button>

                <Modal show={show} onHide={this.handleClose} size='lg' aria-labelledby="contained-modal-title-vcenter" centered className="create-book-modal">
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
                                        <img src={bookImageUrl} alt="Book Cover" height={300} width={200} />
                                    ) : (
                                        <img src="" alt="" height={300} width={200} />
                                    )}
                                </div>
                                <div id='rightDiv' style={{ flex: '1', marginLeft: '20px', width: '469px' }}>
                                    <Form.Label>Book Image</Form.Label>
                                    <Form.Group controlId="formFileImage" className="mb-3">
                                        <Form.Control type="file" accept="image/jpeg, image/png" onChange={this.handleImageChange} className="book-image-input"/>
                                    </Form.Group>
                                    <Form.Control type="text" placeholder="Enter Book Title" value={bookTitle} onChange={(e) => this.setState({ bookTitle: e.target.value })} className="book-title-input"/><br />
                                    <Form.Control type="text" placeholder="Enter Book Author" value={authorName} onChange={(e) => this.setState({ authorName: e.target.value })} className="book-author-input"/><br />

                                    <Dropdown onSelect={(eventKey) => this.setState({ selectedGenre: eventKey })}>
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            {selectedGenre}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className="genre-dropdown">
                                            <Dropdown.Item eventKey="Historical Fiction">Historical Fiction</Dropdown.Item>
                                            <Dropdown.Item eventKey="Crime and Mystery">Crime and Mystery</Dropdown.Item>
                                            <Dropdown.Item eventKey="Horror">Horror</Dropdown.Item>
                                            <Dropdown.Item eventKey="Science Fiction">Science Fiction</Dropdown.Item>
                                            <Dropdown.Item eventKey="Fantasy">Fantasy</Dropdown.Item>
                                            <Dropdown.Item eventKey="Education">Education</Dropdown.Item>
                                            <Dropdown.Item eventKey="Romance">Romance</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown><br />

                                    <Form.Label>Book Content</Form.Label>
                                    <Form.Group controlId="formFileContent" className="mb-3">
                                        <Form.Control type="file" accept=".pdf" onChange={this.handleContentChange} className="book-content-input"/>
                                    </Form.Group>
                                    <div style={{ textAlign: "center" }}>
                                        <Button variant="success" onClick={this.storeBook} disabled={loading} className="store-book">
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
