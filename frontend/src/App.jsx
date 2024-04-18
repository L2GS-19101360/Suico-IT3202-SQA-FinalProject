import { Component, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Container, Nav, Navbar, NavDropdown, Button } from 'react-bootstrap'
import webName from '../src/assets/website name.jpg'
import ClockComponent from '../src/components/ClockComponent'
import GeneralNavbar from './components/GeneralNavbar'

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
        <GeneralNavbar />
        <div>
          <h1>Landing Page</h1>
        </div>
      </div>
    );
  }

}

export default App
