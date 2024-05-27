const createNewBook = require('../frontend.async/books.automation.async');

jest.setTimeout(30000);

describe('Books Automation Test', () => {
    test('should create a new book successfully', async () => {
        const bookImageFilename = 'TFIII_DarkOfTheMoon.jpg';
        const bookImageFile = 'C:/Users/Lorenz Gil Suico/Desktop/TFIII_DarkOfTheMoon.jpg'; // Update this path to your local file
        const bookTitle = 'Transformers: Dark Side of the Moon';
        const bookAuthor = 'Peter Davidson';
        const bookGenre = 'Science Fiction';
        const bookContentFilename = 'TFIII_DarkOfTheMoon_Content.pdf';
        const bookContentFile = 'C:/Users/Lorenz Gil Suico/Desktop/TFIII_DarkOfTheMoon_Content.pdf'; // Update this path to your local file

        await createNewBook(bookImageFilename, bookImageFile, bookTitle, bookAuthor, bookGenre, bookContentFilename, bookContentFile);
    });
});
