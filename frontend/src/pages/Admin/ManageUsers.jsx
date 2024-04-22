import { Component, useState } from 'react'
import { Container, Nav, Navbar, NavDropdown, Button, Form, InputGroup, Dropdown } from 'react-bootstrap'
import webName from '../../assets/website name.jpg'
import ClockComponent from '../../components/ClockComponent'
import AdminSidebar from '../../components/Admin/AdminSidebar'
import AdminNavbar from '../../components/Admin/AdminNavbar'
import { withRouter } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'

class ManageUsers extends Component {

    constructor() {
        super();
        this.state = {
            selectedOption: "All"
        }
    }

    componentDidMount() {

    }
    componentWillUnmount() {

    }

    handleOptionSelect = (option) => {
        this.setState({ selectedOption: option });
    };

    render() {
        const { selectedOption } = this.state;

        return (
            <div>
                <AdminNavbar />
                <div>
                    <h1>Manage User Page</h1>
                    <div style={{ padding: "1%" }}>
                        <Form>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="Enter User Information"
                                />
                                <Button variant="secondary" id="button-addon2">
                                    <FaSearch />
                                </Button>
                            </InputGroup>

                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    {selectedOption}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => this.handleOptionSelect("All")}>All</Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.handleOptionSelect("Users")}>Users</Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.handleOptionSelect("Librarian")}>Librarian</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Form>
                    </div>
                </div>
                <div>
                    
                </div>
            </div>
        );
    }

}

export default withRouter(ManageUsers)
