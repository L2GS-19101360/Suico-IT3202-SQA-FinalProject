const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3306

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("Hello World 🙂");
});

const userRoutes = require('./src/routes/users.route');
app.use('/api/users', userRoutes);

const UserImageRoutes = require('./src/routes/users.image.route');
app.use('/api/users-image', UserImageRoutes);

const bookRoutes = require('./src/routes/books.route');
app.use('/api/books', bookRoutes);

const BookImageRoutes = require('./src/routes/books.image.route');
app.use('/api/book-image', BookImageRoutes);

const BookContentRoutes = require('./src/routes/books.content.route');
app.use('/api/book-content', BookContentRoutes)

const borrowBookRoutes = require('./src/routes/books.borrow.route');
app.use('/api/borrow-books-request', borrowBookRoutes);

const returnBookRoutes = require('./src/routes/books.return.route');
app.use('/api/return-books-request', returnBookRoutes);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
