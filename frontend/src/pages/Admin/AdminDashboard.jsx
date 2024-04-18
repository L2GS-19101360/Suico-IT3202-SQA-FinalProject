import { Component, useState } from 'react'
import { Container, Nav, Navbar, NavDropdown, Button } from 'react-bootstrap'
import webName from '../../assets/website name.jpg'
import ClockComponent from '../../components/ClockComponent'
import AdminSidebar from '../../components/Admin/AdminSidebar'
import AdminNavbar from '../../components/Admin/AdminNavbar'

class AdminDashboard extends Component {

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
                <AdminNavbar />
                <div>
                    <h1>Admin Dashboard</h1>
                </div>
            </div>
        );
    }

}

export default AdminDashboard
