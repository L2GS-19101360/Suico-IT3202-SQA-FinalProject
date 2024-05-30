const { viewUsersBySearchInput,
    filterUsersByRoleOption,
    updateUserByActivateButton,
    updateUserByDeactivateButton,
    updateUserProfile,
    updateLibrarianProfile,
    updateAdminProfile } = require('../frontend.async/users.automation.async');

jest.setTimeout(30000);

describe('Update Admin Automation Testing', () => {
    //
    test('Update User Profile but password and confirm password mismatch', async () => {
        const data = {
            image: '../sampleProfilePictures/Homer1.jpg', // This path should be correct relative to the script file
            currFirstname: 'Homer',
            currLastname: 'Simpson',
            currEmail: 'HomerSimpson',
            currPassword: 'Homer123',
            confirmPassword: 'Homer234'
        };
        const result = await updateUserProfile(data, "HomerSimpson123@gmail.com", "Homer123", false);
        expect(result).toBe(true);
    });

    //
    test('Update Librarian Profile but password and confirm password mismatch', async () => {
        const data = {
            image: '../sampleProfilePictures/House1.jpg', // This path should be correct relative to the script file
            currFirstname: 'Gregory',
            currLastname: 'House',
            currEmail: 'GregoryHouse',
            currPassword: 'Gregory123',
            confirmPassword: 'Gregory234'
        };
        const result = await updateLibrarianProfile(data, "House123@gmail.com", "House", false);
        expect(result).toBe(true);
    });

    //
    test('Update Admin Profile with new profile picture', async () => {
        const data = {
            image: '../sampleProfilePictures/Lorenz1.jpg', // This path should be correct relative to the script file
            currFirstname: 'Lorenz',
            currLastname: 'Suico',
            currEmail: 'Lorenz123',
            currPassword: 'Lorenz123',
            confirmPassword: 'Lorenz234'
        };
        const result = await updateAdminProfile(data, "Lawrence123@gmail.com", "Lawrence", false);
        expect(result).toBe(true);
    });

});

describe('Update Admin Automation Testing', () => {
    //
    test('Update Admin Profile with new profile picture', async () => {
        const data = {
            image: '../sampleProfilePictures/Lorenz1.jpg', // This path should be correct relative to the script file
            currFirstname: 'Lorenz',
            currLastname: 'Suico',
            currEmail: 'Lorenz123',
            currPassword: 'Lorenz',
            confirmPassword: 'Lorenz'
        };
        const result = await updateAdminProfile(data, "Lawrence123@gmail.com", "Lawrence", true);
        expect(result).toBe(true);
    });

    test('Update Admin Profile without new profile picture', async () => {
        const data = {
            image: null, // This path should be correct relative to the script file
            currFirstname: 'Lawrence',
            currLastname: 'Gilbert',
            currEmail: 'Lawrence123',
            currPassword: 'Lawrence',
            confirmPassword: 'Lawrence'
        };
        const result = await updateAdminProfile(data, "Lorenz123@gmail.com", "Lorenz", true);
        expect(result).toBe(true);
    });

    //
    test('Update Admin Profile without first name and with new profile picture', async () => {
        const data = {
            image: '../sampleProfilePictures/Lorenz.jpg', // This path should be correct relative to the script file
            currFirstname: null,
            currLastname: 'Suico',
            currEmail: 'Lorenz123',
            currPassword: 'Lorenz',
            confirmPassword: 'Lorenz'
        };
        const result = await updateAdminProfile(data, "Lawrence123@gmail.com", "Lawrence", true);
        expect(result).toBe(true);
    });

    test('Update Admin Profile without first name and without new profile picture', async () => {
        const data = {
            image: null, // This path should be correct relative to the script file
            currFirstname: null,
            currLastname: 'Gilbert',
            currEmail: 'Lawrence123',
            currPassword: 'Lawrence',
            confirmPassword: 'Lawrence'
        };
        const result = await updateAdminProfile(data, "Lorenz123@gmail.com", "Lorenz", true);
        expect(result).toBe(true);
    });

    //
    test('Update Admin Profile without last name with new profile picture', async () => {
        const data = {
            image: '../sampleProfilePictures/Lorenz1.jpg', // This path should be correct relative to the script file
            currFirstname: 'Lorenz',
            currLastname: null,
            currEmail: 'Lorenz123',
            currPassword: 'Lorenz',
            confirmPassword: 'Lorenz'
        };
        const result = await updateAdminProfile(data, "Lawrence123@gmail.com", "Lawrence", true);
        expect(result).toBe(true);
    });

    test('Update Admin Profile without last name and without new profile picture', async () => {
        const data = {
            image: null, // This path should be correct relative to the script file
            currFirstname: 'Lawrence',
            currLastname: null,
            currEmail: 'Lawrence123',
            currPassword: 'Lawrence',
            confirmPassword: 'Lawrence'
        };
        const result = await updateAdminProfile(data, "Lorenz123@gmail.com", "Lorenz", true);
        expect(result).toBe(true);
    });

    //
    test('Update Admin Profile without email and with new profile picture', async () => {
        const data = {
            image: '../sampleProfilePictures/Lorenz.jpg', // This path should be correct relative to the script file
            currFirstname: 'Lorenz',
            currLastname: 'Suico',
            currEmail: null,
            currPassword: 'Lorenz',
            confirmPassword: 'Lorenz'
        };
        const result = await updateAdminProfile(data, "Lawrence123@gmail.com", "Lawrence", true);
        expect(result).toBe(true);
    });

    test('Update Admin Profile without email and without new profile picture', async () => {
        const data = {
            image: null, // This path should be correct relative to the script file
            currFirstname: 'Lorenz',
            currLastname: 'Suico',
            currEmail: null,
            currPassword: 'Lawrence',
            confirmPassword: 'Lawrence'
        };
        const result = await updateAdminProfile(data, "Lawrence123@gmail.com", "Lorenz", true);
        expect(result).toBe(true);
    });

    //
    test('Update Admin Profile without password and confirm password and with new profile picture', async () => {
        const data = {
            image: '../sampleProfilePictures/Lorenz1.jpg', // This path should be correct relative to the script file
            currFirstname: 'Lorenz',
            currLastname: 'Suico',
            currEmail: 'Lorenz123',
            currPassword: null,
            confirmPassword: null
        };
        const result = await updateAdminProfile(data, "Lawrence123@gmail.com", "Lawrence", true);
        expect(result).toBe(true);
    });

    test('Update Admin Profile without password and confirm password and without new profile picture', async () => {
        const data = {
            image: null, // This path should be correct relative to the script file
            currFirstname: 'Lawrence',
            currLastname: 'Gilbert',
            currEmail: 'Lawrence123',
            currPassword: null,
            confirmPassword: null
        };
        const result = await updateAdminProfile(data, "Lorenz123@gmail.com", "Lawrence", true);
        expect(result).toBe(true);
    });

    //
    test('Update Admin Profile only profile picture', async () => {
        const data = {
            image: '../sampleProfilePictures/Lorenz.jpg', // This path should be correct relative to the script file
            currFirstname: null,
            currLastname: null,
            currEmail: null,
            currPassword: null,
            confirmPassword: null
        };
        const result = await updateAdminProfile(data, "Lawrence123@gmail.com", "Lawrence", true);
        expect(result).toBe(true);
    });
});

describe('Update Librarian Automation Testing', () => {
    //
    test('Update Librarian Profile with new profile picture', async () => {
        const data = {
            image: '../sampleProfilePictures/House1.jpg', // This path should be correct relative to the script file
            currFirstname: 'Gregory Greg',
            currLastname: 'House',
            currEmail: 'GregoryHouse',
            currPassword: 'Gregory',
            confirmPassword: 'Gregory'
        };
        const result = await updateLibrarianProfile(data, "House123@gmail.com", "House", true);
        expect(result).toBe(true);
    });

    test('Update Librarian Profile without new profile picture', async () => {
        const data = {
            image: null, // This path should be correct relative to the script file
            currFirstname: 'Gregory',
            currLastname: 'House',
            currEmail: 'House123',
            currPassword: 'House',
            confirmPassword: 'House'
        };
        const result = await updateLibrarianProfile(data, "GregoryHouse@gmail.com", "Gregory", true);
        expect(result).toBe(true);
    });

    //
    test('Update Librarian Profile without first name and with new profile picture', async () => {
        const data = {
            image: '../sampleProfilePictures/Wilson1.jpg', // This path should be correct relative to the script file
            currFirstname: null,
            currLastname: 'Wilson',
            currEmail: 'JamesWilson',
            currPassword: 'James',
            confirmPassword: 'James'
        };
        const result = await updateLibrarianProfile(data, "Wilson123@gmail.com", "Wilson", true);
        expect(result).toBe(true);
    });

    test('Update Librarian Profile without first name and without new profile picture', async () => {
        const data = {
            image: null, // This path should be correct relative to the script file
            currFirstname: null,
            currLastname: 'Wilson',
            currEmail: 'Wilson123',
            currPassword: 'Wilson',
            confirmPassword: 'Wilson'
        };
        const result = await updateLibrarianProfile(data, "JamesWilson@gmail.com", "James", true);
        expect(result).toBe(true);
    });

    //
    test('Update Librarian Profile without last name with new profile picture', async () => {
        const data = {
            image: '../sampleProfilePictures/House.jpg', // This path should be correct relative to the script file
            currFirstname: 'Gregory Greg',
            currLastname: null,
            currEmail: 'GregoryHouse',
            currPassword: 'Gregory',
            confirmPassword: 'Gregory'
        };
        const result = await updateLibrarianProfile(data, "House123@gmail.com", "House", true);
        expect(result).toBe(true);
    });

    test('Update Librarian Profile without last name and without new profile picture', async () => {
        const data = {
            image: null, // This path should be correct relative to the script file
            currFirstname: 'Gregory',
            currLastname: null,
            currEmail: 'House123',
            currPassword: 'House',
            confirmPassword: 'House'
        };
        const result = await updateLibrarianProfile(data, "GregoryHouse@gmail.com", "Gregory", true);
        expect(result).toBe(true);
    });

    //
    test('Update Librarian Profile without email and with new profile picture', async () => {
        const data = {
            image: '../sampleProfilePictures/Wilson.jpeg', // This path should be correct relative to the script file
            currFirstname: 'James Jam',
            currLastname: 'Wilson',
            currEmail: null,
            currPassword: 'James',
            confirmPassword: 'James'
        };
        const result = await updateLibrarianProfile(data, "Wilson123@gmail.com", "Wilson", true);
        expect(result).toBe(true);
    });

    test('Update Librarian Profile without email and without new profile picture', async () => {
        const data = {
            image: null, // This path should be correct relative to the script file
            currFirstname: 'James',
            currLastname: 'Wilson',
            currEmail: null,
            currPassword: 'Wilson',
            confirmPassword: 'Wilson'
        };
        const result = await updateLibrarianProfile(data, "Wilson123@gmail.com", "James", true);
        expect(result).toBe(true);
    });

    //
    test('Update Librarian Profile without password and confirm password and with new profile picture', async () => {
        const data = {
            image: '../sampleProfilePictures/House1.jpg', // This path should be correct relative to the script file
            currFirstname: 'Gregory Greg',
            currLastname: 'House',
            currEmail: 'GregoryHouse',
            currPassword: null,
            confirmPassword: null
        };
        const result = await updateLibrarianProfile(data, "House123@gmail.com", "House", true);
        expect(result).toBe(true);
    });

    test('Update Librarian Profile without password and confirm password and without new profile picture', async () => {
        const data = {
            image: null, // This path should be correct relative to the script file
            currFirstname: 'Gregory',
            currLastname: 'House',
            currEmail: 'House123',
            currPassword: null,
            confirmPassword: null
        };
        const result = await updateLibrarianProfile(data, "GregoryHouse@gmail.com", "House", true);
        expect(result).toBe(true);
    });

    //
    test('Update Librarian Profile only profile picture', async () => {
        const data = {
            image: '../sampleProfilePictures/Wilson1.jpg', // This path should be correct relative to the script file
            currFirstname: null,
            currLastname: null,
            currEmail: null,
            currPassword: null,
            confirmPassword: null
        };
        const result = await updateLibrarianProfile(data, "Wilson123@gmail.com", "Wilson", true);
        expect(result).toBe(true);
    });
});

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
        const result = await updateUserProfile(data, "PeterGriffin@gmail.com", "Griffin", true);
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
        const result = await updateUserProfile(data, "Peter123@gmail.com", "Peter", true);
        expect(result).toBe(true);
    });

    test('Update User Profile without first name and with new profile picture', async () => {
        const data = {
            image: '../sampleProfilePictures/Homer.jpg', // This path should be correct relative to the script file
            currFirstname: null,
            currLastname: 'Simpson',
            currEmail: 'HomerSimpson',
            currPassword: 'Simpson',
            confirmPassword: 'Simpson'
        };
        const result = await updateUserProfile(data, "HomerSimpson123@gmail.com", "Homer123", true);
        expect(result).toBe(true);
    });

    test('Update User Profile without first name and without new profile picture', async () => {
        const data = {
            image: null, // This path should be correct relative to the script file
            currFirstname: null,
            currLastname: 'Simpson',
            currEmail: 'HomerSimpson123',
            currPassword: 'Homer123',
            confirmPassword: 'Homer123'
        };
        const result = await updateUserProfile(data, "HomerSimpson@gmail.com", "Simpson", true);
        expect(result).toBe(true);
    });

    test('Update User Profile without last name with new profile picture', async () => {
        const data = {
            image: '../sampleProfilePictures/Peter.jpg', // This path should be correct relative to the script file
            currFirstname: 'Peter Justine',
            currLastname: null,
            currEmail: 'Peter123',
            currPassword: 'Peter',
            confirmPassword: 'Peter'
        };
        const result = await updateUserProfile(data, "PeterGriffin@gmail.com", "Griffin", true);
        expect(result).toBe(true);
    });

    test('Update User Profile without new profile picture', async () => {
        const data = {
            image: null, // This path should be correct relative to the script file
            currFirstname: 'Peter',
            currLastname: null,
            currEmail: 'PeterGriffin',
            currPassword: 'Griffin',
            confirmPassword: 'Griffin'
        };
        const result = await updateUserProfile(data, "Peter123@gmail.com", "Peter", true);
        expect(result).toBe(true);
    });

    test('Update User Profile without email and with new profile picture', async () => {
        const data = {
            image: '../sampleProfilePictures/Homer1.jpg', // This path should be correct relative to the script file
            currFirstname: 'Homer Jay',
            currLastname: 'Simpson',
            currEmail: null,
            currPassword: 'Homer',
            confirmPassword: 'Homer'
        };
        const result = await updateUserProfile(data, "HomerSimpson123@gmail.com", "Homer123", true);
        expect(result).toBe(true);
    });

    test('Update User Profile without email and without new profile picture', async () => {
        const data = {
            image: null, // This path should be correct relative to the script file
            currFirstname: 'Homer Jay',
            currLastname: 'Simpson',
            currEmail: null,
            currPassword: 'Homer123',
            confirmPassword: 'Homer123'
        };
        const result = await updateUserProfile(data, "HomerSimpson123@gmail.com", "Homer", true);
        expect(result).toBe(true);
    });

    test('Update User Profile without password and confirm password and with new profile picture', async () => {
        const data = {
            image: '../sampleProfilePictures/Peter1.jpg', // This path should be correct relative to the script file
            currFirstname: 'Peter Justine',
            currLastname: 'Griffin',
            currEmail: 'Peter123',
            currPassword: null,
            confirmPassword: null
        };
        const result = await updateUserProfile(data, "PeterGriffin@gmail.com", "Griffin", true);
        expect(result).toBe(true);
    });

    test('Update User Profile without password and confirm password and without new profile picture', async () => {
        const data = {
            image: null, // This path should be correct relative to the script file
            currFirstname: 'Peter',
            currLastname: 'Griffin',
            currEmail: 'PeterGriffin',
            currPassword: null,
            confirmPassword: null
        };
        const result = await updateUserProfile(data, "Peter123@gmail.com", "Griffin", true);
        expect(result).toBe(true);
    });

    test('Update User Profile only profile picture', async () => {
        const data = {
            image: '../sampleProfilePictures/Homer.jpg', // This path should be correct relative to the script file
            currFirstname: null,
            currLastname: null,
            currEmail: null,
            currPassword: null,
            confirmPassword: null
        };
        const result = await updateUserProfile(data, "HomerSimpson123@gmail.com", "Homer123", true);
        expect(result).toBe(true);
    });
});

describe('User Account Activation and Deactivation Automation Testing', () => {
    test('Deactivate User Account', async () => {
        const result = await updateUserByDeactivateButton(53);
        expect(result).toBe(true);
    });

    test('Activate User Account', async () => {
        const result = await updateUserByActivateButton(53);
        expect(result).toBe(true);
    });

    test('Deactivate Librarian Account', async () => {
        const result = await updateUserByDeactivateButton(41);
        expect(result).toBe(true);
    });

    test('Activate Librarian Account', async () => {
        const result = await updateUserByActivateButton(41);
        expect(result).toBe(true);
    });
});

describe('Read User Automation Testing', () => {
    test('View All Users', async () => {
        const result = await viewUsersBySearchInput("");
        expect(result).toBe(true);
    });

    test('Search Users by First Name', async () => {
        const result = await viewUsersBySearchInput("Homer");
        expect(result).toBe(true);
    });

    test('Search Users by Last Name', async () => {
        const result = await viewUsersBySearchInput("Simpson");
        expect(result).toBe(true);
    });

    test('Search Users by Email', async () => {
        const result = await viewUsersBySearchInput("HomerSimpson@gmail.com");
        expect(result).toBe(true);
    });

    test('Search Librarian by First Name', async () => {
        const result = await viewUsersBySearchInput("Gregory");
        expect(result).toBe(true);
    });

    test('Search Librarian by Last Name', async () => {
        const result = await viewUsersBySearchInput("House");
        expect(result).toBe(true);
    });

    test('Search Librarian by Email', async () => {
        const result = await viewUsersBySearchInput("HouseGregory@gmail.com");
        expect(result).toBe(true);
    });

    test('Filter Users by Role: User', async () => {
        const result = await filterUsersByRoleOption("user");
        expect(result).toBe(true);
    });

    test('Filter Users by Role: Librarian', async () => {
        const result = await filterUsersByRoleOption("librarian");
        expect(result).toBe(true);
    });
});