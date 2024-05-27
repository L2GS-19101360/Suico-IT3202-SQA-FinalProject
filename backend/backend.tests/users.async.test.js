const axios = require('axios');
const { viewAllUsers,
    viewAllUsersByRole,
    viewAllUsersByStatus,
    viewAccountByFirstName,
    viewAccountByLastName,
    viewAccountByEmail,
    activateUser,
    deactivateUser,
    updateUserAccount,
    updateLibrarianAccount,
    updateAdminAccount } = require('../backend.async/users.async');

jest.mock('axios');

describe('Testing Update All Users Backend with Jest', () => {
    test('Updates User Account with all required information', async () => {
        const data = {
            id: 6,
            image: "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/UserImages%2FHomer1.jpg?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/UserImages/Homer1.jpg?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=kS4ZSqjk7CDmB0fMj8byTOkXhugdYA5xZF6N2YOWOzc4dPUiLXe6Sa1zwuqeWMxtZD7GmsSTAjDL%2Bnax83NdsH2QSUEo%2F5nbn8TEQDrVpvN5Oa9zgV5iMkUZT24Jt3EsZMj9rd9Ogl1ZAEa2g%2FtWp0A4MDOl8DVpYsd72Ge7EXe429LysnS5c6o9AOhxcKfSyuib3s3n3dCtGHEhGrTO3VkOXmAzqVTfELqf6f82ogRFnYdBsmZiWGLIJmjWyIthHMyAcJJtqz44oytpGSC2xNupoSllOXONXruMonRXXojI7AMrQKVo3xZSBljYg%2Bzhwy7NDh1mccbfBzmmKc%2BliQ%3D%3D",
            image_filename: "Homer1.jpg",
            firstname: "Homer",
            lastname: "Simpson",
            email: "HomerSimpson@gmail.com",
            password: "Simpson",
        }

        const response = {
            data: {
                error: false,
                status: 200,
                message: "User Updated Successfully!",
            }
        };

        axios.put.mockResolvedValue(response);

        const result = await updateUserAccount(data.id, data.image, data.image_filename, data.firstname, data.lastname, data.email, data.password);

        expect(result).toEqual(response.data);
    });
    test('Updates User Account without all required information', async () => {
        const data = {
            id: 6,
            image: null,
            image_filename: null,
            firstname: null,
            lastname: null,
            email: null,
            password: null,
        }

        const response = {
            data: {
                error: true,
                message: "Please Provide All Required Fields"
            }
        };

        axios.put.mockResolvedValue(response);

        const result = await updateUserAccount(data.id, data.image, data.image_filename, data.firstname, data.lastname, data.email, data.password);

        expect(result).toEqual(response.data);
    });
    test('Updates User Account without image data', async () => {
        const data = {
            id: 6,
            image: null,
            image_filename: null,
            firstname: "Homer",
            lastname: "Simpson",
            email: "HomerSimpson@gmail.com",
            password: "Simpson",
        }

        const response = {
            data: {
                error: true,
                message: "Please Provide All Required Fields"
            }
        };

        axios.put.mockResolvedValue(response);

        const result = await updateUserAccount(data.id, data.image, data.image_filename, data.firstname, data.lastname, data.email, data.password);

        expect(result).toEqual(response.data);
    });
    test('Updates User Account without first name', async () => {
        const data = {
            id: 6,
            image: "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/UserImages%2FHomer1.jpg?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/UserImages/Homer1.jpg?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=kS4ZSqjk7CDmB0fMj8byTOkXhugdYA5xZF6N2YOWOzc4dPUiLXe6Sa1zwuqeWMxtZD7GmsSTAjDL%2Bnax83NdsH2QSUEo%2F5nbn8TEQDrVpvN5Oa9zgV5iMkUZT24Jt3EsZMj9rd9Ogl1ZAEa2g%2FtWp0A4MDOl8DVpYsd72Ge7EXe429LysnS5c6o9AOhxcKfSyuib3s3n3dCtGHEhGrTO3VkOXmAzqVTfELqf6f82ogRFnYdBsmZiWGLIJmjWyIthHMyAcJJtqz44oytpGSC2xNupoSllOXONXruMonRXXojI7AMrQKVo3xZSBljYg%2Bzhwy7NDh1mccbfBzmmKc%2BliQ%3D%3D",
            image_filename: "Homer1.jpg",
            firstname: null,
            lastname: "Simpson",
            email: "HomerSimpson@gmail.com",
            password: "Simpson",
        }

        const response = {
            data: {
                error: true,
                message: "Please Provide All Required Fields"
            }
        };

        axios.put.mockResolvedValue(response);

        const result = await updateUserAccount(data.id, data.image, data.image_filename, data.firstname, data.lastname, data.email, data.password);

        expect(result).toEqual(response.data);
    });
    test('Updates User Account without last name', async () => {
        const data = {
            id: 6,
            image: "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/UserImages%2FHomer1.jpg?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/UserImages/Homer1.jpg?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=kS4ZSqjk7CDmB0fMj8byTOkXhugdYA5xZF6N2YOWOzc4dPUiLXe6Sa1zwuqeWMxtZD7GmsSTAjDL%2Bnax83NdsH2QSUEo%2F5nbn8TEQDrVpvN5Oa9zgV5iMkUZT24Jt3EsZMj9rd9Ogl1ZAEa2g%2FtWp0A4MDOl8DVpYsd72Ge7EXe429LysnS5c6o9AOhxcKfSyuib3s3n3dCtGHEhGrTO3VkOXmAzqVTfELqf6f82ogRFnYdBsmZiWGLIJmjWyIthHMyAcJJtqz44oytpGSC2xNupoSllOXONXruMonRXXojI7AMrQKVo3xZSBljYg%2Bzhwy7NDh1mccbfBzmmKc%2BliQ%3D%3D",
            image_filename: "Homer1.jpg",
            firstname: "Homer",
            lastname: null,
            email: "HomerSimpson@gmail.com",
            password: "Simpson",
        }

        const response = {
            data: {
                error: true,
                message: "Please Provide All Required Fields"
            }
        };

        axios.put.mockResolvedValue(response);

        const result = await updateUserAccount(data.id, data.image, data.image_filename, data.firstname, data.lastname, data.email, data.password);

        expect(result).toEqual(response.data);
    });
    test('Updates User Account without email', async () => {
        const data = {
            id: 6,
            image: "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/UserImages%2FHomer1.jpg?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/UserImages/Homer1.jpg?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=kS4ZSqjk7CDmB0fMj8byTOkXhugdYA5xZF6N2YOWOzc4dPUiLXe6Sa1zwuqeWMxtZD7GmsSTAjDL%2Bnax83NdsH2QSUEo%2F5nbn8TEQDrVpvN5Oa9zgV5iMkUZT24Jt3EsZMj9rd9Ogl1ZAEa2g%2FtWp0A4MDOl8DVpYsd72Ge7EXe429LysnS5c6o9AOhxcKfSyuib3s3n3dCtGHEhGrTO3VkOXmAzqVTfELqf6f82ogRFnYdBsmZiWGLIJmjWyIthHMyAcJJtqz44oytpGSC2xNupoSllOXONXruMonRXXojI7AMrQKVo3xZSBljYg%2Bzhwy7NDh1mccbfBzmmKc%2BliQ%3D%3D",
            image_filename: "Homer1.jpg",
            firstname: "Homer",
            lastname: "Simpson",
            email: null,
            password: "Simpson",
        }

        const response = {
            data: {
                error: true,
                message: "Please Provide All Required Fields"
            }
        };

        axios.put.mockResolvedValue(response);

        const result = await updateUserAccount(data.id, data.image, data.image_filename, data.firstname, data.lastname, data.email, data.password);

        expect(result).toEqual(response.data);
    });
    test('Updates User Account without password', async () => {
        const data = {
            id: 6,
            image: "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/UserImages%2FHomer1.jpg?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/UserImages/Homer1.jpg?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=kS4ZSqjk7CDmB0fMj8byTOkXhugdYA5xZF6N2YOWOzc4dPUiLXe6Sa1zwuqeWMxtZD7GmsSTAjDL%2Bnax83NdsH2QSUEo%2F5nbn8TEQDrVpvN5Oa9zgV5iMkUZT24Jt3EsZMj9rd9Ogl1ZAEa2g%2FtWp0A4MDOl8DVpYsd72Ge7EXe429LysnS5c6o9AOhxcKfSyuib3s3n3dCtGHEhGrTO3VkOXmAzqVTfELqf6f82ogRFnYdBsmZiWGLIJmjWyIthHMyAcJJtqz44oytpGSC2xNupoSllOXONXruMonRXXojI7AMrQKVo3xZSBljYg%2Bzhwy7NDh1mccbfBzmmKc%2BliQ%3D%3D",
            image_filename: "Homer1.jpg",
            firstname: "Homer",
            lastname: "Simpson",
            email: "HomerSimpson@gmail.com",
            password: null,
        }

        const response = {
            data: {
                error: true,
                message: "Please Provide All Required Fields"
            }
        };

        axios.put.mockResolvedValue(response);

        const result = await updateUserAccount(data.id, data.image, data.image_filename, data.firstname, data.lastname, data.email, data.password);

        expect(result).toEqual(response.data);
    });


    test('Updates Librarian Account', async () => {
        const data = {
            id: 3,
            image: "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/UserImages%2FHouse.jpg?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/UserImages/House.jpg?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=EovUDE%2FP1Y4v8GiENT09ShBbyAy7SKDAZzoucKsV9uHAALQ5LCHx%2Bq4Hd1YxA0%2FKtmYNSqTudlIKAvKoz%2FyEV99NRqSfGRjuGkD0tSKsaJQRYHSTPrbSAiBM22gw42262ZVk3TvAWfrHjafqH4j37%2B6CMhQiXPPSukB5TKuXu7HbUwdLpGC9no1i6EI7DmGt1U1luVMB75hxhVxepfAbuZow2gXWgLyX5gNaxpnECEw%2BfNDZTU8%2Buf0MHiofrDiaG%2FpqTc9vDoNJIk46gkeDps3pY8rQ5mBNYWt7Kh8nWLnNlMzsoCStLkPhxdusQpMTXCS%2BIaYmHEbPGs1OaJskGw%3D%3D",
            image_filename: "House.jpg",
            firstname: "Gregory",
            lastname: "House",
            email: "HouseGregory@gmail.com",
            password: "House",
        }

        const response = {
            data: {
                error: false,
                status: 200,
                message: "User Updated Successfully!",
            }
        };

        axios.put.mockResolvedValue(response);

        const result = await updateLibrarianAccount(data.id, data.image, data.image_filename, data.firstname, data.lastname, data.email, data.password);

        expect(result).toEqual(response.data);
    });
    test('Updates Librarian Account without all required information', async () => {
        const data = {
            id: 3,
            image: null,
            image_filename: null,
            firstname: null,
            lastname: null,
            email: null,
            password: null,
        }

        const response = {
            data: {
                error: true,
                message: "Please Provide All Required Fields"
            }
        };

        axios.put.mockResolvedValue(response);

        const result = await updateUserAccount(data.id, data.image, data.image_filename, data.firstname, data.lastname, data.email, data.password);

        expect(result).toEqual(response.data);
    });
    test('Updates Librarian Account without image data', async () => {
        const data = {
            id: 3,
            image: null,
            image_filename: null,
            firstname: "Gregory",
            lastname: "House",
            email: "HouseGregory@gmail.com",
            password: "House",
        }

        const response = {
            data: {
                error: true,
                message: "Please Provide All Required Fields"
            }
        };

        axios.put.mockResolvedValue(response);

        const result = await updateUserAccount(data.id, data.image, data.image_filename, data.firstname, data.lastname, data.email, data.password);

        expect(result).toEqual(response.data);
    });
    test('Updates Librarian Account without first name', async () => {
        const data = {
            id: 3,
            image: "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/UserImages%2FHomer1.jpg?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/UserImages/Homer1.jpg?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=kS4ZSqjk7CDmB0fMj8byTOkXhugdYA5xZF6N2YOWOzc4dPUiLXe6Sa1zwuqeWMxtZD7GmsSTAjDL%2Bnax83NdsH2QSUEo%2F5nbn8TEQDrVpvN5Oa9zgV5iMkUZT24Jt3EsZMj9rd9Ogl1ZAEa2g%2FtWp0A4MDOl8DVpYsd72Ge7EXe429LysnS5c6o9AOhxcKfSyuib3s3n3dCtGHEhGrTO3VkOXmAzqVTfELqf6f82ogRFnYdBsmZiWGLIJmjWyIthHMyAcJJtqz44oytpGSC2xNupoSllOXONXruMonRXXojI7AMrQKVo3xZSBljYg%2Bzhwy7NDh1mccbfBzmmKc%2BliQ%3D%3D",
            firstname: null,
            lastname: "House",
            email: "HouseGregory@gmail.com",
            password: "House",
        }

        const response = {
            data: {
                error: true,
                message: "Please Provide All Required Fields"
            }
        };

        axios.put.mockResolvedValue(response);

        const result = await updateUserAccount(data.id, data.image, data.image_filename, data.firstname, data.lastname, data.email, data.password);

        expect(result).toEqual(response.data);
    });
    test('Updates Librarian Account without last name', async () => {
        const data = {
            id: 3,
            image: "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/UserImages%2FHouse.jpg?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/UserImages/House.jpg?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=EovUDE%2FP1Y4v8GiENT09ShBbyAy7SKDAZzoucKsV9uHAALQ5LCHx%2Bq4Hd1YxA0%2FKtmYNSqTudlIKAvKoz%2FyEV99NRqSfGRjuGkD0tSKsaJQRYHSTPrbSAiBM22gw42262ZVk3TvAWfrHjafqH4j37%2B6CMhQiXPPSukB5TKuXu7HbUwdLpGC9no1i6EI7DmGt1U1luVMB75hxhVxepfAbuZow2gXWgLyX5gNaxpnECEw%2BfNDZTU8%2Buf0MHiofrDiaG%2FpqTc9vDoNJIk46gkeDps3pY8rQ5mBNYWt7Kh8nWLnNlMzsoCStLkPhxdusQpMTXCS%2BIaYmHEbPGs1OaJskGw%3D%3D",
            image_filename: "House.jpg",
            firstname: "Gregory",
            lastname: null,
            email: "HouseGregory@gmail.com",
            password: "House",
        }

        const response = {
            data: {
                error: true,
                message: "Please Provide All Required Fields"
            }
        };

        axios.put.mockResolvedValue(response);

        const result = await updateUserAccount(data.id, data.image, data.image_filename, data.firstname, data.lastname, data.email, data.password);

        expect(result).toEqual(response.data);
    });
    test('Updates Librarian Account without email', async () => {
        const data = {
            id: 3,
            image: "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/UserImages%2FHouse.jpg?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/UserImages/House.jpg?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=EovUDE%2FP1Y4v8GiENT09ShBbyAy7SKDAZzoucKsV9uHAALQ5LCHx%2Bq4Hd1YxA0%2FKtmYNSqTudlIKAvKoz%2FyEV99NRqSfGRjuGkD0tSKsaJQRYHSTPrbSAiBM22gw42262ZVk3TvAWfrHjafqH4j37%2B6CMhQiXPPSukB5TKuXu7HbUwdLpGC9no1i6EI7DmGt1U1luVMB75hxhVxepfAbuZow2gXWgLyX5gNaxpnECEw%2BfNDZTU8%2Buf0MHiofrDiaG%2FpqTc9vDoNJIk46gkeDps3pY8rQ5mBNYWt7Kh8nWLnNlMzsoCStLkPhxdusQpMTXCS%2BIaYmHEbPGs1OaJskGw%3D%3D",
            image_filename: "House.jpg",
            firstname: "Gregory",
            lastname: "House",
            email: null,
            password: "House",
        }

        const response = {
            data: {
                error: true,
                message: "Please Provide All Required Fields"
            }
        };

        axios.put.mockResolvedValue(response);

        const result = await updateUserAccount(data.id, data.image, data.image_filename, data.firstname, data.lastname, data.email, data.password);

        expect(result).toEqual(response.data);
    });
    test('Updates librarian Account without password', async () => {
        const data = {
            id: 3,
            image: "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/UserImages%2FHouse.jpg?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/UserImages/House.jpg?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=EovUDE%2FP1Y4v8GiENT09ShBbyAy7SKDAZzoucKsV9uHAALQ5LCHx%2Bq4Hd1YxA0%2FKtmYNSqTudlIKAvKoz%2FyEV99NRqSfGRjuGkD0tSKsaJQRYHSTPrbSAiBM22gw42262ZVk3TvAWfrHjafqH4j37%2B6CMhQiXPPSukB5TKuXu7HbUwdLpGC9no1i6EI7DmGt1U1luVMB75hxhVxepfAbuZow2gXWgLyX5gNaxpnECEw%2BfNDZTU8%2Buf0MHiofrDiaG%2FpqTc9vDoNJIk46gkeDps3pY8rQ5mBNYWt7Kh8nWLnNlMzsoCStLkPhxdusQpMTXCS%2BIaYmHEbPGs1OaJskGw%3D%3D",
            image_filename: "House.jpg",
            firstname: "Gregory",
            lastname: "House",
            email: "HouseGregory@gmail.com",
            password: null,
        }

        const response = {
            data: {
                error: true,
                message: "Please Provide All Required Fields"
            }
        };

        axios.put.mockResolvedValue(response);

        const result = await updateUserAccount(data.id, data.image, data.image_filename, data.firstname, data.lastname, data.email, data.password);

        expect(result).toEqual(response.data);
    });


    test('Updates Admin Account', async () => {
        const data = {
            id: 1,
            image: "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/UserImages%2FLorenz.jpg?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/UserImages/Lorenz.jpg?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=YaSbR0kWEOCkF5IpBHSnq%2F7LHjwXRLr8QCJL2CaL4TlWalC6eUCWXe6XfTgvx2o9PphBPqkk%2BuQco3X40ZV6FhrX7l3fopyhT9RcIkyqmnpokH%2BqtNqkFBipjZAlWZfA4Mom5Lvz6iK6N9Xtpkhu5E26EIn19jwfkZTxpn3ISemstHJ4cHu3PiXH4GUMjYmp6Kgw2umthCaOm5OXvIuGiSEai%2FIgSChaD0oeCIRwprMbYWbf0chJlvofZPdwBkwviOBU6cw0y15GWCFfsUrM7CVYwzn6U9yLi8Prw5%2FEo7M4MeV5rQqVNqivAmRj1AlYVS6JrC2SHOrwG9DHQfji1g%3D%3D",
            image_filename: "Lorenz.jpg",
            firstname: "Lawrence",
            lastname: "Gilbert",
            email: "GilbertLawrence@gmail.com",
            password: "Gilbert",
        }

        const response = {
            data: {
                error: false,
                status: 200,
                message: "User Updated Successfully!",
            }
        };

        axios.put.mockResolvedValue(response);

        const result = await updateAdminAccount(data.id, data.image, data.image_filename, data.firstname, data.lastname, data.email, data.password);

        expect(result).toEqual(response.data);
    });
    test('Updates Admin Account without all required information', async () => {
        const data = {
            id: 1,
            image: null,
            image_filename: null,
            firstname: null,
            lastname: null,
            email: null,
            password: null,
        }

        const response = {
            data: {
                error: true,
                message: "Please Provide All Required Fields"
            }
        };

        axios.put.mockResolvedValue(response);

        const result = await updateUserAccount(data.id, data.image, data.image_filename, data.firstname, data.lastname, data.email, data.password);

        expect(result).toEqual(response.data);
    });
    test('Updates Admin Account without image data', async () => {
        const data = {
            id: 1,
            image: null,
            image_filename: null,
            firstname: "Lawrence",
            lastname: "Gilbert",
            email: "GilbertLawrence@gmail.com",
            password: "Gilbert",
        }

        const response = {
            data: {
                error: true,
                message: "Please Provide All Required Fields"
            }
        };

        axios.put.mockResolvedValue(response);

        const result = await updateUserAccount(data.id, data.image, data.image_filename, data.firstname, data.lastname, data.email, data.password);

        expect(result).toEqual(response.data);
    });
    test('Updates Admin Account without first name', async () => {
        const data = {
            id: 1,
            image: "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/UserImages%2FLorenz.jpg?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/UserImages/Lorenz.jpg?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=YaSbR0kWEOCkF5IpBHSnq%2F7LHjwXRLr8QCJL2CaL4TlWalC6eUCWXe6XfTgvx2o9PphBPqkk%2BuQco3X40ZV6FhrX7l3fopyhT9RcIkyqmnpokH%2BqtNqkFBipjZAlWZfA4Mom5Lvz6iK6N9Xtpkhu5E26EIn19jwfkZTxpn3ISemstHJ4cHu3PiXH4GUMjYmp6Kgw2umthCaOm5OXvIuGiSEai%2FIgSChaD0oeCIRwprMbYWbf0chJlvofZPdwBkwviOBU6cw0y15GWCFfsUrM7CVYwzn6U9yLi8Prw5%2FEo7M4MeV5rQqVNqivAmRj1AlYVS6JrC2SHOrwG9DHQfji1g%3D%3D",
            image_filename: "Lorenz.jpg",
            firstname: null,
            lastname: "Gilbert",
            email: "GilbertLawrence@gmail.com",
            password: "Gilbert",
        }

        const response = {
            data: {
                error: true,
                message: "Please Provide All Required Fields"
            }
        };

        axios.put.mockResolvedValue(response);

        const result = await updateUserAccount(data.id, data.image, data.image_filename, data.firstname, data.lastname, data.email, data.password);

        expect(result).toEqual(response.data);
    });
    test('Updates Admin Account without last name', async () => {
        const data = {
            id: 1,
            image: "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/UserImages%2FLorenz.jpg?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/UserImages/Lorenz.jpg?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=YaSbR0kWEOCkF5IpBHSnq%2F7LHjwXRLr8QCJL2CaL4TlWalC6eUCWXe6XfTgvx2o9PphBPqkk%2BuQco3X40ZV6FhrX7l3fopyhT9RcIkyqmnpokH%2BqtNqkFBipjZAlWZfA4Mom5Lvz6iK6N9Xtpkhu5E26EIn19jwfkZTxpn3ISemstHJ4cHu3PiXH4GUMjYmp6Kgw2umthCaOm5OXvIuGiSEai%2FIgSChaD0oeCIRwprMbYWbf0chJlvofZPdwBkwviOBU6cw0y15GWCFfsUrM7CVYwzn6U9yLi8Prw5%2FEo7M4MeV5rQqVNqivAmRj1AlYVS6JrC2SHOrwG9DHQfji1g%3D%3D",
            image_filename: "Lorenz.jpg",
            firstname: "Lawrence",
            lastname: null,
            email: "GilbertLawrence@gmail.com",
            password: "Gilbert",
        }

        const response = {
            data: {
                error: true,
                message: "Please Provide All Required Fields"
            }
        };

        axios.put.mockResolvedValue(response);

        const result = await updateUserAccount(data.id, data.image, data.image_filename, data.firstname, data.lastname, data.email, data.password);

        expect(result).toEqual(response.data);
    });
    test('Updates Admin Account without email', async () => {
        const data = {
            id: 1,
            image: "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/UserImages%2FLorenz.jpg?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/UserImages/Lorenz.jpg?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=YaSbR0kWEOCkF5IpBHSnq%2F7LHjwXRLr8QCJL2CaL4TlWalC6eUCWXe6XfTgvx2o9PphBPqkk%2BuQco3X40ZV6FhrX7l3fopyhT9RcIkyqmnpokH%2BqtNqkFBipjZAlWZfA4Mom5Lvz6iK6N9Xtpkhu5E26EIn19jwfkZTxpn3ISemstHJ4cHu3PiXH4GUMjYmp6Kgw2umthCaOm5OXvIuGiSEai%2FIgSChaD0oeCIRwprMbYWbf0chJlvofZPdwBkwviOBU6cw0y15GWCFfsUrM7CVYwzn6U9yLi8Prw5%2FEo7M4MeV5rQqVNqivAmRj1AlYVS6JrC2SHOrwG9DHQfji1g%3D%3D",
            image_filename: "Lorenz.jpg",
            firstname: "Lawrence",
            lastname: "Gilbert",
            email: null,
            password: "Gilbert",
        }

        const response = {
            data: {
                error: true,
                message: "Please Provide All Required Fields"
            }
        };

        axios.put.mockResolvedValue(response);

        const result = await updateUserAccount(data.id, data.image, data.image_filename, data.firstname, data.lastname, data.email, data.password);

        expect(result).toEqual(response.data);
    });
    test('Updates Admin Account without password', async () => {
        const data = {
            id: 1,
            image: "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/UserImages%2FLorenz.jpg?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/UserImages/Lorenz.jpg?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=YaSbR0kWEOCkF5IpBHSnq%2F7LHjwXRLr8QCJL2CaL4TlWalC6eUCWXe6XfTgvx2o9PphBPqkk%2BuQco3X40ZV6FhrX7l3fopyhT9RcIkyqmnpokH%2BqtNqkFBipjZAlWZfA4Mom5Lvz6iK6N9Xtpkhu5E26EIn19jwfkZTxpn3ISemstHJ4cHu3PiXH4GUMjYmp6Kgw2umthCaOm5OXvIuGiSEai%2FIgSChaD0oeCIRwprMbYWbf0chJlvofZPdwBkwviOBU6cw0y15GWCFfsUrM7CVYwzn6U9yLi8Prw5%2FEo7M4MeV5rQqVNqivAmRj1AlYVS6JrC2SHOrwG9DHQfji1g%3D%3D",
            image_filename: "Lorenz.jpg",
            firstname: "Lawrence",
            lastname: "Gilbert",
            email: "GilbertLawrence@gmail.com",
            password: null,
        }

        const response = {
            data: {
                error: true,
                message: "Please Provide All Required Fields"
            }
        };

        axios.put.mockResolvedValue(response);

        const result = await updateUserAccount(data.id, data.image, data.image_filename, data.firstname, data.lastname, data.email, data.password);

        expect(result).toEqual(response.data);
    });


    test('Activates the User Account', async () => {
        const response = {
            data: {
                error: false,
                message: "User deactivated successfully"
            }
        };

        axios.put.mockResolvedValue(response);

        const result = await activateUser(38);
        expect(result).toEqual(response.data);
    });
    test('Deactivates the User Account', async () => {
        const response = {
            data: {
                error: false,
                message: "User deactivated successfully"
            }
        };

        axios.put.mockResolvedValue(response);

        const result = await deactivateUser(38);
        expect(result).toEqual(response.data);
    });
    test('Activates the Librarian Account', async () => {
        const response = {
            data: {
                error: false,
                message: "User deactivated successfully"
            }
        };

        axios.put.mockResolvedValue(response);

        const result = await activateUser(40);
        expect(result).toEqual(response.data);
    });
    test('Deactivates the User Account', async () => {
        const response = {
            data: {
                error: false,
                message: "User deactivated successfully"
            }
        };

        axios.put.mockResolvedValue(response);

        const result = await deactivateUser(40);
        expect(result).toEqual(response.data);
    });
});

describe('Testing Read All Users Backend with Jest', () => {
    test('Fetches all user data from the database', async () => {
        const response = {
            data: {
                status: 200,
                data: [
                    {
                        "id": 6,
                        "image": "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/UserImages%2FHomer1.jpg?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/UserImages/Homer1.jpg?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=kS4ZSqjk7CDmB0fMj8byTOkXhugdYA5xZF6N2YOWOzc4dPUiLXe6Sa1zwuqeWMxtZD7GmsSTAjDL%2Bnax83NdsH2QSUEo%2F5nbn8TEQDrVpvN5Oa9zgV5iMkUZT24Jt3EsZMj9rd9Ogl1ZAEa2g%2FtWp0A4MDOl8DVpYsd72Ge7EXe429LysnS5c6o9AOhxcKfSyuib3s3n3dCtGHEhGrTO3VkOXmAzqVTfELqf6f82ogRFnYdBsmZiWGLIJmjWyIthHMyAcJJtqz44oytpGSC2xNupoSllOXONXruMonRXXojI7AMrQKVo3xZSBljYg%2Bzhwy7NDh1mccbfBzmmKc%2BliQ%3D%3D",
                        "image_filename": "Homer1.jpg",
                        "firstname": "Homer",
                        "lastname": "Simpson",
                        "email": "HomerSimpson@gmail.com",
                        "password": "$2b$10$9eLctTqOVlIA.aLUWbCwieHOqMl2QGg4TSD2cLPHFum69nxcH3ARi",
                        "role": "user",
                        "active_status": 1,
                        "created": "2024-04-14T07:26:32.000Z",
                        "updated": "2024-05-26T09:25:32.000Z"
                    },
                    {
                        "id": 3,
                        "image": "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/UserImages%2FHouse.jpg?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/UserImages/House.jpg?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=EovUDE%2FP1Y4v8GiENT09ShBbyAy7SKDAZzoucKsV9uHAALQ5LCHx%2Bq4Hd1YxA0%2FKtmYNSqTudlIKAvKoz%2FyEV99NRqSfGRjuGkD0tSKsaJQRYHSTPrbSAiBM22gw42262ZVk3TvAWfrHjafqH4j37%2B6CMhQiXPPSukB5TKuXu7HbUwdLpGC9no1i6EI7DmGt1U1luVMB75hxhVxepfAbuZow2gXWgLyX5gNaxpnECEw%2BfNDZTU8%2Buf0MHiofrDiaG%2FpqTc9vDoNJIk46gkeDps3pY8rQ5mBNYWt7Kh8nWLnNlMzsoCStLkPhxdusQpMTXCS%2BIaYmHEbPGs1OaJskGw%3D%3D",
                        "image_filename": "House.jpg",
                        "firstname": "Gregory",
                        "lastname": "House",
                        "email": "HouseGregory@gmail.com",
                        "password": "$2b$10$2wpbpa4.z2C1eOBjGhUVIe75R3Rau0tpHqSP2F2FpSD8G.3tIG0KC",
                        "role": "librarian",
                        "active_status": 1,
                        "created": "2024-04-14T07:26:32.000Z",
                        "updated": "2024-05-25T16:34:31.000Z"
                    },
                    {
                        "id": 1,
                        "image": "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/UserImages%2FLorenz.jpg?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/UserImages/Lorenz.jpg?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=YaSbR0kWEOCkF5IpBHSnq%2F7LHjwXRLr8QCJL2CaL4TlWalC6eUCWXe6XfTgvx2o9PphBPqkk%2BuQco3X40ZV6FhrX7l3fopyhT9RcIkyqmnpokH%2BqtNqkFBipjZAlWZfA4Mom5Lvz6iK6N9Xtpkhu5E26EIn19jwfkZTxpn3ISemstHJ4cHu3PiXH4GUMjYmp6Kgw2umthCaOm5OXvIuGiSEai%2FIgSChaD0oeCIRwprMbYWbf0chJlvofZPdwBkwviOBU6cw0y15GWCFfsUrM7CVYwzn6U9yLi8Prw5%2FEo7M4MeV5rQqVNqivAmRj1AlYVS6JrC2SHOrwG9DHQfji1g%3D%3D",
                        "image_filename": "Lorenz.jpg",
                        "firstname": "Lawrence",
                        "lastname": "Gilbert",
                        "email": "GilbertLawrence@gmail.com",
                        "password": "$2b$10$yuvDjTilR80034TsxdQDweEGD.VlqlDtNyVV6cOZKcclTT0ecxWOq",
                        "role": "admin",
                        "active_status": 1,
                        "created": "2024-04-14T07:26:32.000Z",
                        "updated": "2024-05-26T15:25:35.000Z"
                    },
                ]
            }
        };

        axios.get.mockResolvedValue(response);

        const result = await viewAllUsers();
        expect(result).toEqual(response.data);
    });

    test('Fetches all user data by user role from the database', async () => {
        const response = {
            data: {
                status: 200,
                data: [
                    {
                        "id": 6,
                        "image": "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/UserImages%2FHomer1.jpg?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/UserImages/Homer1.jpg?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=kS4ZSqjk7CDmB0fMj8byTOkXhugdYA5xZF6N2YOWOzc4dPUiLXe6Sa1zwuqeWMxtZD7GmsSTAjDL%2Bnax83NdsH2QSUEo%2F5nbn8TEQDrVpvN5Oa9zgV5iMkUZT24Jt3EsZMj9rd9Ogl1ZAEa2g%2FtWp0A4MDOl8DVpYsd72Ge7EXe429LysnS5c6o9AOhxcKfSyuib3s3n3dCtGHEhGrTO3VkOXmAzqVTfELqf6f82ogRFnYdBsmZiWGLIJmjWyIthHMyAcJJtqz44oytpGSC2xNupoSllOXONXruMonRXXojI7AMrQKVo3xZSBljYg%2Bzhwy7NDh1mccbfBzmmKc%2BliQ%3D%3D",
                        "image_filename": "Homer1.jpg",
                        "firstname": "Homer",
                        "lastname": "Simpson",
                        "email": "HomerSimpson@gmail.com",
                        "password": "$2b$10$9eLctTqOVlIA.aLUWbCwieHOqMl2QGg4TSD2cLPHFum69nxcH3ARi",
                        "role": "user",
                        "active_status": 1,
                        "created": "2024-04-14T07:26:32.000Z",
                        "updated": "2024-05-26T09:25:32.000Z"
                    },
                ]
            }
        };

        axios.get.mockResolvedValue(response);

        const result = await viewAllUsersByRole("user");
        expect(result).toEqual(response.data);
    });

    test('Fetches all user data by librarian role from the database', async () => {
        const response = {
            data: {
                status: 200,
                data: [
                    {
                        "id": 3,
                        "image": "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/UserImages%2FHouse.jpg?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/UserImages/House.jpg?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=EovUDE%2FP1Y4v8GiENT09ShBbyAy7SKDAZzoucKsV9uHAALQ5LCHx%2Bq4Hd1YxA0%2FKtmYNSqTudlIKAvKoz%2FyEV99NRqSfGRjuGkD0tSKsaJQRYHSTPrbSAiBM22gw42262ZVk3TvAWfrHjafqH4j37%2B6CMhQiXPPSukB5TKuXu7HbUwdLpGC9no1i6EI7DmGt1U1luVMB75hxhVxepfAbuZow2gXWgLyX5gNaxpnECEw%2BfNDZTU8%2Buf0MHiofrDiaG%2FpqTc9vDoNJIk46gkeDps3pY8rQ5mBNYWt7Kh8nWLnNlMzsoCStLkPhxdusQpMTXCS%2BIaYmHEbPGs1OaJskGw%3D%3D",
                        "image_filename": "House.jpg",
                        "firstname": "Gregory",
                        "lastname": "House",
                        "email": "HouseGregory@gmail.com",
                        "password": "$2b$10$2wpbpa4.z2C1eOBjGhUVIe75R3Rau0tpHqSP2F2FpSD8G.3tIG0KC",
                        "role": "librarian",
                        "active_status": 1,
                        "created": "2024-04-14T07:26:32.000Z",
                        "updated": "2024-05-25T16:34:31.000Z"
                    },
                ]
            }
        };

        axios.get.mockResolvedValue(response);

        const result = await viewAllUsersByRole("librarian");
        expect(result).toEqual(response.data);
    });

    test('Fetches all user data by admin role from the database', async () => {
        const response = {
            data: {
                status: 200,
                data: [
                    {
                        "id": 1,
                        "image": "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/UserImages%2FLorenz.jpg?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/UserImages/Lorenz.jpg?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=YaSbR0kWEOCkF5IpBHSnq%2F7LHjwXRLr8QCJL2CaL4TlWalC6eUCWXe6XfTgvx2o9PphBPqkk%2BuQco3X40ZV6FhrX7l3fopyhT9RcIkyqmnpokH%2BqtNqkFBipjZAlWZfA4Mom5Lvz6iK6N9Xtpkhu5E26EIn19jwfkZTxpn3ISemstHJ4cHu3PiXH4GUMjYmp6Kgw2umthCaOm5OXvIuGiSEai%2FIgSChaD0oeCIRwprMbYWbf0chJlvofZPdwBkwviOBU6cw0y15GWCFfsUrM7CVYwzn6U9yLi8Prw5%2FEo7M4MeV5rQqVNqivAmRj1AlYVS6JrC2SHOrwG9DHQfji1g%3D%3D",
                        "image_filename": "Lorenz.jpg",
                        "firstname": "Lawrence",
                        "lastname": "Gilbert",
                        "email": "GilbertLawrence@gmail.com",
                        "password": "$2b$10$yuvDjTilR80034TsxdQDweEGD.VlqlDtNyVV6cOZKcclTT0ecxWOq",
                        "role": "admin",
                        "active_status": 1,
                        "created": "2024-04-14T07:26:32.000Z",
                        "updated": "2024-05-26T15:25:35.000Z"
                    },
                ]
            }
        };

        axios.get.mockResolvedValue(response);

        const result = await viewAllUsersByRole("admin");
        expect(result).toEqual(response.data);
    });

    test('Fetches all user data by active status from the database', async () => {
        const response = {
            data: {
                status: 200,
                data: [
                    {
                        "id": 6,
                        "image": "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/UserImages%2FHomer1.jpg?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/UserImages/Homer1.jpg?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=kS4ZSqjk7CDmB0fMj8byTOkXhugdYA5xZF6N2YOWOzc4dPUiLXe6Sa1zwuqeWMxtZD7GmsSTAjDL%2Bnax83NdsH2QSUEo%2F5nbn8TEQDrVpvN5Oa9zgV5iMkUZT24Jt3EsZMj9rd9Ogl1ZAEa2g%2FtWp0A4MDOl8DVpYsd72Ge7EXe429LysnS5c6o9AOhxcKfSyuib3s3n3dCtGHEhGrTO3VkOXmAzqVTfELqf6f82ogRFnYdBsmZiWGLIJmjWyIthHMyAcJJtqz44oytpGSC2xNupoSllOXONXruMonRXXojI7AMrQKVo3xZSBljYg%2Bzhwy7NDh1mccbfBzmmKc%2BliQ%3D%3D",
                        "image_filename": "Homer1.jpg",
                        "firstname": "Homer",
                        "lastname": "Simpson",
                        "email": "HomerSimpson@gmail.com",
                        "password": "$2b$10$9eLctTqOVlIA.aLUWbCwieHOqMl2QGg4TSD2cLPHFum69nxcH3ARi",
                        "role": "user",
                        "active_status": 1,
                        "created": "2024-04-14T07:26:32.000Z",
                        "updated": "2024-05-26T09:25:32.000Z"
                    },
                    {
                        "id": 3,
                        "image": "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/UserImages%2FHouse.jpg?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/UserImages/House.jpg?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=EovUDE%2FP1Y4v8GiENT09ShBbyAy7SKDAZzoucKsV9uHAALQ5LCHx%2Bq4Hd1YxA0%2FKtmYNSqTudlIKAvKoz%2FyEV99NRqSfGRjuGkD0tSKsaJQRYHSTPrbSAiBM22gw42262ZVk3TvAWfrHjafqH4j37%2B6CMhQiXPPSukB5TKuXu7HbUwdLpGC9no1i6EI7DmGt1U1luVMB75hxhVxepfAbuZow2gXWgLyX5gNaxpnECEw%2BfNDZTU8%2Buf0MHiofrDiaG%2FpqTc9vDoNJIk46gkeDps3pY8rQ5mBNYWt7Kh8nWLnNlMzsoCStLkPhxdusQpMTXCS%2BIaYmHEbPGs1OaJskGw%3D%3D",
                        "image_filename": "House.jpg",
                        "firstname": "Gregory",
                        "lastname": "House",
                        "email": "HouseGregory@gmail.com",
                        "password": "$2b$10$2wpbpa4.z2C1eOBjGhUVIe75R3Rau0tpHqSP2F2FpSD8G.3tIG0KC",
                        "role": "librarian",
                        "active_status": 1,
                        "created": "2024-04-14T07:26:32.000Z",
                        "updated": "2024-05-25T16:34:31.000Z"
                    },
                    {
                        "id": 1,
                        "image": "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/UserImages%2FLorenz.jpg?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/UserImages/Lorenz.jpg?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=YaSbR0kWEOCkF5IpBHSnq%2F7LHjwXRLr8QCJL2CaL4TlWalC6eUCWXe6XfTgvx2o9PphBPqkk%2BuQco3X40ZV6FhrX7l3fopyhT9RcIkyqmnpokH%2BqtNqkFBipjZAlWZfA4Mom5Lvz6iK6N9Xtpkhu5E26EIn19jwfkZTxpn3ISemstHJ4cHu3PiXH4GUMjYmp6Kgw2umthCaOm5OXvIuGiSEai%2FIgSChaD0oeCIRwprMbYWbf0chJlvofZPdwBkwviOBU6cw0y15GWCFfsUrM7CVYwzn6U9yLi8Prw5%2FEo7M4MeV5rQqVNqivAmRj1AlYVS6JrC2SHOrwG9DHQfji1g%3D%3D",
                        "image_filename": "Lorenz.jpg",
                        "firstname": "Lawrence",
                        "lastname": "Gilbert",
                        "email": "GilbertLawrence@gmail.com",
                        "password": "$2b$10$yuvDjTilR80034TsxdQDweEGD.VlqlDtNyVV6cOZKcclTT0ecxWOq",
                        "role": "admin",
                        "active_status": 1,
                        "created": "2024-04-14T07:26:32.000Z",
                        "updated": "2024-05-26T15:25:35.000Z"
                    },
                ]
            }
        };

        axios.get.mockResolvedValue(response);

        const result = await viewAllUsersByStatus(1);
        expect(result).toEqual(response.data);
    });

    test('Fetches all user data by inactive status from the database', async () => {
        const response = {
            data: {
                status: 200,
                data: [
                    {
                        "id": 40,
                        "image": "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/UserImages%2FTemp.jpg?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/UserImages/Temp.jpg?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=VpPN40gCAWDZli%2B7qq8siNxeXb9Rc0i0GkJivXSRQE8AGwmy9iU4BCJjcW%2FURaDhyYklKetRcLo02TJuSfZXkPCxqdfNBe5mwUQe3eRPPEoVQ%2FLjd1tbQRgkbw9t21bu%2FQhGoHIYOCxO1AHSq1c2b9J%2FH3g%2BsqRgsu%2BlUOXDcCw70e4cs0XvWWhAjqxwMte2494iNR7LMSgF9zK01hTi7raPSt2JEpUmg9oQC6fwQc8CeVpBM98jDBSl5jU6xbqFtcmkYNEYmvcT%2BamIyW4pcTIIL1IVCx1O29vFMd5LZ3wuvWrt6s8EOn3%2FbttXYMPvYWIbDMRRN1%2B2SaphYzauhg%3D%3D",
                        "image_filename": "Temp.jpg",
                        "firstname": "Bob",
                        "lastname": "Jones",
                        "email": "BobJones@gmail.com",
                        "password": "$2b$10$7B6C4LC0twvjVIbuj0BLmOnqe.AjObYDisbcXOeNBbzNMEIt07KYC",
                        "role": "user",
                        "active_status": 0,
                        "created": "2024-05-25T16:35:23.000Z",
                        "updated": "2024-05-25T16:48:22.000Z"
                    }
                ]
            }
        };

        axios.get.mockResolvedValue(response);

        const result = await viewAllUsersByStatus(0);
        expect(result).toEqual(response.data);
    });

    test('Fetches user data by firstname from the database', async () => {
        const response = {
            data: {
                status: 200,
                data: [
                    {
                        "id": 1,
                        "image": "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/UserImages%2FLorenz.jpg?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/UserImages/Lorenz.jpg?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=YaSbR0kWEOCkF5IpBHSnq%2F7LHjwXRLr8QCJL2CaL4TlWalC6eUCWXe6XfTgvx2o9PphBPqkk%2BuQco3X40ZV6FhrX7l3fopyhT9RcIkyqmnpokH%2BqtNqkFBipjZAlWZfA4Mom5Lvz6iK6N9Xtpkhu5E26EIn19jwfkZTxpn3ISemstHJ4cHu3PiXH4GUMjYmp6Kgw2umthCaOm5OXvIuGiSEai%2FIgSChaD0oeCIRwprMbYWbf0chJlvofZPdwBkwviOBU6cw0y15GWCFfsUrM7CVYwzn6U9yLi8Prw5%2FEo7M4MeV5rQqVNqivAmRj1AlYVS6JrC2SHOrwG9DHQfji1g%3D%3D",
                        "image_filename": "Lorenz.jpg",
                        "firstname": "Lawrence",
                        "lastname": "Gilbert",
                        "email": "GilbertLawrence@gmail.com",
                        "password": "$2b$10$yuvDjTilR80034TsxdQDweEGD.VlqlDtNyVV6cOZKcclTT0ecxWOq",
                        "role": "admin",
                        "active_status": 1,
                        "created": "2024-04-14T07:26:32.000Z",
                        "updated": "2024-05-26T15:25:35.000Z"
                    }
                ]
            }
        };

        axios.get.mockResolvedValue(response);

        const result = await viewAccountByFirstName("Lawrence");
        expect(result).toEqual(response.data);
    });

    test('Fetches user data by lastname from the database', async () => {
        const response = {
            data: {
                status: 200,
                data: [
                    {
                        "id": 1,
                        "image": "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/UserImages%2FLorenz.jpg?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/UserImages/Lorenz.jpg?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=YaSbR0kWEOCkF5IpBHSnq%2F7LHjwXRLr8QCJL2CaL4TlWalC6eUCWXe6XfTgvx2o9PphBPqkk%2BuQco3X40ZV6FhrX7l3fopyhT9RcIkyqmnpokH%2BqtNqkFBipjZAlWZfA4Mom5Lvz6iK6N9Xtpkhu5E26EIn19jwfkZTxpn3ISemstHJ4cHu3PiXH4GUMjYmp6Kgw2umthCaOm5OXvIuGiSEai%2FIgSChaD0oeCIRwprMbYWbf0chJlvofZPdwBkwviOBU6cw0y15GWCFfsUrM7CVYwzn6U9yLi8Prw5%2FEo7M4MeV5rQqVNqivAmRj1AlYVS6JrC2SHOrwG9DHQfji1g%3D%3D",
                        "image_filename": "Lorenz.jpg",
                        "firstname": "Lawrence",
                        "lastname": "Gilbert",
                        "email": "GilbertLawrence@gmail.com",
                        "password": "$2b$10$yuvDjTilR80034TsxdQDweEGD.VlqlDtNyVV6cOZKcclTT0ecxWOq",
                        "role": "admin",
                        "active_status": 1,
                        "created": "2024-04-14T07:26:32.000Z",
                        "updated": "2024-05-26T15:25:35.000Z"
                    }
                ]
            }
        };

        axios.get.mockResolvedValue(response);

        const result = await viewAccountByLastName("Gilbert");
        expect(result).toEqual(response.data);
    });

    test('Fetches user data by email from the database', async () => {
        const response = {
            data: {
                status: 200,
                data: [
                    {
                        "id": 1,
                        "image": "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/UserImages%2FLorenz.jpg?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/UserImages/Lorenz.jpg?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=YaSbR0kWEOCkF5IpBHSnq%2F7LHjwXRLr8QCJL2CaL4TlWalC6eUCWXe6XfTgvx2o9PphBPqkk%2BuQco3X40ZV6FhrX7l3fopyhT9RcIkyqmnpokH%2BqtNqkFBipjZAlWZfA4Mom5Lvz6iK6N9Xtpkhu5E26EIn19jwfkZTxpn3ISemstHJ4cHu3PiXH4GUMjYmp6Kgw2umthCaOm5OXvIuGiSEai%2FIgSChaD0oeCIRwprMbYWbf0chJlvofZPdwBkwviOBU6cw0y15GWCFfsUrM7CVYwzn6U9yLi8Prw5%2FEo7M4MeV5rQqVNqivAmRj1AlYVS6JrC2SHOrwG9DHQfji1g%3D%3D",
                        "image_filename": "Lorenz.jpg",
                        "firstname": "Lawrence",
                        "lastname": "Gilbert",
                        "email": "GilbertLawrence@gmail.com",
                        "password": "$2b$10$yuvDjTilR80034TsxdQDweEGD.VlqlDtNyVV6cOZKcclTT0ecxWOq",
                        "role": "admin",
                        "active_status": 1,
                        "created": "2024-04-14T07:26:32.000Z",
                        "updated": "2024-05-26T15:25:35.000Z"
                    }
                ]
            }
        };

        axios.get.mockResolvedValue(response);

        const result = await viewAccountByEmail("GilbertLawrence@gmail.com");
        expect(result).toEqual(response.data);
    });

    test('Handles error when fetching all user data from the database', async () => {
        const errorMessage = 'Network Error';
        axios.get.mockRejectedValue(new Error(errorMessage));

        await expect(viewAllUsers()).rejects.toThrow(errorMessage);
    });

    test('Handles error when fetching user data by role from the database', async () => {
        const errorMessage = 'Network Error';
        axios.get.mockRejectedValue(new Error(errorMessage));

        await expect(viewAllUsersByRole("user")).rejects.toThrow(errorMessage);
    });

    test('Handles error when fetching user data by status from the database', async () => {
        const errorMessage = 'Network Error';
        axios.get.mockRejectedValue(new Error(errorMessage));

        await expect(viewAllUsersByStatus(1)).rejects.toThrow(errorMessage);
    });
});
