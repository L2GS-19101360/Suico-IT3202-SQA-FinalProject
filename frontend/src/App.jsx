import { Component, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Container, Nav, Navbar, NavDropdown, Button } from 'react-bootstrap'
import webName from '../src/assets/website name.jpg'
import ClockComponent from '../src/components/ClockComponent'

class App extends Component {

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
                  <Nav.Link><Button variant="secondary">Login Account</Button></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link><Button variant="primary">Register Account</Button></Nav.Link>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }

}

export default App
