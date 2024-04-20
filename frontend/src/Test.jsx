import { Component, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Container, Nav, Navbar, NavDropdown, Button, Form } from 'react-bootstrap'
import webName from '../src/assets/website name.jpg'
import ClockComponent from '../src/components/ClockComponent'
import GeneralNavbar from './components/GeneralNavbar'
import axios from 'axios'

class Test extends Component {

  constructor() {
    super();
    this.toUploadFile = this.toUploadFile.bind(this)
    this.state = {
      file: ''
    }
  }

  componentDidMount() {

  }
  componentWillUnmount() {

  }

  toUploadFile = (e) => {
    event.preventDefault();

    console.log(this.state.file);

    axios.post().then(
      (response) => {
        console.log(response)
      }
    ).catch(
      (error) => {
        console.log(error)
      }
    )
  }

  render() {
    return (
      <div>
        <Form>
          <Form.Control 
            type="file" 
            value={this.state.file}
            onChange={(e) => (this.setState({ file: e.target.value }))}/>
          <Button variant="warning" type='submit' onClick={this.toUploadFile}>Warning</Button>
        </Form>
      </div>
    );
  }

}

export default Test
