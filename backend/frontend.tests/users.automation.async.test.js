const { viewUsersBySearchInput,
    filterUsersByRoleOption,
    updateUserByActivateButton,
    updateUserByDeactivateButton,
    updateUserProfile } = require('../frontend.async/users.automation.async');

jest.setTimeout(30000);

describe('Update User Automation Testing', () => {
    test('Update User Profile with new profile picture', async () => {
        const data = {
            image: '../sampleProfilePictures/Peter1.jpg', // This path should be correct relative to the script file
            currFirstname: 'Peter',
            currLastname: 'Griffin',
            currEmail: 'Peter123',
            currPassword: 'Peter',
            confirmPassword: 'Peter'
        };
        const result = await updateUserProfile(data, "PeterGriffin@gmail.com", "Griffin");
        expect(result).toBe(true);
    });

    test('Update User Profile without new profile picture', async () => {
        const data = {
            image: null, // This path should be correct relative to the script file
            currFirstname: 'Peter',
            currLastname: 'Griffin',
            currEmail: 'PeterGriffin',
            currPassword: 'Griffin',
            confirmPassword: 'Griffin'
        };
        const result = await updateUserProfile(data, "Peter123@gmail.com", "Peter");
        expect(result).toBe(true);
    });

    test('Update User Profile without first name and with new profile picture', async () => {
        const data = {
            image: '../sampleProfilePictures/Homer.jpg', // This path should be correct relative to the script file
            currFirstname: '',
            currLastname: 'Simpson',
            currEmail: 'HomerSimpson',
            currPassword: 'Simpson',
            confirmPassword: 'Simpson'
        };
        const result = await updateUserProfile(data, "HomerSimpson123@gmail.com", "Homer123");
        expect(result).toBe(true);
    });

    test('Update User Profile without first name and without new profile picture', async () => {
        const data = {
            image: null, // This path should be correct relative to the script file
            currFirstname: '',
            currLastname: 'Simpson',
            currEmail: 'HomerSimpson123',
            currPassword: 'Homer123',
            confirmPassword: 'Homer123'
        };
        const result = await updateUserProfile(data, "HomerSimpson@gmail.com", "Simpson");
        expect(result).toBe(true);
    });

    test('Update User Profile without last name with new profile picture', async () => {
        const data = {
            image: '../sampleProfilePictures/Peter.jpg', // This path should be correct relative to the script file
            currFirstname: 'Peter Justine',
            currLastname: '',
            currEmail: 'Peter123',
            currPassword: 'Peter',
            confirmPassword: 'Peter'
        };
        const result = await updateUserProfile(data, "PeterGriffin@gmail.com", "Griffin");
        expect(result).toBe(true);
    });

    test('Update User Profile without new profile picture', async () => {
        const data = {
            image: null, // This path should be correct relative to the script file
            currFirstname: 'Peter',
            currLastname: '',
            currEmail: 'PeterGriffin',
            currPassword: 'Griffin',
            confirmPassword: 'Griffin'
        };
        const result = await updateUserProfile(data, "Peter123@gmail.com", "Peter");
        expect(result).toBe(true);
    });

    test('Update User Profile without email and with new profile picture', async () => {
        const data = {
            image: '../sampleProfilePictures/Homer1.jpg', // This path should be correct relative to the script file
            currFirstname: 'Homer Jay',
            currLastname: 'Simpson',
            currEmail: '',
            currPassword: 'Homer',
            confirmPassword: 'Homer'
        };
        const result = await updateUserProfile(data, "HomerSimpson123@gmail.com", "Homer123");
        expect(result).toBe(true);
    });

    test('Update User Profile without email and without new profile picture', async () => {
        const data = {
            image: null, // This path should be correct relative to the script file
            currFirstname: 'Homer Jay',
            currLastname: 'Simpson',
            currEmail: '',
            currPassword: 'Homer123',
            confirmPassword: 'Homer123'
        };
        const result = await updateUserProfile(data, "HomerSimpson123@gmail.com", "Homer");
        expect(result).toBe(true);
    });

    test('Update User Profile without password and confirm password and with new profile picture', async () => {
        const data = {
            image: '../sampleProfilePictures/Peter1.jpg', // This path should be correct relative to the script file
            currFirstname: 'Peter Justine',
            currLastname: 'Griffin',
            currEmail: 'Peter123',
            currPassword: '',
            confirmPassword: ''
        };
        const result = await updateUserProfile(data, "PeterGriffin@gmail.com", "Griffin");
        expect(result).toBe(true);
    });

    test('Update User Profile without password and confirm password and without new profile picture', async () => {
        const data = {
            image: null, // This path should be correct relative to the script file
            currFirstname: 'Peter',
            currLastname: 'Griffin',
            currEmail: 'PeterGriffin',
            currPassword: '',
            confirmPassword: ''
        };
        const result = await updateUserProfile(data, "Peter123@gmail.com", "Griffin");
        expect(result).toBe(true);
    });

    test('Update User Profile only profile picture', async () => {
        const data = {
            image: '../sampleProfilePictures/Homer.jpg', // This path should be correct relative to the script file
            currFirstname: '',
            currLastname: '',
            currEmail: '',
            currPassword: '',
            confirmPassword: ''
        };
        const result = await updateUserProfile(data, "HomerSimpson123@gmail.com", "Homer123");
        expect(result).toBe(true);
    });
});

// describe('User Account Activation and Deactivation Automation Testing', () => {
//     test('Deactivate User Account', async () => {
//         const result = await updateUserByDeactivateButton(53);
//         expect(result).toBe(true);
//     });

//     test('Activate User Account', async () => {
//         const result = await updateUserByActivateButton(53);
//         expect(result).toBe(true);
//     });

//     test('Deactivate Librarian Account', async () => {
//         const result = await updateUserByDeactivateButton(41);
//         expect(result).toBe(true);
//     });

//     test('Activate Librarian Account', async () => {
//         const result = await updateUserByActivateButton(41);
//         expect(result).toBe(true);
//     });
// });

// describe('Read User Automation Testing', () => {
//     test('View All Users', async () => {
//         const result = await viewUsersBySearchInput("");
//         expect(result).toBe(true);
//     });

//     test('Search Users by First Name', async () => {
//         const result = await viewUsersBySearchInput("Homer");
//         expect(result).toBe(true);
//     });

//     test('Search Users by Last Name', async () => {
//         const result = await viewUsersBySearchInput("Simpson");
//         expect(result).toBe(true);
//     });

//     test('Search Users by Email', async () => {
//         const result = await viewUsersBySearchInput("HomerSimpson@gmail.com");
//         expect(result).toBe(true);
//     });

//     test('Search Librarian by First Name', async () => {
//         const result = await viewUsersBySearchInput("Gregory");
//         expect(result).toBe(true);
//     });

//     test('Search Librarian by Last Name', async () => {
//         const result = await viewUsersBySearchInput("House");
//         expect(result).toBe(true);
//     });

//     test('Search Librarian by Email', async () => {
//         const result = await viewUsersBySearchInput("HouseGregory@gmail.com");
//         expect(result).toBe(true);
//     });

//     test('Filter Users by Role: User', async () => {
//         const result = await filterUsersByRoleOption("user");
//         expect(result).toBe(true);
//     });

//     test('Filter Users by Role: Librarian', async () => {
//         const result = await filterUsersByRoleOption("librarian");
//         expect(result).toBe(true);
//     });
// });