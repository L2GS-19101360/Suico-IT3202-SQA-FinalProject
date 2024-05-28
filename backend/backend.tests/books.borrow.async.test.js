const axios = require('axios');

const { viewAllBorrowBooksRequests, approveBorrowBooksRequest, denyBorrowBooksRequest } = require('../backend.async/books.borrow.async')

jest.mock('axios');

describe('Testing Borrow Books API with Jest', () => {
    test('Approving Borrow Book Requests', async () => {
        const data = {
            librarian_id_fk: 41
        }
        
        const response = {
            data: {
                error: false,
                status: 200,
                message: "Book Borrow Request Approved!",
                data: {
                    "fieldCount": 0,
                    "affectedRows": 1,
                    "insertId": 0,
                    "serverStatus": 2,
                    "warningCount": 0,
                    "message": "(Rows matched: 1  Changed: 1  Warnings: 0",
                    "protocol41": true,
                    "changedRows": 1
                }
            }
        };

        axios.put.mockResolvedValue(response);

        const result = await approveBorrowBooksRequest(26, data.librarian_id_fk);
        expect(result).toEqual(response.data);
    });
    test('Denying Borrow Book Request', async () => {
        const data = {
            librarian_id_fk: 41
        }

        const response = {
            data: {
                error: false,
                status: 200,
                message: "Book Borrow Request Denied!",
                data: {
                    "fieldCount": 0,
                    "affectedRows": 1,
                    "insertId": 0,
                    "serverStatus": 2,
                    "warningCount": 0,
                    "message": "(Rows matched: 1  Changed: 1  Warnings: 0",
                    "protocol41": true,
                    "changedRows": 1
                }
            }
        };

        axios.put.mockResolvedValue(response);

        const result = await denyBorrowBooksRequest(27, data.librarian_id_fk);
        expect(result).toEqual(response.data);
    });
    test('View All Borrow Books Requests', async () => {
        const response = {
            data: {
                status: 200,
                data: [
                    {
                        "id": 1,
                        "bookImage": "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/BookImages%2FGoosebumps_NOLTD.jpg?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/BookImages/Goosebumps_NOLTD.jpg?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=JhONNu0odZAmN4sa0LnSmNGjy%2B05J5%2BBdvketG9MeuZXXjAqImz1MG1S98iVfYHDHUzcpsnXdGXKQEafuZ4lOo5KAJhcvtUbSYOfKhrOadr87ZfAkW%2F9ug5T2O6TjsQJZr%2FkiT2iBJuSPLEBkfZUMgqGiN5Ur0YmXSP%2FEA0NCOgkLr%2FjqtIAMx3U1lRGoA%2BJgqoVBSLt1TCZ%2BJip465dQuXca1G769DvWU2FNob35yV0lK1K8V3%2BWtIaDuEGpQ%2BDuRHLFGR5x0snqiJfHaM3rtiAQ5IHh73kyTONUVQsveZPNnmIJYVVzpiDnKQX4LnRbF9%2BugvEogOhnfxKSlPSRQ%3D%3D",
                        "name": "Goosebumps: Night of the Living Dummy",
                        "author": "Robert Lawrence Stine",
                        "genre": "Horror",
                        "userImage": "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/UserImages%2FHomer1.jpg?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/UserImages/Homer1.jpg?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=kS4ZSqjk7CDmB0fMj8byTOkXhugdYA5xZF6N2YOWOzc4dPUiLXe6Sa1zwuqeWMxtZD7GmsSTAjDL%2Bnax83NdsH2QSUEo%2F5nbn8TEQDrVpvN5Oa9zgV5iMkUZT24Jt3EsZMj9rd9Ogl1ZAEa2g%2FtWp0A4MDOl8DVpYsd72Ge7EXe429LysnS5c6o9AOhxcKfSyuib3s3n3dCtGHEhGrTO3VkOXmAzqVTfELqf6f82ogRFnYdBsmZiWGLIJmjWyIthHMyAcJJtqz44oytpGSC2xNupoSllOXONXruMonRXXojI7AMrQKVo3xZSBljYg%2Bzhwy7NDh1mccbfBzmmKc%2BliQ%3D%3D",
                        "firstname": "Homer",
                        "lastname": "Simpson",
                        "email": "HomerSimpson@gmail.com",
                        "borrowed_status": "Borrowed"
                    },
                    {
                        "id": 2,
                        "bookImage": "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/BookImages%2FACII_Brotherhood.jpg?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/BookImages/ACII_Brotherhood.jpg?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=egFZUlWFTj4yP%2BG%2BxgIi41BpzVVF%2FXf1d%2BJs%2BG2rrK4TTFAz50X5ZUjaSoRa8VvabzbJ2goTyoXiCz4aqEXV1SRjYzuCGwzKcQPnAj8Au6rfl9j4sM%2FE3SWJJrf4djJSkcUFEYqWwhJfxFteuptGyMyLKQXVLxHphkwj%2FXSrx88%2Ft2ZTU2hFrAZ%2BHv%2BJRU3YdOuY6bxSUXLf70j80H1bK0X5cq8NXMZgL%2FhnwW9fFzaz1ZEq3%2FiI1X%2B900t9MN3yS0iuzkHLkgKo7zzcI6u%2BkzXZLlGlwLipwiDigdJSVImbFCXd3e1tJsaM0rwgIvwSj2Y%2BGI4MBCBYVoaybmaLNg%3D%3D",
                        "name": "Assassin's Creed: Brotherhood",
                        "author": "Oliver Bowden",
                        "genre": "Historical Fiction",
                        "userImage": "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/UserImages%2FHomer1.jpg?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/UserImages/Homer1.jpg?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=kS4ZSqjk7CDmB0fMj8byTOkXhugdYA5xZF6N2YOWOzc4dPUiLXe6Sa1zwuqeWMxtZD7GmsSTAjDL%2Bnax83NdsH2QSUEo%2F5nbn8TEQDrVpvN5Oa9zgV5iMkUZT24Jt3EsZMj9rd9Ogl1ZAEa2g%2FtWp0A4MDOl8DVpYsd72Ge7EXe429LysnS5c6o9AOhxcKfSyuib3s3n3dCtGHEhGrTO3VkOXmAzqVTfELqf6f82ogRFnYdBsmZiWGLIJmjWyIthHMyAcJJtqz44oytpGSC2xNupoSllOXONXruMonRXXojI7AMrQKVo3xZSBljYg%2Bzhwy7NDh1mccbfBzmmKc%2BliQ%3D%3D",
                        "firstname": "Homer",
                        "lastname": "Simpson",
                        "email": "HomerSimpson@gmail.com",
                        "borrowed_status": "Borrowed"
                    },
                    {
                        "id": 3,
                        "bookImage": "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/BookImages%2FDaVinciCode.jpg?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/BookImages/DaVinciCode.jpg?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=gCtqJYOT9MIMPrlAIiv0Vil2zNZTgPgmSO%2Fv4i%2FX4uYNoD5JR%2BNpw3g0esRcyLRKL%2Fqat0qRRg15Oe3xDbC%2BJwXzJmSCCptqZI%2BC%2FrT8%2Fd6GHkm0PWXZonmGzLJsWJblTMX56v8w0goc6tYj5UMxLuQB7XA83SX1fjlx6dZs0hEo%2FgJJeaXA0JPFxnHruTh4lbafZDxABRuKm5imP5OH2Pl1yvF0d55wstJbNdmZRiTTKsFsE4ygLSNk7IRaXqNBwTcKgbnn9bDcstjDDrwfzm0SfK4jNCPgm4nKsg5FwVt2w5xRNaJ48mJ6XQljNm6STS8r4oiVaWk3uXFse%2FsmGA%3D%3D",
                        "name": "The Da Vinci Code",
                        "author": "Dan Brown",
                        "genre": "Crime and Mystery",
                        "userImage": "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/UserImages%2FTom.jpg?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/UserImages/Tom.jpg?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=xk9r1AdyQ87NM023U%2FPesk7I%2BO%2BNFP9hdPTZgOBfVtJUuuL0YtacNeXdYX0EKBERqulVI%2Fy68dPWfuCshVEafg4RXPW6%2FJieVOVTCruLjHUsMnN3CmcWXdhYuz3e3xhaa8nCBXmaW8HE2ocrgAbbl%2FUpYc2s6QOmGnjf4D6HESvrcl8ZECRUrpvhDDJbSPquwVz%2FfGbYDCOAq7uqdqptEUkIrFpwCbr2PwOyORzlOn84%2F9H8lDpENwmRhHIIAAToXx4YWZUeyALb%2BSwjkkfF1c90XFHPSgNI55mqzT0KeWDqWmllwE9A7G2lJl554OqI2HSnxtZeBQ859shdCaQJag%3D%3D",
                        "firstname": "Tom",
                        "lastname": "Cat",
                        "email": "Tom123@gmail.com",
                        "borrowed_status": "Borrowed"
                    }
                ]
            }
        };

        axios.get.mockResolvedValue(response);

        const result = await viewAllBorrowBooksRequests();
        expect(result).toEqual(response.data);
    });
});