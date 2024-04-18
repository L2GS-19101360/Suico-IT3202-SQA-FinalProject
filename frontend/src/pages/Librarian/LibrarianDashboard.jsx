import { Component, useState } from 'react'
import { Container, Nav, Navbar, NavDropdown, Button } from 'react-bootstrap'
import webName from '../../assets/website name.jpg'
import ClockComponent from '../../components/ClockComponent'
import LibrarianSidebar from '../../components/Librarian/LibrarianSidebar'
import LibrarianNavbar from '../../components/Librarian/LibrarianNavbar'

class LibrarianDashboard extends Component {

    constructor() {
        super();
        this.state = {

        }
    }

    componentDidMount() {

    }
    componentWillUnmount() {

    }

    render() {
        return (
            <div>
                <LibrarianNavbar />
                <div>
                    <h1>Librarian Dashboard</h1>
                </div>
            </div>
        );
    }

}

export default LibrarianDashboard
