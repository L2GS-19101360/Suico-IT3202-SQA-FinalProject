import { Component, useState } from 'react'
import { Container, Nav, Navbar, NavDropdown, Button } from 'react-bootstrap'
import webName from '../assets/website name.jpg'
import ClockComponent from '../components/ClockComponent'
import { withRouter } from 'react-router-dom'

class GeneralNavbar extends Component {

  constructor() {
    super();
    this.toLoginPage = this.toLoginPage.bind(this);
    this.toRegisterPage = this.toRegisterPage.bind(this);
    this.state = {

    }
  }

  componentDidMount() {

  }
  componentWillUnmount() {

  }

  toLoginPage() {
    this.props.history.push('LoginPage');
  }
  toRegisterPage () {
    this.props.history.push('RegisterPage');
  }

  render() {
    return (
      <div>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand>
              <img src={webName} alt="" height={75} width={75} href="/"/> &nbsp; L2GS Library System
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
                  <Nav.Link><Button variant="secondary" onClick={this.toLoginPage}>Login Account</Button></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link><Button variant="primary" onClick={this.toRegisterPage}>Register Account</Button></Nav.Link>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }

}

export default withRouter(GeneralNavbar)
