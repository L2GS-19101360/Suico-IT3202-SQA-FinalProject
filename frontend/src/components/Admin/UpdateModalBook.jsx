import React, { Component } from 'react';
import { Button, Form, Modal, Spinner, Alert } from 'react-bootstrap';
import { FaBook } from 'react-icons/fa';
import axios from 'axios';

class UpdateModalBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            showAlert: false,
            alertMessage: "",
            alertVariant: "danger",
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
            oldContentFileName: props.book.content_filename,
            allowedGenres: [
                "Historical Fiction",
                "Crime and Mystery",
                "Horror",
                "Science Fiction",
                "Education",
                "Romance",
                "Fantasy"
            ]
        };
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
        const { bookTitle, authorName, selectedGenre, allowedGenres } = this.state;
        if (!bookTitle || !authorName || !selectedGenre) {
            this.setState({
                showAlert: true,
                alertMessage: "All fields are required.",
                alertVariant: "danger"
            });
            return false;
        }
        if (!allowedGenres.includes(selectedGenre)) {
            this.setState({
                showAlert: true,
                alertMessage: "Please enter a valid genre: Historical Fiction, Crime and Mystery, Horror, Science Fiction, Education, Romance, Fantasy",
                alertVariant: "danger"
            });
            return false;
        }
        return true;
    }

    updateBook = async (event) => {
        event.preventDefault();
        if (!this.validateInputs()) return;

        this.setState({ loading: true, showAlert: false });

        try {
            const { bookImageFile, bookContentFile, selectedBookId, oldImageFileName, oldContentFileName, bookTitle, authorName, selectedGenre } = this.state;

            const apiLinks = [
                'https://suico-it3202-sqa-finalproject-backend.onrender.com/api/book-image',
                'https://suico-it3202-sqa-finalproject-backend.onrender.com/api/book-content',
                `https://suico-it3202-sqa-finalproject-backend.onrender.com/api/book-image/${oldImageFileName}`,
                `https://suico-it3202-sqa-finalproject-backend.onrender.com/api/book-content/${oldContentFileName}`,
                `https://suico-it3202-sqa-finalproject-backend.onrender.com/api/books/${selectedBookId}`
            ];

            let bookImageURL = this.state.bookImageUrl;
            let bookContentURL = this.state.bookContentUrl;

            if (bookImageFile) {
                const formImageData = new FormData();
                formImageData.append('file', bookImageFile);
                const imageResponse = await axios.post(apiLinks[0], formImageData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                bookImageURL = imageResponse.data.imageUrl;
                await axios.delete(apiLinks[2]);
            }

            if (bookContentFile) {
                const formContentData = new FormData();
                formContentData.append('file', bookContentFile);
                const contentResponse = await axios.post(apiLinks[1], formContentData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                bookContentURL = contentResponse.data.pdfUrl;
                await axios.delete(apiLinks[3]);
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

            await axios.put(apiLinks[4], data);
            this.setState({ loading: false });
            window.location.reload();
        } catch (error) {
            console.error('Error updating book:', error);
            this.setState({
                loading: false,
                showAlert: true,
                alertMessage: "Failed to connect to the server.",
                alertVariant: "danger"
            });
        }
    }

    render() {
        const { show, handleClose } = this.props;
        const { showAlert, alertMessage, alertVariant, loading, allowedGenres, selectedGenre, bookImageUrl, bookTitle, authorName } = this.state;

        return (
            <div>
                <Modal show={show} onHide={handleClose} size='lg' aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title><FaBook /> Update Book</Modal.Title>
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
                                    <Form.Group controlId="formFile" className="mb-3">
                                        <Form.Control className="book-image-input" type="file" accept="image/jpeg, image/png" onChange={this.handleImageChange} />
                                    </Form.Group>

                                    <Form.Control className="book-title-input" type="text" placeholder="Enter Book Title" value={bookTitle} onChange={(e) => this.setState({ bookTitle: e.target.value })} /><br />
                                    <Form.Control className="book-author-input" type="text" placeholder="Enter Book Author" value={authorName} onChange={(e) => this.setState({ authorName: e.target.value })} /><br />

                                    <Form.Control className="book-genre-input" type="text" placeholder="Enter Book Genre" value={selectedGenre} onChange={(e) => this.setState({ selectedGenre: e.target.value })} /><br />

                                    <Form.Label>Book Content</Form.Label>
                                    <Form.Group controlId="formFile" className="mb-3">
                                        <Form.Control className="book-content-input" type="file" accept=".pdf" onChange={this.handleContentChange} />
                                    </Form.Group>
                                    <div style={{ textAlign: "center" }}>
                                        <Button variant="warning" onClick={this.updateBook} disabled={loading}>
                                            {loading ? (
                                                <Spinner animation="border" />
                                            ) : (
                                                'Update Book'
                                            )}
                                        </Button>
                                    </div>
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
