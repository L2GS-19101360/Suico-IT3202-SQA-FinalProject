const axios = require('axios');

const { viewAllReturnBooksRequests, approveReturnBooksRequest, denyReturnBooksRequest } = require('../backend.async/books.return.async')

jest.mock('axios');

describe('Testing Return Books API with Jest', () => {
    test('Approving Return Book Requests', async () => {
        const data = {
            librarian_id_fk: 41
        }

        const response = {
            data: {
                error: false,
                status: 200,
                message: "Book Request Returned!",
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

        const result = await approveReturnBooksRequest(17, data.librarian_id_fk);
        expect(result).toEqual(response.data);
    });
    test('Denying Return Book Requests', async () => {
        const data = {
            librarian_id_fk: 41
        }

        const response = {
            data: {
                error: false,
                status: 200,
                message: "Book Return Request Denied!",
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

        const result = await denyReturnBooksRequest(16, data.librarian_id_fk);
        expect(result).toEqual(response.data);
    });

    test('View All Borrow Books Requests', async () => {
        const response = {
            data: {
                status: 200,
                "data": [
                    {
                        "id": 1,
                        "bookImage": "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/BookImages%2FGoosebumps_ASP.jpg?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/BookImages/Goosebumps_ASP.jpg?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=MBYFHZwYgP5%2BliL5rNOZa9mlQ16vKXX8h2I%2FsrDzTBdmKAgHckfxQLbxkbL7bJYb1TBIQ%2F75NKGYel6sJWj9wIYNpmOxYPLZ6rfgG%2BcSqdxvynVdUx%2BQSdK1Rk9RKCQR2F2B2yOh9Rv%2B%2F1cHuGrGuYVUR9YkmTNRMPl2qSgcJ9Fec5%2F%2Bpzy6yBiKd%2BppodeQSuFAPYJ1ptUAx0YdHRYANuULwIz4B0vnx1zXTc%2Fg7ZFuRlczKsMVfHuLy4HyTglI%2F%2Fn4lmLsBDlCsPwDYu6eBhPl55KczVTmB4UsrW0NNnImZHNx3xHxXjw4VIGmOAweHKdW8QwL%2BRH81xg90dGRFg%3D%3D",
                        "name": "Goosebumps: The Abominable Snowman of Pasadena",
                        "author": "Robert Lawrence Stein",
                        "genre": "Horror",
                        "user_id_fk": 7,
                        "userImage": "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/UserImages%2FPeter.jpg?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/UserImages/Peter.jpg?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=AU1uVn1u0l4iuRHzUJUgudiyrHuKQDBQW7lCehyeBMPy4uZbhTn7ob%2F1hEbU%2Bu1qpjaF1ZzchRs1IMzCIk8fPbt0Zt65yMbGjRIh1ZGNnjbmoKLEjgPZC4pXAppN3kw0bOw7Rby%2FYrGn5EHVT1Xvb2bfPGmP1H9hu5L00Bfzp6tNok%2B4fBJtN3M41c5iJZU%2BILwJdXhksxjvFwaxaCpOBR7gv3zsAwj47E%2BTHtCYdIz265UUtaWrgKF54yoQLppAPLPo8uqzv7X8WPh6L2SIf%2Fa8fJznLmm9FGDWbfIVybRXastOmTIjQ%2FUOEjmF6I2azfD2sqNs9nG4uVPzP%2Fo%2FQA%3D%3D",
                        "firstname": "Peter",
                        "lastname": "Griffin",
                        "email": "Peter123@gmail.com",
                        "borrow_books_request_id_fk": 7,
                        "returned_status": "Returned"
                    },
                    {
                        "id": 2,
                        "bookImage": "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/BookImages%2FKenobi.jpg?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/BookImages/Kenobi.jpg?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=pB8BfCYoVqFcRU80UYpgyO3nWcum4xHZ%2BwCJLwZm8g2rZnYP5KB2sVKbvZHy3CRB0EwZ5%2FvtyIXaeMeSn%2FlBBz5Y8I4auFXNKqYz%2FDJ6e8EMBQDB7PjySZO3mk335HPZBPk9CMoJh%2B%2F5lNh2w2fs1gIZVfLUS%2BgRYZDB8Xi0hA1N8mOIfa7uteuf%2BuKnf4iY3GKQ5KfImt4VKLr3uNxZ6HCo42GGywcpVEXWRZ3gO4hBqhRUd7yMBWxPbexYrcfFByezoUTn5bS7rd0d8qKlgEte51%2Bv5z1vULEa6STnTutkK04lz4nS6Zh9NIkhOctImbZvk5a31dC9Ua6hULBsJg%3D%3D",
                        "name": "Star Wars: Kenobi",
                        "author": "John Jackson Miller",
                        "genre": "Science Fiction",
                        "user_id_fk": 6,
                        "userImage": "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/UserImages%2FHomer1.jpg?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/UserImages/Homer1.jpg?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=kS4ZSqjk7CDmB0fMj8byTOkXhugdYA5xZF6N2YOWOzc4dPUiLXe6Sa1zwuqeWMxtZD7GmsSTAjDL%2Bnax83NdsH2QSUEo%2F5nbn8TEQDrVpvN5Oa9zgV5iMkUZT24Jt3EsZMj9rd9Ogl1ZAEa2g%2FtWp0A4MDOl8DVpYsd72Ge7EXe429LysnS5c6o9AOhxcKfSyuib3s3n3dCtGHEhGrTO3VkOXmAzqVTfELqf6f82ogRFnYdBsmZiWGLIJmjWyIthHMyAcJJtqz44oytpGSC2xNupoSllOXONXruMonRXXojI7AMrQKVo3xZSBljYg%2Bzhwy7NDh1mccbfBzmmKc%2BliQ%3D%3D",
                        "firstname": "Homer",
                        "lastname": "Simpson",
                        "email": "HomerSimpson@gmail.com",
                        "borrow_books_request_id_fk": 11,
                        "returned_status": "Returned"
                    },
                    {
                        "id": 3,
                        "bookImage": "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/BookImages%2FGiftOfFire.jpg?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/BookImages/GiftOfFire.jpg?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=gWRt%2FinbvkCRDarWt8oNtkUVOMs7Etf7272hcSVKk4jwvaMioPzKaiOdm68XQ1sANESo%2F0PhMSWgKtks8G4HtV%2Bsk9DOEmvlSjyHWJa5U%2FJziJYZagO%2BkQ0gMrRasIcdM2oPpupNao8voJ%2Ff6b0oX2Yc6Bx09iWu1csrIQ9I2kXoShmNOl%2FaNFWb0QBAQh3zAdyJz%2BZ6LiUUTGHsZ56mGyv0ppUASqtB9MYBFwnAK2k5MdL5dur%2B3tiNOzMKGRIrVP1dgn3z7LAN869iE41wUZyugXxsfazcduJs%2B1sUFieDULpJ%2BBMcsurz79Lp3BQ2iBaGs2hMRyhXuXngymOI%2Bg%3D%3D",
                        "name": "Gift of Fire",
                        "author": "Sara Baase",
                        "genre": "Education",
                        "user_id_fk": 37,
                        "userImage": "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/UserImages%2FDELETE_page-0002.jpg?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/UserImages/DELETE_page-0002.jpg?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=NThJ9ULT%2FmKUP4RsgppTe9f7P4yHEmWqqcFYeeT6aV8r3%2BA0md3Qh4Ed9%2B0xyLG14009mzWOA2WFzuUvbvz1DI77dhXWRq5SR6Udx4IW%2FJMqJDgOvxj%2FUxgwxv4DxEPDI1hkGr73%2BSQgcVSqb6RUwONJT8rrGjakQd4IKMXLwQzuqaVPMiDDn5GfB26xtR9zRPo24M7M8jP89QSuAbPGdgqRjtMPkdtATx7ZQXowsA3Drit%2Bkc1qR47SuBo1pzDFFmQSnBT%2FLSp9f2CflApFP%2FIS%2BEHPpShFnxpbnt2XYPFqWhw7hmlfdFIcCxFdrcY7C%2FrkN1Z0AbQH%2Fh12JTWcTQ%3D%3D",
                        "firstname": "Eric",
                        "lastname": "Cartman",
                        "email": "EricCartman@gmail.com",
                        "borrow_books_request_id_fk": 12,
                        "returned_status": "Denied"
                    }
                ]
            }
        };

        axios.get.mockResolvedValue(response);

        const result = await viewAllReturnBooksRequests();
        expect(result).toEqual(response.data);
    });
});