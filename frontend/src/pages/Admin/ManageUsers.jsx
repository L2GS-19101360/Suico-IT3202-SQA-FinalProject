import { Component } from 'react';
import { Container, Nav, Navbar, NavDropdown, Button, Form, InputGroup, Dropdown, Table, Spinner } from 'react-bootstrap';
import webName from '../../assets/website name.jpg';
import ClockComponent from '../../components/ClockComponent';
import AdminSidebar from '../../components/Admin/AdminSidebar';
import AdminNavbar from '../../components/Admin/AdminNavbar';
import { withRouter } from 'react-router-dom';
import { FaSearch, FaLock, FaUnlockAlt } from 'react-icons/fa';
import axios from 'axios';
import CreateModalLibrarian from '../../components/Admin/CreateModalLibrarian';
import wallpaper from '../../assets/wallpaper.jpeg'; // Import the wallpaper image

class ManageUsers extends Component {

    constructor(props) {
        super(props);
        this.getAllUsers = this.getAllUsers.bind(this);
        this.deactivateUser = this.deactivateUser.bind(this);
        this.searchUser = this.searchUser.bind(this);
        this.state = {
            selectedUserOption: "all",
            selectedStatusOption: "all",
            users: [],
            searchInput: "",
            loading: {}  // State to track loading for each user action
        }
    }

    componentDidMount() {
        this.getAllUsers(this.state.selectedUserOption);
    }

    getAllUsers(selectedUserOption) {
        let apiLink;
        if (selectedUserOption === "all") {
            apiLink = 'https://suico-it3202-sqa-finalproject-backend.onrender.com/api/users/';
        } else {
            apiLink = `https://suico-it3202-sqa-finalproject-backend.onrender.com/api/users/role/${selectedUserOption}`;
        }
    
        axios.get(apiLink)
            .then(response => {
                this.setState({ users: response.data.data });
            })
            .catch(error => {
                console.log(error);
            });
    }

    activateUser = (userId) => {
        const apiLinks = [
            `https://suico-it3202-sqa-finalproject-backend.onrender.com/api/users/activateUser/${userId}`,
            `http://localhost:3306/api/users/activateUser/${userId}`,
        ];

        const data = { active_status: 1 };

        this.setState(prevState => ({
            loading: { ...prevState.loading, [userId]: true }
        }));

        axios.put(apiLinks[0], data)
            .then(response => {
                this.getAllUsers(this.state.selectedUserOption);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                this.setState(prevState => ({
                    loading: { ...prevState.loading, [userId]: false }
                }));
            });
    }

    deactivateUser = (userId) => {
        const apiLinks = [
            `https://suico-it3202-sqa-finalproject-backend.onrender.com/api/users/deactivateUser/${userId}`,
            `http://localhost:3306/api/users/deactivateUser/${userId}`,
        ];

        const data = { active_status: 0 };

        this.setState(prevState => ({
            loading: { ...prevState.loading, [userId]: true }
        }));

        axios.put(apiLinks[0], data)
            .then(response => {
                this.getAllUsers(this.state.selectedUserOption);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                this.setState(prevState => ({
                    loading: { ...prevState.loading, [userId]: false }
                }));
            });
    }

    searchUser = () => {
        const { searchInput, users } = this.state;
        const searchQuery = searchInput.trim();

        if (searchQuery === "") {
            this.getAllUsers(this.state.selectedUserOption);
        } else {
            const filteredUsers = users.filter(user =>
                user.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.lastname.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.email.toLowerCase().includes(searchQuery.toLowerCase())
            );

            this.setState({ users: filteredUsers });
        }
    };

    handleOptionStatusSelect = (option) => {
        const statusValue = option === "active" ? "1" : "0";
        this.setState({ selectedStatusOption: option }, () => {
            this.getAllUsers(statusValue);
        });
    }

    handleOptionUserSelect = (option) => {
        this.setState({ selectedUserOption: option }, () => {
            this.getAllUsers(option);
        });
    };

    render() {
        const { selectedUserOption, users, loading } = this.state;

        // Styles for the overlay and the content
        const styles = {
            container: {
                position: 'relative',
                height: '100vh',
                width: '100%',
                overflow: 'hidden',
            },
            overlay: {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `url(${wallpaper})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                opacity: 0.1, // Adjust the opacity as needed
                zIndex: -1, // Ensure the overlay is behind other content
            },
            content: {
                position: 'relative',
                zIndex: 1, // Ensure content is above the overlay
                padding: '20px',
            },
        };

        return (
            <div style={styles.container}>
                <AdminNavbar />
                <div style={styles.overlay}></div>
                <div style={styles.content}>
                    <h1>Manage User Page</h1>
                    <div style={{ textAlign: "center", marginBottom: "10px" }}>
                        <div style={{ padding: "1%" }}>
                            <Form>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        placeholder="Enter User Information"
                                        value={this.state.searchInput}
                                        onChange={(e) => { this.setState({ searchInput: e.target.value }, this.searchUser) }}
                                    />
                                </InputGroup>

                                <div style={{ display: "inline-flex", gap: "20px" }}>
                                    <CreateModalLibrarian />

                                    <Dropdown>
                                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                                            {selectedUserOption}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => this.handleOptionUserSelect("all")}>all</Dropdown.Item>
                                            <Dropdown.Item onClick={() => this.handleOptionUserSelect("user")}>user</Dropdown.Item>
                                            <Dropdown.Item onClick={() => this.handleOptionUserSelect("librarian")}>librarian</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </Form>
                        </div>
                    </div>
                    <div style={{ textAlign: "center", height: "600px", overflowY: "auto" }}>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Active Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.filter(user => user.role !== "admin").map(user => (
                                    <tr key={user.id}>
                                        <td>
                                            {user.image !== "#%&{}>" ? <img src={user.image} height={75} width={75} alt="" /> : <img src={`https://ui-avatars.com/api/?name=${user.firstname}+${user.lastname}&background=random&size=75`} alt="" />}
                                        </td>
                                        <td>{user.firstname}</td>
                                        <td>{user.lastname}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                        <td>{user.active_status ? <p style={{ color: "green", fontWeight: "bolder" }}>active</p> : <p style={{ color: "red", fontWeight: "bolder" }}>inactive</p>}</td>
                                        <td>
                                            {user.active_status ?
                                                (<Button variant="danger" onClick={() => this.deactivateUser(user.id)}>
                                                    {loading[user.id] ? <Spinner animation="border" size="sm" /> : <FaLock />}
                                                </Button>) :
                                                (<Button variant="success" onClick={() => this.activateUser(user.id)}>
                                                    {loading[user.id] ? <Spinner animation="border" size="sm" /> : <FaUnlockAlt />}
                                                </Button>)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        );
    }

}

export default withRouter(ManageUsers);
