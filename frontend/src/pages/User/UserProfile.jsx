import React, { Component } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import UserNavbar from '../../components/User/UserNavbar';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

class UserProfile extends Component {
    constructor() {
        super();
        this.togglePasswordVisibility = this.togglePasswordVisibility.bind(this);
        this.toggleRePasswordVisibility = this.toggleRePasswordVisibility.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.toUpdateUser = this.toUpdateUser.bind(this);
        this.state = {
            LAfirstname: localStorage.getItem('firstname'),
            LAlastname: localStorage.getItem('lastname'),
            showPassword: false,
            reshowPassword: false,
            profileImageUrl: null,
            profileImageFile: null,
            currId: localStorage.getItem('userId'),
            imageFileName: localStorage.getItem('userImage'),
            currFirstname: localStorage.getItem('firstname'),
            currLastname: localStorage.getItem('lastname'),
            currEmail: localStorage.getItem('email').replace(/@gmail\.com$/, ""),
            currPassword: localStorage.getItem('password'),
            confirmPassword: localStorage.getItem('password'),
            getAccessToken: localStorage.getItem("accessToken"),
            getRefreshToken: localStorage.getItem("refreshToken"),
            imagesUrl: ""
        };
    }

    componentDidMount() {

    }

    togglePasswordVisibility() {
        this.setState(prevState => ({
            showPassword: !prevState.showPassword
        }));
    }

    toggleRePasswordVisibility() {
        this.setState(prevState => ({
            reshowPassword: !prevState.reshowPassword
        }));
    }

    handleImageChange(e) {
        const file = e.target.files[0];
        if (file) {
            const fileName = file.name;
            this.setState({
                profileImageUrl: URL.createObjectURL(file) || null, // Reset to null when new image selected
                profileImageFile: file,
                imageFileName: fileName
            });
        }
    }

    // Function to handle image upload
    async handleImageUpload() {
        const selectedFile = this.state.profileImageFile;

        const apiLinks = [
            'http://localhost:3306/api/users-image',
            'https://suico-it3202-sqa-finalproject-backend.onrender.com/api/users-image'
        ]

        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            try {
                const response = await axios.post(apiLinks[1], formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                });
                console.log('File uploaded successfully:', response.data);

                // Log the publicUrl here
                console.log('Public URL:', response.data.imageUrl);

                // Update state and call toUpdateUser from the callback
                this.setState({ imagesUrl: response.data.imageUrl }, () => {
                    console.log(this.state.imagesUrl);
                    // Call toUpdateUser here to ensure it gets the updated state
                    const data = {
                        image: this.state.imagesUrl,
                        firstname: this.state.currFirstname,
                        lastname: this.state.currLastname,
                        email: this.state.currEmail + "@gmail.com",
                        password: this.state.currPassword
                    };

                    const tokens = {
                        accessToken: this.state.getAccessToken,
                        refreshToken: this.state.getRefreshToken
                    };

                    const apiLink = [
                        `https://suico-it3202-sqa-finalproject-backend.onrender.com/api/users/update-user/${this.state.currId}`,
                        `http://localhost:3306/api/users/update-user/${this.state.currId}`,
                        'https://suico-it3202-sqa-finalproject-backend.onrender.com/api/users/logout-user',
                        'http://localhost:3306/api/users/logout-user',
                        'http://localhost:3306/api/upload-user-image'
                    ];

                    // Perform API requests
                    try {
                        const response = axios.put(apiLink[0], data);
                        console.log(response);

                        axios.post(apiLink[2], tokens);

                        localStorage.removeItem('accessToken');
                        localStorage.removeItem('refreshToken');
                        localStorage.removeItem('userId');
                        localStorage.removeItem('userImage');
                        localStorage.removeItem('firstname');
                        localStorage.removeItem('lastname');
                        localStorage.removeItem('role');
                        localStorage.removeItem('email');
                        localStorage.removeItem('password');

                        this.props.history.push('/');
                    } catch (error) {
                        console.error(error);
                    }
                });
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        }
    }

    async toUpdateUser(e) {
        e.preventDefault();

        if (this.state.currPassword === this.state.confirmPassword) {
            await this.handleImageUpload(); // Wait for image upload to complete

            console.log(this.state.imagesUrl)


        }
    }

    render() {
        return (
            <div>
                <UserNavbar />
                <div>
                    <h1>User Profile</h1>
                    <div style={{
                        backgroundColor: "white",
                        height: "60%",
                        width: "40%",
                        padding: "3%",
                        textAlign: "center",
                        margin: "auto"
                    }}>
                        <Form>
                            {this.state.profileImageUrl ? 
                                (<img src={this.state.profileImageUrl} alt="Profile" style={{ width: '128px', height: '128px' }} />) : 
                                (this.state.imageFileName !== "#%&{}>" ? 
                                    (<img src={this.state.imageFileName} height={128} width={128} alt="" />) : 
                                    (<img src={`https://ui-avatars.com/api/?name=${this.state.LAfirstname}+${this.state.LAlastname}&background=random&size=128`} alt="Profile" />))}

                            <br /><br />
                            <Form.Control type="file" onChange={this.handleImageChange} />
                            <br />
                            <div style={{ alignItems: "center", display: "inline-flex", width: "100%", marginBottom: "20px" }}>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter First Name"
                                    value={this.state.currFirstname}
                                    onChange={(e) => { this.setState({ currFirstname: e.target.value }) }} /> &nbsp;&nbsp;
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Last Name"
                                    value={this.state.currLastname}
                                    onChange={(e) => { this.setState({ currLastname: e.target.value }) }} />
                            </div>

                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="Enter Email"
                                    type='text'
                                    value={this.state.currEmail}
                                    onChange={(e) => { this.setState({ currEmail: e.target.value }) }}
                                />
                                <InputGroup.Text id="basic-addon2">@gmail.com</InputGroup.Text>
                            </InputGroup>

                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="Enter Password"
                                    type={this.state.showPassword ? "text" : "password"}
                                    value={this.state.currPassword}
                                    onChange={(e) => { this.setState({ currPassword: e.target.value }) }}
                                />
                                <InputGroup.Text style={{ backgroundColor: "lightgray" }} onClick={this.togglePasswordVisibility}>{this.state.showPassword ? <FaEyeSlash style={{ cursor: "pointer" }} /> : <FaEye style={{ cursor: "pointer" }} />}</InputGroup.Text>
                            </InputGroup>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="Enter Password"
                                    type={this.state.reshowPassword ? "text" : "password"}
                                    value={this.state.confirmPassword}
                                    onChange={(e) => { this.setState({ confirmPassword: e.target.value }) }}
                                />
                                <InputGroup.Text style={{ backgroundColor: "lightgray" }} onClick={this.toggleRePasswordVisibility}>{this.state.reshowPassword ? <FaEyeSlash style={{ cursor: "pointer" }} /> : <FaEye style={{ cursor: "pointer" }} />}</InputGroup.Text>
                            </InputGroup><br />

                            <Button variant="warning" type='submit' onClick={(e) => this.toUpdateUser(e)}>Update Profile</Button>

                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(UserProfile);
