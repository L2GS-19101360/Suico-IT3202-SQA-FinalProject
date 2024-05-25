import { Component } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { FaBook } from 'react-icons/fa';

class ViewModalBook extends Component {
    constructor() {
        super();
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.createBorrowRequest = this.createBorrowRequest.bind(this);
        this.state = {
            show: false,
            loading: false,
            userId: localStorage.getItem("userId"),
        };
    }

    componentDidMount() {
        console.log(this.state.userId);
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    createBorrowRequest = (bookId) => {
        console.log(this.state.userId + " ", bookId);

        const data = {
            user_id_fk: this.state.userId,
            book_id_fk: bookId
        };

        const apiLink = [
            `https://suico-it3202-sqa-finalproject-backend.onrender.com/api/borrow-books-request`,
            `http://localhost:3306/api/borrow-books-request`
        ];

        this.setState({ loading: true }); // Set loading state to true

        axios.post(apiLink[0], data)
            .then((response) => {
                console.log(response);
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
                this.setState({ loading: false }); // Reset loading state on error
            });
    }

    render() {
        const { show, handleClose, book } = this.props;
        const { loading } = this.state;

        return (
            <div>
                <Modal show={show} onHide={handleClose} size='lg' aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Header closeButton>
                        <Modal.Title><FaBook /> {book.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div style={{ display: 'inline-flex' }}>
                            <div id='leftDiv'>
                                <img
                                    src={book.image}
                                    alt="Book Cover"
                                    height={300}
                                    width={200}
                                />
                            </div>
                            <div id='rightDiv' style={{ flex: '1', marginLeft: '20px', width: '469px' }}>
                                <h2 style={{ marginBottom: "20px" }}>Title: {book.name}</h2>
                                <h2 style={{ marginBottom: "20px" }}>Author: {book.author}</h2>
                                <h2 style={{ marginBottom: "30px" }}>Genre: {book.genre}</h2>
                                <div style={{ textAlign: "center" }}>
                                    <Button
                                        variant="success"
                                        onClick={() => this.createBorrowRequest(book.id)}
                                        disabled={loading}
                                    >
                                        {loading ? <Spinner as="span" animation="border" size="sm" /> : <h4><FaBook /> Borrow Book</h4>}
                                    </Button>
                                </div>
                            </div>
                        </div>
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

export default ViewModalBook;
