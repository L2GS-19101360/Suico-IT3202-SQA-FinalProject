import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

class Test extends Component {
  constructor() {
    super();
    this.state = {
      file: null // Initialize file state to null
    };
  }

  handleFileChange = (e) => {
    this.setState({ file: e.target.files[0] }); // Update file state with selected file
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const selectedFile = this.state.file; // Get selected file from state

    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const response = await axios.post('http://localhost:3306/api/users-image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('File uploaded successfully:', response.data);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } else {
      console.error('No file selected');
    }
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Control type="file" onChange={this.handleFileChange} />
          <Button variant="warning" type='submit'>Upload</Button>
        </Form>
      </div>
    );
  }
}

export default Test;
