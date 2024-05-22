import { Component, useState } from 'react'
import { Container, Nav, Navbar, NavDropdown, Button } from 'react-bootstrap'
import webName from '../../assets/website name.jpg'
import ClockComponent from '../../components/ClockComponent'
import UserSidebar from '../../components/User/UserSidebar'
import UserNavbar from '../../components/User/UserNavbar'

class UserBookShelf extends Component {

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
                <UserNavbar />
                <div>
                    <h1>User Book Shelf</h1>
                </div>
            </div>
        );
    }

}

export default UserBookShelf
