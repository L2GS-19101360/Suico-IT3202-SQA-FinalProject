import { Component } from 'react';
import { Container, Nav, Navbar, NavDropdown, Button, Form, InputGroup, Dropdown, Table } from 'react-bootstrap';
import webName from '../../assets/website name.jpg';
import ClockComponent from '../../components/ClockComponent';
import AdminSidebar from '../../components/Admin/AdminSidebar';
import AdminNavbar from '../../components/Admin/AdminNavbar';
import { withRouter } from 'react-router-dom';
import { FaSearch, FaLock, FaUnlockAlt } from 'react-icons/fa';
import axios from 'axios';

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
            searchInput: ""
        }
    }

    componentDidMount() {
        this.getAllUsers(this.state.selectedUserOption);
    }

    getAllUsers(selectedUserOption) {
        const apiLinks = [
            'https://suico-it3202-sqa-finalproject-backend.onrender.com/api/users/',
            'http://localhost:3306/api/users/',
            `https://suico-it3202-sqa-finalproject-backend.onrender.com/api/users/role/${selectedUserOption}`,
            `http://localhost:3306/api/users/role/${selectedUserOption}`,
            `https://suico-it3202-sqa-finalproject-backend.onrender.com/api/users/active-status/${selectedUserOption}`,
            `http://localhost:3306/api/users/active-status/${selectedUserOption}`
        ];

        if (selectedUserOption === "all") {
            axios.get(apiLinks[0])
                .then(response => {
                    this.setState({ users: response.data.data });
                })
                .catch(error => {
                    console.log(error);
                });
        } else if (selectedUserOption === "user" || selectedUserOption === "librarian") {
            axios.get(apiLinks[2])
                .then(response => {
                    this.setState({ users: response.data.data });
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            axios.get(apiLinks[4])
                .then(response => {
                    this.setState({ users: response.data.data });
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    activateUser = (userId) => {
        const apiLinks = [
            `https://suico-it3202-sqa-finalproject-backend.onrender.com/api/users/activateUser/${userId}`,
            `http://localhost:3306/api/users/activateUser/${userId}`,
        ];

        const data = { active_status: 1 };

        axios.put(apiLinks[0], data)
            .then(response => {
                this.getAllUsers(this.state.selectedUserOption);
            })
            .catch(error => {
                console.log(error);
            });
    }

    deactivateUser = (userId) => {
        const apiLinks = [
            `https://suico-it3202-sqa-finalproject-backend.onrender.com/api/users/deactivateUser/${userId}`,
            `http://localhost:3306/api/users/deactivateUser/${userId}`,
        ];

        const data = { active_status: 0 };

        axios.put(apiLinks[0], data)
            .then(response => {
                this.getAllUsers(this.state.selectedUserOption);
            })
            .catch(error => {
                console.log(error);
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
        const { selectedUserOption, users } = this.state;

        return (
            <div>
                <AdminNavbar />
                <h1>Manage User Page</h1>
                <div style={{ textAlign: "center" }}>
                    <div style={{ padding: "1%" }}>
                        <Form>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="Enter User Information"
                                    value={this.state.searchInput}
                                    onChange={(e) => { this.setState({ searchInput: e.target.value }, this.searchUser) }}
                                />
                            </InputGroup>

                            <div style={{ display: "inline-flex" }}>
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
                                                <FaLock />
                                            </Button>) :
                                            (<Button variant="success" onClick={() => this.activateUser(user.id)}>
                                                <FaUnlockAlt />
                                            </Button>)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }

}

export default withRouter(ManageUsers);
