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

            bookContentUrl: null,
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

        const selectedImageFile = this.state.bookImageFile;
        const selectedImageContent = this.state.bookContentFile;
        const apiLinks = [
            'https://suico-it3202-sqa-finalproject-backend.onrender.com/api/book-image',
            'http://localhost:3306/api/book-image',
            'https://suico-it3202-sqa-finalproject-backend.onrender.com/api/book-content',
            'http://localhost:3306/api/book-content',
            'https://suico-it3202-sqa-finalproject-backend.onrender.com/api/books/',
            'http://localhost:3306/api/books/',
            `https://suico-it3202-sqa-finalproject-backend.onrender.com/api/book-image/${this.state.oldImageFileName}`,
            `http://localhost:3306/api/book-image/${this.state.oldImageFileName}`,
            `https://suico-it3202-sqa-finalproject-backend.onrender.com/api/book-content/${this.state.oldContentFileName}`,
            `http://localhost:3306/api/book-content/${this.state.oldContentFileName}`,
            `https://suico-it3202-sqa-finalproject-backend.onrender.com/api/books/${this.state.selectedBookId}`,
            `http://localhost:3306/api/books/${this.state.selectedBookId}`
        ];

        console.log(this.state.selectedBookId + " " + this.state.oldImageFileName + " " + this.state.oldContentFileName + " " + selectedImageFile + " " + selectedImageContent + " ");

        axios.delete(apiLinks[6])
        axios.delete(apiLinks[8])

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
                                console.log('Book Image Name:', this.state.bookImageFileName);
                                console.log('Book Title:', this.state.bookTitle);
                                console.log('Author Name:', this.state.authorName);
                                console.log('Selected Genre:', this.state.selectedGenre);
                                console.log('Book Content Name:', this.state.bookContentFileName);
                                console.log('Book Content URL:', this.state.bookContentURL);

                                const data = {
                                    image_filename: this.state.bookImageFileName,
                                    image: this.state.bookImageURL,
                                    name: this.state.bookTitle,
                                    author: this.state.authorName,
                                    genre: this.state.selectedGenre,
                                    content_filename: this.state.bookContentFileName,
                                    content: this.state.bookContentURL
                                };

                                // console.log(data);

                                try {
                                    const response = await axios.put(apiLinks[10], data);
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
