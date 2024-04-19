const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3306
const multer = require('multer');
const path = require('path');

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("Hello World 🙂");
});

const userRoutes = require('./src/routes/users.route');
app.use('/api/users', userRoutes);

const userImageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../frontend/src/assets/userimage') 
    }
});

const upload = multer({ storage: userImageStorage });
app.post('/upload-user-image', upload.single('image'), function (req, res, next) {
    res.status(200).json({ message: 'User image uploaded successfully' });
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
