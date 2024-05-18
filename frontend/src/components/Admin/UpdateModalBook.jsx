import React, { Component } from 'react';
import { Container, Nav, Navbar, NavDropdown, Button, Form, InputGroup, Dropdown, Table, Modal, Spinner } from 'react-bootstrap';
import { FaBook } from 'react-icons/fa';

class UpdateModalBook extends Component {
    constructor(props) {
        super(props);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.state = {
            loading: false,

            bookImageUrl: props.book.image,
            bookImageFile: null,
            bookImageFileName: "",

            bookContentUrl: null,
            bookContentFile: null,
            bookContentFileName: "",

            selectedGenre: props.book.genre,
            bookTitle: props.book.name,
            authorName: props.book.author,
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
