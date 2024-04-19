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

const multer = require('multer');

// Define storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontend/src/assets/userimage'); // Set the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Maintain the original filename
  }
});

// Initialize multer instance with the storage options
const upload = multer({ storage: storage });

// Endpoint to handle file upload
app.post('/api/upload-user-image', upload.single('profileImage'), (req, res) => {
  // 'profileImage' is the name attribute of the file input field in your form
  // req.file contains information about the uploaded file
  res.status(200).json({ message: 'File uploaded successfully' });
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
