const { viewAllBooksFrontend, viewBooksByTitleSearchBar, viewBooksByAuthorSearchBar, viewBooksByFilterOption, createNewBookFrontend, deleteBookFrontend } = require('../frontend.async/books.automation.async');

jest.setTimeout(30000);

// describe('Update Books Automation Testing', () => {
//     test('', async () => {
//         // Implementation for updating a book
//     });
// });

// describe('Delete Books Automation Testing', () => {
//     test('Delete Book', async () => {
//         const result = await deleteBookFrontend(55); // replace with actual book ID and filenames for testing
//         expect(result).toBe(true);
//     });
// });

describe('Create Books Automation Testing', () => {
    test('Create book with all required information', async () => {
        const bookImageFile = '../sampleBookData/TheBestOfMe1.jpg';
        const bookContentFile = '../sampleBookData/TheBestOfMe_Content.pdf';
        const bookName = 'The Best of Me';
        const bookAuthor = 'Nicholas Sparks';
        const bookGenre = 'Horror';

        const result = await createNewBookFrontend(bookImageFile, bookName, bookAuthor, bookGenre, bookContentFile, true);
        expect(result).toBe(true);
    });

    test('Create book but book genre mistake', async () => {
        const bookImageFile = '../sampleBookData/TheBestOfMe1.jpg';
        const bookContentFile = '../sampleBookData/TheBestOfMe_Content.pdf';
        const bookName = 'The Best of Me';
        const bookAuthor = 'Nicholas Sparks';
        const bookGenre = 'HorroR';

        const result = await createNewBookFrontend(bookImageFile, bookName, bookAuthor, bookGenre, bookContentFile, true);
        expect(result).toBe(true);
    });

    test('Create book without book image', async () => {
        const bookImageFile = null;
        const bookContentFile = '../sampleBookData/TheBestOfMe_Content.pdf';
        const bookName = 'The Best of Me';
        const bookAuthor = 'Nicholas Sparks';
        const bookGenre = 'Horror';

        const result = await createNewBookFrontend(bookImageFile, bookName, bookAuthor, bookGenre, bookContentFile, false);
        expect(result).toBe(true);
    });

    test('Create book without book title', async () => {
        const bookImageFile = '../sampleBookData/TheBestOfMe1.jpg';
        const bookContentFile = '../sampleBookData/TheBestOfMe_Content.pdf';
        const bookName = null;
        const bookAuthor = 'Nicholas Sparks';
        const bookGenre = 'Horror';

        const result = await createNewBookFrontend(bookImageFile, bookName, bookAuthor, bookGenre, bookContentFile);
        expect(result).toBe(true);
    });

    test('Create book without book author', async () => {
        const bookImageFile = '../sampleBookData/TheBestOfMe1.jpg';
        const bookContentFile = '../sampleBookData/TheBestOfMe_Content.pdf';
        const bookName = 'The Best of Me';
        const bookAuthor = null;
        const bookGenre = 'Horror';

        const result = await createNewBookFrontend(bookImageFile, bookName, bookAuthor, bookGenre, bookContentFile);
        expect(result).toBe(true);
    });

    test('Create book without book genre', async () => {
        const bookImageFile = '../sampleBookData/TheBestOfMe1.jpg';
        const bookContentFile = '../sampleBookData/TheBestOfMe_Content.pdf';
        const bookName = 'The Best of Me';
        const bookAuthor = 'Nicholas Sparks';
        const bookGenre = null;

        const result = await createNewBookFrontend(bookImageFile, bookName, bookAuthor, bookGenre, bookContentFile);
        expect(result).toBe(true);
    });

    test('Create book without book content', async () => {
        const bookImageFile = '../sampleBookData/TheBestOfMe1.jpg';
        const bookContentFile = null;
        const bookName = 'The Best of Me';
        const bookAuthor = 'Nicholas Sparks';
        const bookGenre = 'Horror';

        const result = await createNewBookFrontend(bookImageFile, bookName, bookAuthor, bookGenre, bookContentFile);
        expect(result).toBe(true);
    });

    test('Create book without all required information', async () => {
        const bookImageFile = null;
        const bookContentFile = null;
        const bookName = null;
        const bookAuthor = null;
        const bookGenre = null;

        const result = await createNewBookFrontend(bookImageFile, bookName, bookAuthor, bookGenre, bookContentFile);
        expect(result).toBe(true);
    });
});

// describe('Read Books Automation Testing', () => {
//     test('View All Books', async () => {
//         const result = await viewAllBooksFrontend();
//         expect(result).toBe(true);
//     });
//     test('Search Books by Title', async () => {
//         const result = await viewBooksByTitleSearchBar('Star Wars: Kenobi'); // replace with actual book title for testing
//         expect(result).toBe(true);
//     });
//     test('Search Books by Author', async () => {
//         const result = await viewBooksByAuthorSearchBar('Dan Brown'); // replace with actual book title for testing
//         expect(result).toBe(true);
//     });
//     test('Filter Books by Historical Fiction', async () => {
//         const result = await viewBooksByFilterOption('Historical Fiction'); // replace with actual genre for testing
//         expect(result).toBe(true);
//     });
//     test('Filter Books by Crime and Mystery', async () => {
//         const result = await viewBooksByFilterOption('Crime and Mystery'); // replace with actual genre for testing
//         expect(result).toBe(true);
//     });
//     test('Filter Books by Horror', async () => {
//         const result = await viewBooksByFilterOption('Horror'); // replace with actual genre for testing
//         expect(result).toBe(true);
//     });
//     test('Filter Books by Science Fiction', async () => {
//         const result = await viewBooksByFilterOption('Science Fiction'); // replace with actual genre for testing
//         expect(result).toBe(true);
//     });
//     test('Filter Books by Education', async () => {
//         const result = await viewBooksByFilterOption('Education'); // replace with actual genre for testing
//         expect(result).toBe(true);
//     });
//     test('Filter Books by Romance', async () => {
//         const result = await viewBooksByFilterOption('Romance'); // replace with actual genre for testing
//         expect(result).toBe(true);
//     });
//     test('Filter Books by Fantasy', async () => {
//         const result = await viewBooksByFilterOption('Fantasy'); // replace with actual genre for testing
//         expect(result).toBe(true);
//     });
// });
