import { Component, useState } from 'react'
import { Container, Nav, Navbar, NavDropdown, Button, Form, InputGroup } from 'react-bootstrap'
import webName from '../../assets/website name.jpg'
import ClockComponent from '../../components/ClockComponent'
import UserSidebar from '../../components/User/UserSidebar'
import AdminNavbar from '../../components/Admin/AdminNavbar'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

class AdminProfile extends Component {

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
            imageFileName: localStorage.getItem('image'),
            currFirstname: localStorage.getItem('firstname'),
            currLastname: localStorage.getItem('lastname'),
            currEmail: localStorage.getItem('email').replace(/@gmail\.com$/, ""),
            currPassword: localStorage.getItem('password'),
            confirmPassword: localStorage.getItem('password'),

            getAccessToken: localStorage.getItem("accessToken"),
            getRefreshToken: localStorage.getItem("refreshToken"),
        }
    }

    componentDidMount() {

    }
    componentWillUnmount() {

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
                profileImageUrl: URL.createObjectURL(file),
                profileImageFile: file,
                imageFileName: fileName
            });
        }
    }

    handleImageUpload = () => {
        const formData = new FormData();
        formData.append('profileImage', this.state.profileImageFile);

        const imageAPI = [
            'http://localhost:3306/api/upload-user-image',
            'https://suico-it3202-sqa-finalproject-backend.onrender.com/api/upload-user-image'
        ]

        axios.post(imageAPI[1], formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            console.log(response.data); // Handle success response
        }).catch(error => {
            console.error('Error uploading image:', error); // Handle error
        });
    }

    toUpdateUser = (e) => {
        event.preventDefault();

        if (this.state.currPassword === this.state.confirmPassword) {
            console.log(this.state.currId + " " + this.state.imageFileName + " " + this.state.currFirstname + " " + this.state.currLastname + " " + this.state.currEmail + " " + this.state.currPassword);

            this.handleImageUpload();

            const data = {
                image: this.state.imageFileName,
                firstname: this.state.currFirstname,
                lastname: this.state.currLastname,
                email: this.state.currEmail,
                password: this.state.currPassword
            }

            const tokens = {
                accessToken: this.state.getAccessToken,
                refreshToken: this.state.getRefreshToken
            }

            const apiLink = [
                `https://suico-it3202-sqa-finalproject-backend.onrender.com/api/users/update-user/${this.state.currId}`,
                `http://localhost:3306/api/users/update-user/${this.state.currId}`,
                'https://suico-it3202-sqa-finalproject-backend.onrender.com/api/users/logout-user',
                'http://localhost:3306/api/users/logout-user',
                'http://localhost:3306/api/upload-user-image'
            ]

            // axios.put(
            //     apiLink[0], data
            // ).then(
            //     (response) => {
            //         console.log(response);

            //         axios.post(
            //             apiLink[2], tokens
            //         ).then(
            //             (response) => {
            //                 console.log(response)

            //                 localStorage.removeItem('accessToken');
            //                 localStorage.removeItem('refreshToken');
            //                 localStorage.removeItem('userId');
            //                 localStorage.removeItem('userImage');
            //                 localStorage.removeItem('firstname');
            //                 localStorage.removeItem('lastname');
            //                 localStorage.removeItem('role');
            //                 localStorage.removeItem('email');
            //                 localStorage.removeItem('password');

            //                 this.props.history.push('/');
            //             }
            //         ).catch(
            //             (error) => {
            //                 console.log(error)
            //             }
            //         )
            //     }
            // ).catch(
            //     (error) => {
            //         console.log(error);
            //     }
            // );
        }
    }

    render() {
        const profileImage = [
            `https://ui-avatars.com/api/?name=${this.state.LAfirstname}+${this.state.LAlastname}&background=random&size=75`,
            `https://ui-avatars.com/api/?name=${this.state.LAfirstname}+${this.state.LAlastname}&background=random&size=128`,
        ];

        const { profileImageUrl } = this.state;

        return (
            <div>
                <AdminNavbar />
                <div>
                    <h1>Admin Profile</h1>
                    <div style={{
                        backgroundColor: "white",
                        height: "60%",
                        width: "40%",
                        padding: "3%",
                        textAlign: "center",
                        margin: "auto"
                    }}>
                        <Form>
                            {profileImageUrl ? (
                                <img src={profileImageUrl} alt="Profile" style={{ width: '128px', height: '128px' }} />
                            ) : (
                                <img src={profileImage[1]} alt="" />
                            )}
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

                            <Button variant="warning" type='submit' onClick={this.toUpdateUser}>Update Profile</Button>

                        </Form>
                    </div>
                </div>
            </div>
        );
    }

}

export default withRouter(AdminProfile)
