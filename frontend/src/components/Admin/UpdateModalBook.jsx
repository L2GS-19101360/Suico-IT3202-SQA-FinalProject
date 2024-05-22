import React, { Component } from 'react';
import { Container, Nav, Navbar, NavDropdown, Button, Form, InputGroup, Dropdown, Table, Modal, Spinner } from 'react-bootstrap';
import { FaBook } from 'react-icons/fa';
import axios from 'axios';

class UpdateModalBook extends Component {
    constructor(props) {
        super(props);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.updateBook = this.updateBook.bind(this);
        this.state = {
            loading: false,

            bookImageUrl: props.book.image,
            bookImageFile: null,
            bookImageFileName: "",

            bookContentUrl: props.book.content,
            bookContentFile: null,
            bookContentFileName: "",

            selectedBookId: props.book.id,

            selectedGenre: props.book.genre,
            bookTitle: props.book.name,
            authorName: props.book.author,

            oldImageFileName: props.book.image_filename,
            oldContentFileName: props.book.content_filename
        };
    }

    handleImageChange(e) {
        const file = e.target.files[0];
        if (file) {
            const fileName = file.name;
            this.setState({
                bookImageUrl: URL.createObjectURL(file) || null, // Reset to null when new image selected
                bookImageFile: file,
                bookImageFileName: fileName
            });
        }
    }

    handleContentChange(e) {
        const file = e.target.files[0];
        if (file) {
            const fileName = file.name;
            // Ensure the file type is PDF before setting the state
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

    updateBook = async (event) => {
        event.preventDefault();
        this.setState({ loading: true });
    
        const { bookImageFile, bookContentFile, selectedBookId, oldImageFileName, oldContentFileName, bookTitle, authorName, selectedGenre } = this.state;
        const apiLinks = [
            'https://suico-it3202-sqa-finalproject-backend.onrender.com/api/book-image',
            'http://localhost:3306/api/book-image',
            'https://suico-it3202-sqa-finalproject-backend.onrender.com/api/book-content',
            'http://localhost:3306/api/book-content',
            'https://suico-it3202-sqa-finalproject-backend.onrender.com/api/books/',
            'http://localhost:3306/api/books/',
            `https://suico-it3202-sqa-finalproject-backend.onrender.com/api/book-image/${oldImageFileName}`,
            `http://localhost:3306/api/book-image/${oldImageFileName}`,
            `https://suico-it3202-sqa-finalproject-backend.onrender.com/api/book-content/${oldContentFileName}`,
            `http://localhost:3306/api/book-content/${oldContentFileName}`,
            `https://suico-it3202-sqa-finalproject-backend.onrender.com/api/books/${selectedBookId}`,
            `http://localhost:3306/api/books/${selectedBookId}`
        ];
    
        let bookImageURL = this.state.bookImageUrl;
        let bookContentURL = this.state.bookContentUrl;
    
        try {
            if (bookImageFile) {
                const formImageData = new FormData();
                formImageData.append('file', bookImageFile);
                const imageResponse = await axios.post(apiLinks[0], formImageData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                bookImageURL = imageResponse.data.imageUrl;
    
                // Delete old image file
                await axios.delete(apiLinks[6]);
            }
    
            if (bookContentFile) {
                const formContentData = new FormData();
                formContentData.append('file', bookContentFile);
                const contentResponse = await axios.post(apiLinks[2], formContentData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                bookContentURL = contentResponse.data.pdfUrl;
    
                // Delete old content file
                await axios.delete(apiLinks[8]);
            }
    
            const data = {
                image_filename: this.state.bookImageFileName || oldImageFileName,
                image: bookImageURL,
                name: bookTitle,
                author: authorName,
                genre: selectedGenre,
                content_filename: this.state.bookContentFileName || oldContentFileName,
                content: bookContentURL,
            };
    
            await axios.put(apiLinks[10], data);
            this.setState({ loading: false });
            window.location.reload();
        } catch (error) {
            console.error('Error updating book:', error);
            this.setState({ loading: false });
        }
    }

    render() {
        const { show, handleClose, book } = this.props;

        return (
            <div>
                <Modal show={show} onHide={handleClose} size='lg' aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title><FaBook /> Update Book</Modal.Title>
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
                                    <Button variant="warning" onClick={this.updateBook} disabled={this.state.loading}>
                                        {this.state.loading ? (
                                            <Spinner animation="border" />
                                        ) : (
                                            'Update Book'
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </Form>
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

export default UpdateModalBook;
