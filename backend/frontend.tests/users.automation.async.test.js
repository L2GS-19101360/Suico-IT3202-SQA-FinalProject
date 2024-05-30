const { viewUsersBySearchInput,
        filterUsersByRoleOption,
        updateUserByActivateButton,
        updateUserByDeactivateButton,
        updateUserProfile } = require('../frontend.async/users.automation.async');

jest.setTimeout(30000);

describe('Update User Automation Testing', () => {
    test('Update User Profile with new profile picture', async () => {
        const data = {
            image: '../sampleProfilePictures/homer3.jpg',
            currFirstname: 'Homer Jay',
            currLastname: 'Simpson',
            currEmail: 'HomerSimpson123',
            currPassword: 'Homer123',
            confirmPassword: 'Homer123'
        }
        const result = await updateUserProfile(data);
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