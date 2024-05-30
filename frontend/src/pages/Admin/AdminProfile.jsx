import React, { Component } from 'react';
import { Form, Button, InputGroup, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import AdminNavbar from '../../components/Admin/AdminNavbar';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import wallpaper from '../../assets/wallpaper.jpeg'; // Import the wallpaper image

class LibrarianProfile extends Component {
    constructor() {
        super();
        this.togglePasswordVisibility = this.togglePasswordVisibility.bind(this);
        this.toggleRePasswordVisibility = this.toggleRePasswordVisibility.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.toUpdateUser = this.toUpdateUser.bind(this);
        this.handleEditProfile = this.handleEditProfile.bind(this);
        this.handleCancelChanges = this.handleCancelChanges.bind(this);
        this.toLogoutUser = this.toLogoutUser.bind(this);
        this.state = {
            LAfirstname: localStorage.getItem('firstname'),
            LAlastname: localStorage.getItem('lastname'),
            showPassword: false,
            reshowPassword: false,
            profileImageUrl: null,
            profileImageFile: null,
            currId: localStorage.getItem('userId'),
            imageFileName: localStorage.getItem('userImage'),
            imageFileName_oldfilename: localStorage.getItem('userImage_filename'),
            imageFileName_newfilename: "",
            currFirstname: localStorage.getItem('firstname'),
            currLastname: localStorage.getItem('lastname'),
            currEmail: localStorage.getItem('email').replace(/@gmail\.com$/, ""),
            currPassword: localStorage.getItem('password'),
            confirmPassword: localStorage.getItem('password'),
            getAccessToken: localStorage.getItem("accessToken"),
            getRefreshToken: localStorage.getItem("refreshToken"),
            imagesUrl: "",
            isEditing: false,
            isLoading: false, // Loading state for Spinner
            showError: false, // Error state for Alert
            errorMessage: '', // Error message for Alert
            isSaveDisabled: true, // Save button disabled state
        };
    }

    componentDidMount() {
        console.log(this.state.imageFileName_oldfilename);
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
                imageFileName: fileName,
                imageFileName_newfilename: fileName
            });
        }
    }

    async handleImageUpload() {
        const selectedFile = this.state.profileImageFile;
        const apiLinks = [
            'http://localhost:3306/api/users-image',
            'https://suico-it3202-sqa-finalproject-backend.onrender.com/api/users-image',
            `https://suico-it3202-sqa-finalproject-backend.onrender.com/api/users-image/${this.state.imageFileName_oldfilename}`,
            `http://localhost:3306/api/users-image/${this.state.imageFileName_oldfilename}`
        ];

        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            try {
                axios.delete(apiLinks[2]);

                const response = await axios.post(apiLinks[1], formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                });
                console.log('File uploaded successfully:', response.data);
                console.log('Public URL:', response.data.imageUrl);

                this.setState({ imagesUrl: response.data.imageUrl }, this.updateUserData);
            } catch (error) {
                console.error('Error uploading file:', error);
                this.setState({ showError: true, errorMessage: 'Error uploading file' });
            }
        } else {
            this.updateUserData();
        }
    }

    async updateUserData() {
        const data = {
            image: this.state.imagesUrl || this.state.imageFileName,
            image_filename: this.state.imageFileName_newfilename || this.state.imageFileName_oldfilename,
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
            'http://localhost:3306/api/users/logout-user'
        ];

        try {
            const response = await axios.put(apiLink[0], data);
            console.log(response);

            await axios.post(apiLink[2], tokens);

            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('userId');
            localStorage.removeItem('userImage');
            localStorage.removeItem('userImage_filename');
            localStorage.removeItem('firstname');
            localStorage.removeItem('lastname');
            localStorage.removeItem('role');
            localStorage.removeItem('email');
            localStorage.removeItem('password');

            this.props.history.push('/');
        } catch (error) {
            console.error(error);
            this.setState({ showError: true, errorMessage: 'Server connection lost' });
        }
    }

    async toUpdateUser(e) {
        e.preventDefault();

        if (this.state.currPassword === this.state.confirmPassword) {
            this.setState({ isLoading: true, showError: false });
            await this.handleImageUpload();
        } else {
            this.setState({ showError: true, errorMessage: 'Passwords do not match' });
        }
    }

    handleEditProfile() {
        event.preventDefault();
        this.setState({ isEditing: true }, this.checkIfSaveDisabled);
    }

    handleCancelChanges() {
        event.preventDefault();
        this.setState({ isEditing: false });
        window.location.reload();
    }

    toLogoutUser() {
        this.setState({ isLoading: true, showError: false });

        const tokens = {
            accessToken: this.state.getAccessToken,
            refreshToken: this.state.getRefreshToken
        };

        const apiLink = [
            'https://suico-it3202-sqa-finalproject-backend.onrender.com/api/users/logout-user',
            'http://localhost:3306/api/users/logout-user'
        ];

        axios.post(apiLink[0], tokens)
            .then((response) => {
                console.log(response.data);

                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('userId');
                localStorage.removeItem('userImage');
                localStorage.removeItem('userImage_filename');
                localStorage.removeItem('firstname');
                localStorage.removeItem('lastname');
                localStorage.removeItem('role');
                localStorage.removeItem('email');
                localStorage.removeItem('password');

                this.props.history.push('/');
            })
            .catch((error) => {
                console.log(error);
                this.setState({ showError: true, errorMessage: 'Server connection lost', isLoading: false });
            });
    }

    checkIfSaveDisabled() {
        const { currFirstname, currLastname, currEmail, currPassword, confirmPassword } = this.state;
        const isSaveDisabled = !(currFirstname && currLastname && currEmail && currPassword && confirmPassword);
        this.setState({ isSaveDisabled });
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value }, this.checkIfSaveDisabled);
    };

    render() {
        // Styles for the overlay and the content
        const styles = {
            container: {
                position: 'relative',
                height: '100vh',
                width: '100%',
                overflow: 'hidden',
            },
            overlay: {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `url(${wallpaper})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                opacity: 0.1, // Adjust the opacity as needed
                zIndex: -1, // Ensure the overlay is behind other content
            },
            content: {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '40%',
                padding: '3%',
                textAlign: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '10px',
            },
        };

        return (
            <div style={styles.container}>
                <AdminNavbar />
                <h1>Admin Profile</h1>
                <div style={styles.overlay}></div>
                <div style={styles.content}>
                    {this.state.showError && (
                        <Alert variant="danger">
                            {this.state.errorMessage}
                        </Alert>
                    )}
                    <Form onSubmit={this.toUpdateUser}>
                        {this.state.profileImageUrl ?
                            (<img src={this.state.profileImageUrl} alt="Profile" style={{ width: '128px', height: '128px' }} />) :
                            (this.state.imageFileName !== "#%&{}>" ?
                                (<img src={this.state.imageFileName} height={128} width={128} alt="" />) :
                                (<img src={`https://ui-avatars.com/api/?name=${this.state.LAfirstname}+${this.state.LAlastname}&background=random&size=128`} alt="Profile" />))}

                        <br /><br />
                        <Form.Control type="file" onChange={this.handleImageChange} disabled={!this.state.isEditing} />
                        <br />
                        <div style={{ alignItems: "center", display: "inline-flex", width: "100%", marginBottom: "20px" }}>
                            <Form.Control
                                type="text"
                                placeholder="Enter First Name"
                                name="currFirstname"
                                disabled={!this.state.isEditing}
                                value={this.state.currFirstname}
                                onChange={this.handleInputChange} /> &nbsp;&nbsp;
                            <Form.Control
                                type="text"
                                placeholder="Enter Last Name"
                                name="currLastname"
                                disabled={!this.state.isEditing}
                                value={this.state.currLastname}
                                onChange={this.handleInputChange} />
                        </div>

                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder="Enter Email"
                                type='text'
                                name="currEmail"
                                value={this.state.currEmail}
                                disabled={!this.state.isEditing}
                                onChange={this.handleInputChange}
                            />
                            <InputGroup.Text id="basic-addon2">@gmail.com</InputGroup.Text>
                        </InputGroup>

                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder="Enter Password"
                                type={this.state.showPassword ? "text" : "password"}
                                name="currPassword"
                                value={this.state.currPassword}
                                disabled={!this.state.isEditing}
                                onChange={this.handleInputChange}
                            />
                            <InputGroup.Text style={{ backgroundColor: "lightgray" }} onClick={this.togglePasswordVisibility}>{this.state.showPassword ? <FaEyeSlash style={{ cursor: "pointer" }} /> : <FaEye style={{ cursor: "pointer" }} />}</InputGroup.Text>
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder="Enter Password"
                                type={this.state.reshowPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={this.state.confirmPassword}
                                disabled={!this.state.isEditing}
                                onChange={this.handleInputChange}
                            />
                            <InputGroup.Text style={{ backgroundColor: "lightgray" }} onClick={this.toggleRePasswordVisibility}>{this.state.reshowPassword ? <FaEyeSlash style={{ cursor: "pointer" }} /> : <FaEye style={{ cursor: "pointer" }} />}</InputGroup.Text>
                        </InputGroup><br />

                        {this.state.isEditing ? (
                            <div style={{ display: "inline-flex", gap: "50px" }}>
                                <Button variant="danger" onClick={this.handleCancelChanges}>Cancel Changes</Button>
                                <Button variant="warning" type='submit' disabled={this.state.isSaveDisabled}>
                                    {this.state.isLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Save Changes'}
                                </Button>
                            </div>
                        ) : (
                            <div style={{ display: "inline-flex", gap: "50px" }}>
                                <Button variant="danger" onClick={this.toLogoutUser}>
                                    {this.state.isLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Logout Account'}
                                </Button>
                                <Button variant="warning" onClick={this.handleEditProfile}>Update Profile</Button>
                            </div>
                        )}
                    </Form>
                </div>
            </div>
        );
    }
}

export default withRouter(LibrarianProfile);
