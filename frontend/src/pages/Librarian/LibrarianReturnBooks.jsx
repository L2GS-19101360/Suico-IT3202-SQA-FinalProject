import { Component, useState } from 'react'
import { Container, Nav, Navbar, NavDropdown, Button } from 'react-bootstrap'
import webName from '../../assets/website name.jpg'
import ClockComponent from '../../components/ClockComponent'
import LibrarianSidebar from '../../components/Librarian/LibrarianSidebar'
import LibrarianNavbar from '../../components/Librarian/LibrarianNavbar'

class LibrarianReturnBooks extends Component {

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
                    <h1>Return Books Request Page</h1>
                </div>
            </div>
        );
    }

}

export default LibrarianReturnBooks