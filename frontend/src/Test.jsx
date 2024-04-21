import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

class Test extends Component {
  constructor() {
    super();
    this.state = {
      file: null,
      imagesUrls: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3306/api/users-image')
      .then((response) => {
        // console.log(response.data);
        const imageNames = response.data.map(image => image.publicUrl);
        this.setState({ imagesUrls: imageNames }, () => {
          console.log(this.state.imagesUrls);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  componentWillUnmount() {

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
        {this.state.imagesUrls.map((image, index) => (
          <img key={index} src={image} alt="" height={300} width={500}/>
        ))}
      </div>
    );
  }
}

export default Test;
