const axios = require('axios');
const { createNewBook, viewAllBooks, viewBookByTitle, viewBookByAuthor, viewBookByGenre, updateBook, deleteBook } = require('../backend.async/book.async');

jest.mock('axios');

describe('Testing Book Delete Backend with Jest', () => {
    test('Admin deletes book', async () => {
        const response = {
            data: {
                error: false,
                status: 200,
                message: "Book Delete!"
            }
        };

        axios.delete.mockResolvedValue(response);

        const result = await deleteBook(36);

        expect(result).toEqual(response.data);
    });
});

describe('Testing Book Update Backend with Jest', () => {
    test('Admin updates book with all required information', async () => {
        const data = {
            id: 26,
            image_filename: "TFIII_DarkOfTheMoon.jpg",
            image: "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/BookImages%2FTFIII_DarkOfTheMoon.jpg?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/BookImages/TFIII_DarkOfTheMoon.jpg?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=ihPu%2F%2BraJwteYlrNJDDy%2BYv3pvCGJ5X9T78RQI09BThx11CSP4D%2FzXpOqdx6nGftIlhIbVmpLR5yy87eZwfD4aBFjIWU3Ts22%2F8QIFkBqslaype5lavzjXraO9Z0kwQHdVD1fBtUj%2BxS2oRwCAAqX%2BZVYIRTkvMHhkL%2FoaEUZw7i4N4uJZcxZl2qwfmFTuKEHiHCjIUgwFJ%2BgQx27ax49wExTYoX1frixAfIECHYO7Fz4rzWu31CMmuSkOHfMyglSTUHyS6%2FtQ4d4DCOLqNZofIkA2smZzdR3giwB%2B%2BEFqE5Y42gVLhucoGffH0hazFjBQWY3b8%2FS%2F3YKAvxTlZRhg%3D%3D",
            name: "Transformers: Dark of the Moon",
            author: "Peter David",
            genre: "Science Fiction",
            content_filename: "TFIII_DarkOfTheMoon_Content.pdf",
            content: "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/BookContents%2FTFIII_DarkOfTheMoon_Content.pdf?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/BookContents/TFIII_DarkOfTheMoon_Content.pdf?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=AfMXGIzlYnvuZ4SoGI%2B5YMmjvYxkPFESASRdTeAq6BcGF8k6y6Rg1zm%2BpLp9zwaeGMQH%2Fy%2BOzhXjK6mpUmoIGEpddexhsbNZFIA%2B8i%2B%2BpWB2Bvx3qkg%2Fytx21GiFINLgFJquXEoOjRjneplHseplCHiVR5KAyXNfWnrbeXJM4dSGcqpQNeJ80xZUaU0vcOc4V3PkSuO6D72TLcuspmbatyo1sbTmmT7FSBy2HoLyVFDRLVRtfGTWpb1ZUxSVLjq%2BHyj7VyOcof%2BmOAadmOWQCWEztd0tZoBuGezo1RQrkbkOiSyAJ1NwC660wiO73EjnBaSylt8I6pTXvE8MOEfnQw%3D%3D",
        }

        const response = {
            data: {
                error: false,
                status: 200,
                message: "Book updated successfully",
                data: {
                    id: 26,
                    image_filename: data.image_filename,
                    image: data.image,
                    name: data.name,
                    author: data.author,
                    genre: data.genre,
                    content_filename: data.content_filename,
                    content: data.content,
                    updated: expect.any(String) // assuming the updated field is a timestamp
                }
            }
        };

        axios.put.mockResolvedValue(response);

        const result = await updateBook(data.id, data.image_filename, data.image, data.name, data.author, data.genre, data.content_filename, data.content);

        expect(result).toEqual(response.data);
    });

    test('Admin updates book without all required information', async () => {
        const data = {
            id: 26,
            image_filename: null,
            image: null,
            name: null,
            author: null,
            genre: null,
            content_filename: null,
            content: null,
        }

        const response = {
            data: {
                error: false,
                status: 200,
                message: "Book updated successfully",
                data: {
                    id: 26,
                    image_filename: data.image_filename,
                    image: data.image,
                    name: data.name,
                    author: data.author,
                    genre: data.genre,
                    content_filename: data.content_filename,
                    content: data.content,
                    updated: expect.any(String) // assuming the updated field is a timestamp
                }
            }
        };

        axios.put.mockResolvedValue(response);

        const result = await updateBook(data.id, data.image_filename, data.image, data.name, data.author, data.genre, data.content_filename, data.content);

        expect(result).toEqual(response.data);
    });

    test('Admin updates book without image file', async () => {
        const data = {
            id: 26,
            image_filename: null,
            image: null,
            name: "Transformers: Dark of the Moon",
            author: "Peter David",
            genre: "Science Fiction",
            content_filename: "TFIII_DarkOfTheMoon_Content.pdf",
            content: "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/BookContents%2FTFIII_DarkOfTheMoon_Content.pdf?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/BookContents/TFIII_DarkOfTheMoon_Content.pdf?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=AfMXGIzlYnvuZ4SoGI%2B5YMmjvYxkPFESASRdTeAq6BcGF8k6y6Rg1zm%2BpLp9zwaeGMQH%2Fy%2BOzhXjK6mpUmoIGEpddexhsbNZFIA%2B8i%2B%2BpWB2Bvx3qkg%2Fytx21GiFINLgFJquXEoOjRjneplHseplCHiVR5KAyXNfWnrbeXJM4dSGcqpQNeJ80xZUaU0vcOc4V3PkSuO6D72TLcuspmbatyo1sbTmmT7FSBy2HoLyVFDRLVRtfGTWpb1ZUxSVLjq%2BHyj7VyOcof%2BmOAadmOWQCWEztd0tZoBuGezo1RQrkbkOiSyAJ1NwC660wiO73EjnBaSylt8I6pTXvE8MOEfnQw%3D%3D",
        }

        const response = {
            data: {
                error: true,
                message: "Please provide all required fields"
            }
        };

        axios.put.mockResolvedValue(response);

        const result = await updateBook(data.id, data.image_filename, data.image, data.name, data.author, data.genre, data.content_filename, data.content);

        expect(result).toEqual(response.data);
    });

    test('Admin updates book without book title', async () => {
        const data = {
            id: 26,
            image_filename: "TFIII_DarkOfTheMoon.jpg",
            image: "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/BookImages%2FTFIII_DarkOfTheMoon.jpg?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/BookImages/TFIII_DarkOfTheMoon.jpg?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=ihPu%2F%2BraJwteYlrNJDDy%2BYv3pvCGJ5X9T78RQI09BThx11CSP4D%2FzXpOqdx6nGftIlhIbVmpLR5yy87eZwfD4aBFjIWU3Ts22%2F8QIFkBqslaype5lavzjXraO9Z0kwQHdVD1fBtUj%2BxS2oRwCAAqX%2BZVYIRTkvMHhkL%2FoaEUZw7i4N4uJZcxZl2qwfmFTuKEHiHCjIUgwFJ%2BgQx27ax49wExTYoX1frixAfIECHYO7Fz4rzWu31CMmuSkOHfMyglSTUHyS6%2FtQ4d4DCOLqNZofIkA2smZzdR3giwB%2B%2BEFqE5Y42gVLhucoGffH0hazFjBQWY3b8%2FS%2F3YKAvxTlZRhg%3D%3D",
            name: null,
            author: "Peter David",
            genre: "Science Fiction",
            content_filename: "TFIII_DarkOfTheMoon_Content.pdf",
            content: "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/BookContents%2FTFIII_DarkOfTheMoon_Content.pdf?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/BookContents/TFIII_DarkOfTheMoon_Content.pdf?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=AfMXGIzlYnvuZ4SoGI%2B5YMmjvYxkPFESASRdTeAq6BcGF8k6y6Rg1zm%2BpLp9zwaeGMQH%2Fy%2BOzhXjK6mpUmoIGEpddexhsbNZFIA%2B8i%2B%2BpWB2Bvx3qkg%2Fytx21GiFINLgFJquXEoOjRjneplHseplCHiVR5KAyXNfWnrbeXJM4dSGcqpQNeJ80xZUaU0vcOc4V3PkSuO6D72TLcuspmbatyo1sbTmmT7FSBy2HoLyVFDRLVRtfGTWpb1ZUxSVLjq%2BHyj7VyOcof%2BmOAadmOWQCWEztd0tZoBuGezo1RQrkbkOiSyAJ1NwC660wiO73EjnBaSylt8I6pTXvE8MOEfnQw%3D%3D",
        }

        const response = {
            data: {
                error: true,
                message: "Please provide all required fields"
            }
        };

        axios.put.mockResolvedValue(response);

        const result = await updateBook(data.id, data.image_filename, data.image, data.name, data.author, data.genre, data.content_filename, data.content);

        expect(result).toEqual(response.data);
    });

    test('Admin updates book without book author', async () => {
        const data = {
            id: 26,
            image_filename: "TFIII_DarkOfTheMoon.jpg",
            image: "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/BookImages%2FTFIII_DarkOfTheMoon.jpg?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/BookImages/TFIII_DarkOfTheMoon.jpg?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=ihPu%2F%2BraJwteYlrNJDDy%2BYv3pvCGJ5X9T78RQI09BThx11CSP4D%2FzXpOqdx6nGftIlhIbVmpLR5yy87eZwfD4aBFjIWU3Ts22%2F8QIFkBqslaype5lavzjXraO9Z0kwQHdVD1fBtUj%2BxS2oRwCAAqX%2BZVYIRTkvMHhkL%2FoaEUZw7i4N4uJZcxZl2qwfmFTuKEHiHCjIUgwFJ%2BgQx27ax49wExTYoX1frixAfIECHYO7Fz4rzWu31CMmuSkOHfMyglSTUHyS6%2FtQ4d4DCOLqNZofIkA2smZzdR3giwB%2B%2BEFqE5Y42gVLhucoGffH0hazFjBQWY3b8%2FS%2F3YKAvxTlZRhg%3D%3D",
            name: "Transformers: Dark of the Moon",
            author: null,
            genre: "Science Fiction",
            content_filename: "TFIII_DarkOfTheMoon_Content.pdf",
            content: "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/BookContents%2FTFIII_DarkOfTheMoon_Content.pdf?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/BookContents/TFIII_DarkOfTheMoon_Content.pdf?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=AfMXGIzlYnvuZ4SoGI%2B5YMmjvYxkPFESASRdTeAq6BcGF8k6y6Rg1zm%2BpLp9zwaeGMQH%2Fy%2BOzhXjK6mpUmoIGEpddexhsbNZFIA%2B8i%2B%2BpWB2Bvx3qkg%2Fytx21GiFINLgFJquXEoOjRjneplHseplCHiVR5KAyXNfWnrbeXJM4dSGcqpQNeJ80xZUaU0vcOc4V3PkSuO6D72TLcuspmbatyo1sbTmmT7FSBy2HoLyVFDRLVRtfGTWpb1ZUxSVLjq%2BHyj7VyOcof%2BmOAadmOWQCWEztd0tZoBuGezo1RQrkbkOiSyAJ1NwC660wiO73EjnBaSylt8I6pTXvE8MOEfnQw%3D%3D",
        }

        const response = {
            data: {
                error: true,
                message: "Please provide all required fields"
            }
        };

        axios.put.mockResolvedValue(response);

        const result = await updateBook(data.id, data.image_filename, data.image, data.name, data.author, data.genre, data.content_filename, data.content);

        expect(result).toEqual(response.data);
    });

    test('Admin updates book without book genre', async () => {
        const data = {
            id: 26,
            image_filename: "TFIII_DarkOfTheMoon.jpg",
            image: "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/BookImages%2FTFIII_DarkOfTheMoon.jpg?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/BookImages/TFIII_DarkOfTheMoon.jpg?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=ihPu%2F%2BraJwteYlrNJDDy%2BYv3pvCGJ5X9T78RQI09BThx11CSP4D%2FzXpOqdx6nGftIlhIbVmpLR5yy87eZwfD4aBFjIWU3Ts22%2F8QIFkBqslaype5lavzjXraO9Z0kwQHdVD1fBtUj%2BxS2oRwCAAqX%2BZVYIRTkvMHhkL%2FoaEUZw7i4N4uJZcxZl2qwfmFTuKEHiHCjIUgwFJ%2BgQx27ax49wExTYoX1frixAfIECHYO7Fz4rzWu31CMmuSkOHfMyglSTUHyS6%2FtQ4d4DCOLqNZofIkA2smZzdR3giwB%2B%2BEFqE5Y42gVLhucoGffH0hazFjBQWY3b8%2FS%2F3YKAvxTlZRhg%3D%3D",
            name: "Transformers: Dark of the Moon",
            author: "Peter David",
            genre: null,
            content_filename: "TFIII_DarkOfTheMoon_Content.pdf",
            content: "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/BookContents%2FTFIII_DarkOfTheMoon_Content.pdf?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/BookContents/TFIII_DarkOfTheMoon_Content.pdf?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=AfMXGIzlYnvuZ4SoGI%2B5YMmjvYxkPFESASRdTeAq6BcGF8k6y6Rg1zm%2BpLp9zwaeGMQH%2Fy%2BOzhXjK6mpUmoIGEpddexhsbNZFIA%2B8i%2B%2BpWB2Bvx3qkg%2Fytx21GiFINLgFJquXEoOjRjneplHseplCHiVR5KAyXNfWnrbeXJM4dSGcqpQNeJ80xZUaU0vcOc4V3PkSuO6D72TLcuspmbatyo1sbTmmT7FSBy2HoLyVFDRLVRtfGTWpb1ZUxSVLjq%2BHyj7VyOcof%2BmOAadmOWQCWEztd0tZoBuGezo1RQrkbkOiSyAJ1NwC660wiO73EjnBaSylt8I6pTXvE8MOEfnQw%3D%3D",
        }

        const response = {
            data: {
                error: true,
                message: "Please provide all required fields"
            }
        };

        axios.put.mockResolvedValue(response);

        const result = await updateBook(data.id, data.image_filename, data.image, data.name, data.author, data.genre, data.content_filename, data.content);

        expect(result).toEqual(response.data);
    });

    test('Admin updates book without content file', async () => {
        const data = {
            id: 26,
            image_filename: "TFIII_DarkOfTheMoon.jpg",
            image: "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/BookImages%2FTFIII_DarkOfTheMoon.jpg?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/BookImages/TFIII_DarkOfTheMoon.jpg?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=ihPu%2F%2BraJwteYlrNJDDy%2BYv3pvCGJ5X9T78RQI09BThx11CSP4D%2FzXpOqdx6nGftIlhIbVmpLR5yy87eZwfD4aBFjIWU3Ts22%2F8QIFkBqslaype5lavzjXraO9Z0kwQHdVD1fBtUj%2BxS2oRwCAAqX%2BZVYIRTkvMHhkL%2FoaEUZw7i4N4uJZcxZl2qwfmFTuKEHiHCjIUgwFJ%2BgQx27ax49wExTYoX1frixAfIECHYO7Fz4rzWu31CMmuSkOHfMyglSTUHyS6%2FtQ4d4DCOLqNZofIkA2smZzdR3giwB%2B%2BEFqE5Y42gVLhucoGffH0hazFjBQWY3b8%2FS%2F3YKAvxTlZRhg%3D%3D",
            name: "Transformers: Dark of the Moon",
            author: "Peter David",
            genre: "Science Fiction",
            content_filename: null,
            content: null,
        }

        const response = {
            data: {
                error: true,
                message: "Please provide all required fields"
            }
        };

        axios.put.mockResolvedValue(response);

        const result = await updateBook(data.id, data.image_filename, data.image, data.name, data.author, data.genre, data.content_filename, data.content);

        expect(result).toEqual(response.data);
    });
});

describe('Testing Book Read Backend with Jest', () => {
    test('Fetches all book data from database', async () => {
        const response = {
            data: {
                status: 200,
                data: [
                    {
                        "id": 18,
                        "image_filename": "ACI_SecretCrusade.jpg",
                        "image": "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/BookImages%2FACI_SecretCrusade.jpg?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/BookImages/ACI_SecretCrusade.jpg?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=H8nyYIHEmxiZv63Koz8xbhupB4z1ffF%2BCEBhbcwO%2F6NXZiPfgZjCYjFgnI2HhjI5m5QGuXgjllyjAHFscIwfLjP2J2IThcV2WQsAD1UN5NLIcxe1qdowgiDJMqfOlWXhxR%2FmR9%2BMVmZSH5PKPzagC2HrkDSsOgnTMVMoXN0WQItLAhEs1oQ5%2FKDdgTdiM21sNOF%2Bsf1LtB5H%2F8tqV5IEyAKHF0MZSxxFgCdtMRiWhXcOThvprIQQLTGv20XB%2FM0kW4mNfp8YKra0m3x94L2IrvM%2BKmrgBa6aIRRFLiw2OLO%2BQN%2Ft3T1vx1aN0FfZ9icDzLexqHgI2EclBmg1UFK6aw%3D%3D",
                        "name": "Assassin's Creed: The Secret Crusade",
                        "author": "Oliver Bowden",
                        "genre": "Historical Fiction",
                        "content_filename": "ACI_SecretCrusade_Content.pdf",
                        "content": "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/BookContents%2FACI_SecretCrusade_Content.pdf?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/BookContents/ACI_SecretCrusade_Content.pdf?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=tnhAL%2B6%2BUwZJDJvtUU6mf763ZJ9YCBmsrByOoG7Sy%2Bd1rN7c%2Bdc61ztmtaKYrxoa7mSepky6JcwxNF8c2vRq0FwLyOos0xCRQR17gBAsSUsBbJZhGnIgSjdpMaLOxXJ4cTb9vys1sJ%2BwweH8aF%2FTyIw%2FGVRPWAnSC7jKqBU6FgkiR271FhU%2BXsCkqFQz6O5h6FJmjUMGz7FBABFOacadvTkdw4aUhgBmco1Arzo3suwWP4v579uNUJcvThfuyOYNciL5fXQXohNy%2F7j7RxM1fCDNHIpQGuc6z54L2I%2BnECy5Fl9kihedbrDcFO3ct6PVkWyXDLvHhsQTvpcpeIBgGg%3D%3D",
                        "created": "2024-05-18T05:18:15.000Z",
                        "updated": null
                    },
                    {
                        "id": 19,
                        "image_filename": "AngelDemons.jpg",
                        "image": "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/BookImages%2FAngelDemons.jpg?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/BookImages/AngelDemons.jpg?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=VlnfYcbwbKIvjiqtWLs%2FdC%2FxbuL%2Bkjx9LaMkIt4NIJdVXk2KZr5dNZc786aUKt1NbXPN42eKG%2FI4UgV5GyzyOjxDKRmEKCBDm5TyUn1E%2ByfRnTBiG4hTPQlbGxUGADk1Y5qnhzago0gPIJ%2FrXLN0PK%2FeQgfS78PiohFH0UG%2B%2BQaayC2JF0ZNtcDBn%2Feikte7uJUrob85g5htniGX8FNVb8oEmxssSOOzLSFR%2Fm7faz%2FnMogp9PpPXJL0WgeQH2MuEVWVROQkjoxi4YuGeN2QYD98qEk2eQsXQ%2BwTLwpQhD0%2F6mNk1Q8%2F%2Fhj8Bp5rBcCWr8jVcjHP71z0D4MAN7bfVQ%3D%3D",
                        "name": "Angels and Demons",
                        "author": "Dan Brown",
                        "genre": "Crime and Mystery",
                        "content_filename": "AngelDemons_Content.pdf",
                        "content": "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/BookContents%2FAngelDemons_Content.pdf?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/BookContents/AngelDemons_Content.pdf?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=3jz0Tj1ogDuT5lLbCTqkvdau%2FbMhvdHDsCO788nZIjzELchEUcoPA0Ee%2FcpcCMq1CpFr5TCXzF1sGbcIusrhQMTn21e7h83dxLdgYuk%2FZTpiYPui7RTdbY65eT6qxZaiTsGFe5smawy54p%2BGZyzCJZlVRi7zMBd6tU9DP1%2BWxK0iKBW9V4p7%2FF6UbNUkduLUFq0Py%2ByfkABwmSs7uaoZ0AKOHC%2FODjavmtlA1FcPy%2FtZf4QqReABTYrWDhSUkyq8qMjVGEWgEb3EUL1BAAu8RvtqkA2Zsb068apQc7H%2BTqQjzsmx5zqJliSuhTMusA9GPJnmrTp2BJKDSonPepCALw%3D%3D",
                        "created": "2024-05-18T05:18:56.000Z",
                        "updated": null
                    },
                    {
                        "id": 20,
                        "image_filename": "Goosebumps_NOLTD.jpg",
                        "image": "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/BookImages%2FGoosebumps_NOLTD.jpg?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/BookImages/Goosebumps_NOLTD.jpg?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=JhONNu0odZAmN4sa0LnSmNGjy%2B05J5%2BBdvketG9MeuZXXjAqImz1MG1S98iVfYHDHUzcpsnXdGXKQEafuZ4lOo5KAJhcvtUbSYOfKhrOadr87ZfAkW%2F9ug5T2O6TjsQJZr%2FkiT2iBJuSPLEBkfZUMgqGiN5Ur0YmXSP%2FEA0NCOgkLr%2FjqtIAMx3U1lRGoA%2BJgqoVBSLt1TCZ%2BJip465dQuXca1G769DvWU2FNob35yV0lK1K8V3%2BWtIaDuEGpQ%2BDuRHLFGR5x0snqiJfHaM3rtiAQ5IHh73kyTONUVQsveZPNnmIJYVVzpiDnKQX4LnRbF9%2BugvEogOhnfxKSlPSRQ%3D%3D",
                        "name": "Goosebumps: Night of the Living Dummy",
                        "author": "Robert Lawrence Stine",
                        "genre": "Horror",
                        "content_filename": "Goosebumps_NOLTD_Content.pdf",
                        "content": "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/BookContents%2FGoosebumps_NOLTD_Content.pdf?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/BookContents/Goosebumps_NOLTD_Content.pdf?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=0ga%2BhVk2lJC0naaiQDNeRnW72P8piN0xWKnEAYoTGEIOp2M0sEAcP%2BOCOpnNYmsNT0qSwLXw%2FIh%2Bef43d%2FKBIHBfRNAKJnachZtKKr9BP%2F5IdAOftrLMx%2B0EqtI5NfjrRW%2FkNxsWEHS9KQ%2Bx3REUQ17vOFpHZHedmtxeP1r88vW%2FZt6rD3dCtlVeSr5UEBMPGmbNjhdbVbn1%2B7h5xy7GQOMuQeNFsEUVg01pXX5xlRUH00YOw%2FyCip82ElFW2QdnfJGeGvtdaH9NZKLxaNV0djeWON8inAuDlcL8XKSgXA4Y3kHYelODzCPfcZgG2079AapiDQ8Jd7sPYyOHAHUqJA%3D%3D",
                        "created": "2024-05-18T05:20:18.000Z",
                        "updated": null
                    }
                ]
            }
        };

        axios.get.mockResolvedValue(response);

        const result = await viewAllBooks();
        expect(result).toEqual(response.data);
    });

    test('Fetches book data by title from database', async () => {
        const response = {
            data: {
                status: 200,
                data: [
                    {
                        id: 26,
                        image_filename: "Kenobi.jpg",
                        image: "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/BookImages%2FKenobi.jpg?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/BookImages/Kenobi.jpg?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=pB8BfCYoVqFcRU80UYpgyO3nWcum4xHZ%2BwCJLwZm8g2rZnYP5KB2sVKbvZHy3CRB0EwZ5%2FvtyIXaeMeSn%2FlBBz5Y8I4auFXNKqYz%2FDJ6e8EMBQDB7PjySZO3mk335HPZBPk9CMoJh%2B%2F5lNh2w2fs1gIZVfLUS%2BgRYZDB8Xi0hA1N8mOIfa7uteuf%2BuKnf4iY3GKQ5KfImt4VKLr3uNxZ6HCo42GGywcpVEXWRZ3gO4hBqhRUd7yMBWxPbexYrcfFByezoUTn5bS7rd0d8qKlgEte51%2Bv5z1vULEa6STnTutkK04lz4nS6Zh9NIkhOctImbZvk5a31dC9Ua6hULBsJg%3D%3D",
                        name: "Star Wars: Kenobi",
                        author: "John Jackson Miller",
                        genre: "Science Fiction",
                        content_filename: "Kenobi_Content.pdf",
                        content: "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/BookContents%2FKenobi_Content.pdf?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/BookContents/Kenobi_Content.pdf?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=Jhr84XDWfcsX614%2BkK4PvviuJ8zuowHspq%2Ft2UWz06w0px9jgJBfYNE5zbXXdWMM38pB8zEzEp6Bc5Jn94DUx%2FYdhF2ipz0FZRAVFD%2Fjbh9MMGYtTp7jUmjB3ty0mh3EeIGtM%2BKDrzg6giPR5jaSHKDIlYfp3ENS1tUFVxtDFPWFCgXKOTjyE6OtZ%2BOUJnyNrtl7oLVsUBZM9QxVy1JbyBffMlrd9DW99%2FVabWDge10EAAbAxtd8Nbuda3EcPGQ4dMsbKXZ860PLMVbudTHNuDwIlGOLXr3SRZN%2FFL2Ze%2FtueIu9IiPtSpsfrEkdQUXws6SfoautufD9Fjb62IouzQ%3D%3D",
                        created: "2024-05-18T05:28:48.000Z",
                        updated: null
                    }
                ]
            }
        };

        axios.get.mockResolvedValue(response);

        const result = await viewBookByTitle("Star Wars: Kenobi");
        expect(result).toEqual(response.data);
    });

    test('Fetches book data by author from database', async () => {
        const response = {
            data: {
                status: 200,
                data: [
                    {
                        id: 26,
                        image_filename: "Kenobi.jpg",
                        image: "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/BookImages%2FKenobi.jpg?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/BookImages/Kenobi.jpg?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=pB8BfCYoVqFcRU80UYpgyO3nWcum4xHZ%2BwCJLwZm8g2rZnYP5KB2sVKbvZHy3CRB0EwZ5%2FvtyIXaeMeSn%2FlBBz5Y8I4auFXNKqYz%2FDJ6e8EMBQDB7PjySZO3mk335HPZBPk9CMoJh%2B%2F5lNh2w2fs1gIZVfLUS%2BgRYZDB8Xi0hA1N8mOIfa7uteuf%2BuKnf4iY3GKQ5KfImt4VKLr3uNxZ6HCo42GGywcpVEXWRZ3gO4hBqhRUd7yMBWxPbexYrcfFByezoUTn5bS7rd0d8qKlgEte51%2Bv5z1vULEa6STnTutkK04lz4nS6Zh9NIkhOctImbZvk5a31dC9Ua6hULBsJg%3D%3D",
                        name: "Star Wars: Kenobi",
                        author: "John Jackson Miller",
                        genre: "Science Fiction",
                        content_filename: "Kenobi_Content.pdf",
                        content: "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/BookContents%2FKenobi_Content.pdf?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/BookContents/Kenobi_Content.pdf?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=Jhr84XDWfcsX614%2BkK4PvviuJ8zuowHspq%2Ft2UWz06w0px9jgJBfYNE5zbXXdWMM38pB8zEzEp6Bc5Jn94DUx%2FYdhF2ipz0FZRAVFD%2Fjbh9MMGYtTp7jUmjB3ty0mh3EeIGtM%2BKDrzg6giPR5jaSHKDIlYfp3ENS1tUFVxtDFPWFCgXKOTjyE6OtZ%2BOUJnyNrtl7oLVsUBZM9QxVy1JbyBffMlrd9DW99%2FVabWDge10EAAbAxtd8Nbuda3EcPGQ4dMsbKXZ860PLMVbudTHNuDwIlGOLXr3SRZN%2FFL2Ze%2FtueIu9IiPtSpsfrEkdQUXws6SfoautufD9Fjb62IouzQ%3D%3D",
                        created: "2024-05-18T05:28:48.000Z",
                        updated: null
                    }
                ]
            }
        };

        axios.get.mockResolvedValue(response);

        const result = await viewBookByAuthor("John Jackson Miller");
        expect(result).toEqual(response.data);
    });

    test('Fetches book data by genre from database', async () => {
        const response = {
            data: {
                status: 200,
                data: [
                    {
                        "id": 24,
                        "image_filename": "TFIII_DarkOfTheMoon.jpg",
                        "image": "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/BookImages%2FTFIII_DarkOfTheMoon.jpg?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/BookImages/TFIII_DarkOfTheMoon.jpg?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=ihPu%2F%2BraJwteYlrNJDDy%2BYv3pvCGJ5X9T78RQI09BThx11CSP4D%2FzXpOqdx6nGftIlhIbVmpLR5yy87eZwfD4aBFjIWU3Ts22%2F8QIFkBqslaype5lavzjXraO9Z0kwQHdVD1fBtUj%2BxS2oRwCAAqX%2BZVYIRTkvMHhkL%2FoaEUZw7i4N4uJZcxZl2qwfmFTuKEHiHCjIUgwFJ%2BgQx27ax49wExTYoX1frixAfIECHYO7Fz4rzWu31CMmuSkOHfMyglSTUHyS6%2FtQ4d4DCOLqNZofIkA2smZzdR3giwB%2B%2BEFqE5Y42gVLhucoGffH0hazFjBQWY3b8%2FS%2F3YKAvxTlZRhg%3D%3D",
                        "name": "Transformers: Dark of the Moon",
                        "author": "Peter David",
                        "genre": "Science Fiction",
                        "content_filename": "TFIII_DarkOfTheMoon_Content.pdf",
                        "content": "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/BookContents%2FTFIII_DarkOfTheMoon_Content.pdf?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/BookContents/TFIII_DarkOfTheMoon_Content.pdf?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=AfMXGIzlYnvuZ4SoGI%2B5YMmjvYxkPFESASRdTeAq6BcGF8k6y6Rg1zm%2BpLp9zwaeGMQH%2Fy%2BOzhXjK6mpUmoIGEpddexhsbNZFIA%2B8i%2B%2BpWB2Bvx3qkg%2Fytx21GiFINLgFJquXEoOjRjneplHseplCHiVR5KAyXNfWnrbeXJM4dSGcqpQNeJ80xZUaU0vcOc4V3PkSuO6D72TLcuspmbatyo1sbTmmT7FSBy2HoLyVFDRLVRtfGTWpb1ZUxSVLjq%2BHyj7VyOcof%2BmOAadmOWQCWEztd0tZoBuGezo1RQrkbkOiSyAJ1NwC660wiO73EjnBaSylt8I6pTXvE8MOEfnQw%3D%3D",
                        "created": "2024-05-18T05:26:19.000Z",
                        "updated": null
                    },
                    {
                        "id": 26,
                        "image_filename": "Kenobi.jpg",
                        "image": "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/BookImages%2FKenobi.jpg?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/BookImages/Kenobi.jpg?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=pB8BfCYoVqFcRU80UYpgyO3nWcum4xHZ%2BwCJLwZm8g2rZnYP5KB2sVKbvZHy3CRB0EwZ5%2FvtyIXaeMeSn%2FlBBz5Y8I4auFXNKqYz%2FDJ6e8EMBQDB7PjySZO3mk335HPZBPk9CMoJh%2B%2F5lNh2w2fs1gIZVfLUS%2BgRYZDB8Xi0hA1N8mOIfa7uteuf%2BuKnf4iY3GKQ5KfImt4VKLr3uNxZ6HCo42GGywcpVEXWRZ3gO4hBqhRUd7yMBWxPbexYrcfFByezoUTn5bS7rd0d8qKlgEte51%2Bv5z1vULEa6STnTutkK04lz4nS6Zh9NIkhOctImbZvk5a31dC9Ua6hULBsJg%3D%3D",
                        "name": "Star Wars: Kenobi",
                        "author": "John Jackson Miller",
                        "genre": "Science Fiction",
                        "content_filename": "Kenobi_Content.pdf",
                        "content": "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/BookContents%2FKenobi_Content.pdf?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/BookContents/Kenobi_Content.pdf?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=Jhr84XDWfcsX614%2BkK4PvviuJ8zuowHspq%2Ft2UWz06w0px9jgJBfYNE5zbXXdWMM38pB8zEzEp6Bc5Jn94DUx%2FYdhF2ipz0FZRAVFD%2Fjbh9MMGYtTp7jUmjB3ty0mh3EeIGtM%2BKDrzg6giPR5jaSHKDIlYfp3ENS1tUFVxtDFPWFCgXKOTjyE6OtZ%2BOUJnyNrtl7oLVsUBZM9QxVy1JbyBffMlrd9DW99%2FVabWDge10EAAbAxtd8Nbuda3EcPGQ4dMsbKXZ860PLMVbudTHNuDwIlGOLXr3SRZN%2FFL2Ze%2FtueIu9IiPtSpsfrEkdQUXws6SfoautufD9Fjb62IouzQ%3D%3D",
                        "created": "2024-05-18T05:28:48.000Z",
                        "updated": null
                    }
                ]
            }
        };

        axios.get.mockResolvedValue(response);

        const result = await viewBookByGenre("Science Fiction");
        expect(result).toEqual(response.data);
    });
});

describe('Testing Book Create Backend with Jest', () => {
    test('Admin creates new book with all required information', async () => {
        const data = {
            image_filename: "TFIII_DarkOfTheMoon.jpg",
            image: "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/BookImages%2FTFIII_DarkOfTheMoon.jpg?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/BookImages/TFIII_DarkOfTheMoon.jpg?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=ihPu%2F%2BraJwteYlrNJDDy%2BYv3pvCGJ5X9T78RQI09BThx11CSP4D%2FzXpOqdx6nGftIlhIbVmpLR5yy87eZwfD4aBFjIWU3Ts22%2F8QIFkBqslaype5lavzjXraO9Z0kwQHdVD1fBtUj%2BxS2oRwCAAqX%2BZVYIRTkvMHhkL%2FoaEUZw7i4N4uJZcxZl2qwfmFTuKEHiHCjIUgwFJ%2BgQx27ax49wExTYoX1frixAfIECHYO7Fz4rzWu31CMmuSkOHfMyglSTUHyS6%2FtQ4d4DCOLqNZofIkA2smZzdR3giwB%2B%2BEFqE5Y42gVLhucoGffH0hazFjBQWY3b8%2FS%2F3YKAvxTlZRhg%3D%3D",
            name: "Transformers: Dark of the Moon",
            author: "Peter David",
            genre: "Science Fiction",
            content_filename: "TFIII_DarkOfTheMoon_Content.pdf",
            content: "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/BookContents%2FTFIII_DarkOfTheMoon_Content.pdf?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/BookContents/TFIII_DarkOfTheMoon_Content.pdf?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=AfMXGIzlYnvuZ4SoGI%2B5YMmjvYxkPFESASRdTeAq6BcGF8k6y6Rg1zm%2BpLp9zwaeGMQH%2Fy%2BOzhXjK6mpUmoIGEpddexhsbNZFIA%2B8i%2B%2BpWB2Bvx3qkg%2Fytx21GiFINLgFJquXEoOjRjneplHseplCHiVR5KAyXNfWnrbeXJM4dSGcqpQNeJ80xZUaU0vcOc4V3PkSuO6D72TLcuspmbatyo1sbTmmT7FSBy2HoLyVFDRLVRtfGTWpb1ZUxSVLjq%2BHyj7VyOcof%2BmOAadmOWQCWEztd0tZoBuGezo1RQrkbkOiSyAJ1NwC660wiO73EjnBaSylt8I6pTXvE8MOEfnQw%3D%3D",
        }

        const response = {
            data: {
                error: false,
                status: 200,
                message: "Book Created!",
                data: 24
            }
        };

        axios.post.mockResolvedValue(response);

        const result = await createNewBook(data.image_filename, data.image, data.name, data.author, data.genre, data.content_filename, data.content);

        expect(result).toEqual(response.data);
    });

    test('Admin creates new book without all required information', async () => {
        const data = {
            image_filename: null,
            image: null,
            name: null,
            author: null,
            genre: null,
            content_filename: null,
            content: null,
        }

        const response = {
            data: {
                error: false,
                status: 200,
                message: "Book Created!",
                data: 24
            }
        };

        axios.post.mockResolvedValue(response);

        const result = await createNewBook(data.image_filename, data.image, data.name, data.author, data.genre, data.content_filename, data.content);

        expect(result).toEqual(response.data);
    });

    test('Admin creates new book without image file', async () => {
        const data = {
            image_filename: null,
            image: null,
            name: "Transformers: Dark of the Moon",
            author: "Peter David",
            genre: "Science Fiction",
            content_filename: "TFIII_DarkOfTheMoon_Content.pdf",
            content: "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/BookContents%2FTFIII_DarkOfTheMoon_Content.pdf?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/BookContents/TFIII_DarkOfTheMoon_Content.pdf?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=AfMXGIzlYnvuZ4SoGI%2B5YMmjvYxkPFESASRdTeAq6BcGF8k6y6Rg1zm%2BpLp9zwaeGMQH%2Fy%2BOzhXjK6mpUmoIGEpddexhsbNZFIA%2B8i%2B%2BpWB2Bvx3qkg%2Fytx21GiFINLgFJquXEoOjRjneplHseplCHiVR5KAyXNfWnrbeXJM4dSGcqpQNeJ80xZUaU0vcOc4V3PkSuO6D72TLcuspmbatyo1sbTmmT7FSBy2HoLyVFDRLVRtfGTWpb1ZUxSVLjq%2BHyj7VyOcof%2BmOAadmOWQCWEztd0tZoBuGezo1RQrkbkOiSyAJ1NwC660wiO73EjnBaSylt8I6pTXvE8MOEfnQw%3D%3D",
        }

        const response = {
            data: {
                error: true,
                message: "Please Provide All Required Fields"
            }
        };

        axios.post.mockResolvedValue(response);

        const result = await createNewBook(data.image_filename, data.image, data.name, data.author, data.genre, data.content_filename, data.content);

        expect(result).toEqual(response.data);
    });

    test('Admin creates new book without book name', async () => {
        const data = {
            image_filename: "TFIII_DarkOfTheMoon.jpg",
            image: "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/BookImages%2FTFIII_DarkOfTheMoon.jpg?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/BookImages/TFIII_DarkOfTheMoon.jpg?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=ihPu%2F%2BraJwteYlrNJDDy%2BYv3pvCGJ5X9T78RQI09BThx11CSP4D%2FzXpOqdx6nGftIlhIbVmpLR5yy87eZwfD4aBFjIWU3Ts22%2F8QIFkBqslaype5lavzjXraO9Z0kwQHdVD1fBtUj%2BxS2oRwCAAqX%2BZVYIRTkvMHhkL%2FoaEUZw7i4N4uJZcxZl2qwfmFTuKEHiHCjIUgwFJ%2BgQx27ax49wExTYoX1frixAfIECHYO7Fz4rzWu31CMmuSkOHfMyglSTUHyS6%2FtQ4d4DCOLqNZofIkA2smZzdR3giwB%2B%2BEFqE5Y42gVLhucoGffH0hazFjBQWY3b8%2FS%2F3YKAvxTlZRhg%3D%3D",
            name: null,
            author: "Peter David",
            genre: "Science Fiction",
            content_filename: "TFIII_DarkOfTheMoon_Content.pdf",
            content: "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/BookContents%2FTFIII_DarkOfTheMoon_Content.pdf?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/BookContents/TFIII_DarkOfTheMoon_Content.pdf?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=AfMXGIzlYnvuZ4SoGI%2B5YMmjvYxkPFESASRdTeAq6BcGF8k6y6Rg1zm%2BpLp9zwaeGMQH%2Fy%2BOzhXjK6mpUmoIGEpddexhsbNZFIA%2B8i%2B%2BpWB2Bvx3qkg%2Fytx21GiFINLgFJquXEoOjRjneplHseplCHiVR5KAyXNfWnrbeXJM4dSGcqpQNeJ80xZUaU0vcOc4V3PkSuO6D72TLcuspmbatyo1sbTmmT7FSBy2HoLyVFDRLVRtfGTWpb1ZUxSVLjq%2BHyj7VyOcof%2BmOAadmOWQCWEztd0tZoBuGezo1RQrkbkOiSyAJ1NwC660wiO73EjnBaSylt8I6pTXvE8MOEfnQw%3D%3D",
        }

        const response = {
            data: {
                error: true,
                message: "Please Provide All Required Fields"
            }
        };

        axios.post.mockResolvedValue(response);

        const result = await createNewBook(data.image_filename, data.image, data.name, data.author, data.genre, data.content_filename, data.content);

        expect(result).toEqual(response.data);
    });

    test('Admin creates new book without book author', async () => {
        const data = {
            image_filename: "TFIII_DarkOfTheMoon.jpg",
            image: "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/BookImages%2FTFIII_DarkOfTheMoon.jpg?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/BookImages/TFIII_DarkOfTheMoon.jpg?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=ihPu%2F%2BraJwteYlrNJDDy%2BYv3pvCGJ5X9T78RQI09BThx11CSP4D%2FzXpOqdx6nGftIlhIbVmpLR5yy87eZwfD4aBFjIWU3Ts22%2F8QIFkBqslaype5lavzjXraO9Z0kwQHdVD1fBtUj%2BxS2oRwCAAqX%2BZVYIRTkvMHhkL%2FoaEUZw7i4N4uJZcxZl2qwfmFTuKEHiHCjIUgwFJ%2BgQx27ax49wExTYoX1frixAfIECHYO7Fz4rzWu31CMmuSkOHfMyglSTUHyS6%2FtQ4d4DCOLqNZofIkA2smZzdR3giwB%2B%2BEFqE5Y42gVLhucoGffH0hazFjBQWY3b8%2FS%2F3YKAvxTlZRhg%3D%3D",
            name: "Transformers: Dark of the Moon",
            author: null,
            genre: "Science Fiction",
            content_filename: "TFIII_DarkOfTheMoon_Content.pdf",
            content: "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/BookContents%2FTFIII_DarkOfTheMoon_Content.pdf?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/BookContents/TFIII_DarkOfTheMoon_Content.pdf?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=AfMXGIzlYnvuZ4SoGI%2B5YMmjvYxkPFESASRdTeAq6BcGF8k6y6Rg1zm%2BpLp9zwaeGMQH%2Fy%2BOzhXjK6mpUmoIGEpddexhsbNZFIA%2B8i%2B%2BpWB2Bvx3qkg%2Fytx21GiFINLgFJquXEoOjRjneplHseplCHiVR5KAyXNfWnrbeXJM4dSGcqpQNeJ80xZUaU0vcOc4V3PkSuO6D72TLcuspmbatyo1sbTmmT7FSBy2HoLyVFDRLVRtfGTWpb1ZUxSVLjq%2BHyj7VyOcof%2BmOAadmOWQCWEztd0tZoBuGezo1RQrkbkOiSyAJ1NwC660wiO73EjnBaSylt8I6pTXvE8MOEfnQw%3D%3D",
        }

        const response = {
            data: {
                error: true,
                message: "Please Provide All Required Fields"
            }
        };

        axios.post.mockResolvedValue(response);

        const result = await createNewBook(data.image_filename, data.image, data.name, data.author, data.genre, data.content_filename, data.content);

        expect(result).toEqual(response.data);
    });

    test('Admin creates new book without book genre', async () => {
        const data = {
            image_filename: "TFIII_DarkOfTheMoon.jpg",
            image: "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/BookImages%2FTFIII_DarkOfTheMoon.jpg?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/BookImages/TFIII_DarkOfTheMoon.jpg?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=ihPu%2F%2BraJwteYlrNJDDy%2BYv3pvCGJ5X9T78RQI09BThx11CSP4D%2FzXpOqdx6nGftIlhIbVmpLR5yy87eZwfD4aBFjIWU3Ts22%2F8QIFkBqslaype5lavzjXraO9Z0kwQHdVD1fBtUj%2BxS2oRwCAAqX%2BZVYIRTkvMHhkL%2FoaEUZw7i4N4uJZcxZl2qwfmFTuKEHiHCjIUgwFJ%2BgQx27ax49wExTYoX1frixAfIECHYO7Fz4rzWu31CMmuSkOHfMyglSTUHyS6%2FtQ4d4DCOLqNZofIkA2smZzdR3giwB%2B%2BEFqE5Y42gVLhucoGffH0hazFjBQWY3b8%2FS%2F3YKAvxTlZRhg%3D%3D",
            name: "Transformers: Dark of the Moon",
            author: "Peter David",
            genre: null,
            content_filename: "TFIII_DarkOfTheMoon_Content.pdf",
            content: "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/BookContents%2FTFIII_DarkOfTheMoon_Content.pdf?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/BookContents/TFIII_DarkOfTheMoon_Content.pdf?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=AfMXGIzlYnvuZ4SoGI%2B5YMmjvYxkPFESASRdTeAq6BcGF8k6y6Rg1zm%2BpLp9zwaeGMQH%2Fy%2BOzhXjK6mpUmoIGEpddexhsbNZFIA%2B8i%2B%2BpWB2Bvx3qkg%2Fytx21GiFINLgFJquXEoOjRjneplHseplCHiVR5KAyXNfWnrbeXJM4dSGcqpQNeJ80xZUaU0vcOc4V3PkSuO6D72TLcuspmbatyo1sbTmmT7FSBy2HoLyVFDRLVRtfGTWpb1ZUxSVLjq%2BHyj7VyOcof%2BmOAadmOWQCWEztd0tZoBuGezo1RQrkbkOiSyAJ1NwC660wiO73EjnBaSylt8I6pTXvE8MOEfnQw%3D%3D",
        }

        const response = {
            data: {
                error: true,
                message: "Please Provide All Required Fields"
            }
        };

        axios.post.mockResolvedValue(response);

        const result = await createNewBook(data.image_filename, data.image, data.name, data.author, data.genre, data.content_filename, data.content);

        expect(result).toEqual(response.data);
    });

    test('Admin creates new book without book content', async () => {
        const data = {
            image_filename: "TFIII_DarkOfTheMoon.jpg",
            image: "https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/BookImages%2FTFIII_DarkOfTheMoon.jpg?alt=media&token=https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/BookImages/TFIII_DarkOfTheMoon.jpg?GoogleAccessId=firebase-adminsdk-22tls%40suico-it3202-sqa-finalpr-b13ba.iam.gserviceaccount.com&Expires=4102444800&Signature=ihPu%2F%2BraJwteYlrNJDDy%2BYv3pvCGJ5X9T78RQI09BThx11CSP4D%2FzXpOqdx6nGftIlhIbVmpLR5yy87eZwfD4aBFjIWU3Ts22%2F8QIFkBqslaype5lavzjXraO9Z0kwQHdVD1fBtUj%2BxS2oRwCAAqX%2BZVYIRTkvMHhkL%2FoaEUZw7i4N4uJZcxZl2qwfmFTuKEHiHCjIUgwFJ%2BgQx27ax49wExTYoX1frixAfIECHYO7Fz4rzWu31CMmuSkOHfMyglSTUHyS6%2FtQ4d4DCOLqNZofIkA2smZzdR3giwB%2B%2BEFqE5Y42gVLhucoGffH0hazFjBQWY3b8%2FS%2F3YKAvxTlZRhg%3D%3D",
            name: "Transformers: Dark of the Moon",
            author: "Peter David",
            genre: "Science Fiction",
            content_filename: null,
            content: null,
        }

        const response = {
            data: {
                error: true,
                message: "Please Provide All Required Fields"
            }
        };

        axios.post.mockResolvedValue(response);

        const result = await createNewBook(data.image_filename, data.image, data.name, data.author, data.genre, data.content_filename, data.content);

        expect(result).toEqual(response.data);
    });
});
