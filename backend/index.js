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

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
