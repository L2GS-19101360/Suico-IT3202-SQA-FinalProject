import { Component, useState } from 'react'
import { Container, Nav, Navbar, NavDropdown, Button } from 'react-bootstrap'
import webName from '../../assets/website name.jpg'
import ClockComponent from '../ClockComponent'
import { withRouter } from 'react-router-dom'
import UserSidebar from './UserSidebar'

class UserNavbar extends Component {

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
                <Navbar expand="lg" className="bg-body-tertiary">
                    <Container>
                        <Navbar.Brand>
                            <img src={webName} alt="" height={75} width={75} /> &nbsp; L2GS Library System
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
                            <Nav>

                            </Nav>
                            <Nav>
                                <ClockComponent />
                            </Nav>
                            <Nav>
                                <Nav.Item>
                                    <UserSidebar />
                                </Nav.Item>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }

}

export default withRouter(UserNavbar)
