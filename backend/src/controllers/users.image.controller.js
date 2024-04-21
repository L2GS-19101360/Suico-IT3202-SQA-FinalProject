const multer = require('multer'); // Import multer for handling file uploads
const UserImage = require('../models/users.image.model');

// Configure multer to save uploaded files to memory (no disk storage)
const upload = multer();

const UserImageController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await UserImage.getAllFiles();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    storeFile: async (req, res) => {
        try {
            if (!req.file) {
                console.error('No file uploaded');
                return res.status(400).json({ error: "No file uploaded" });
            }

            const imageFile = req.file;
            console.log('Received image file in controller.js:', imageFile);

            // Pass the file to the model to store in Firebase Storage
            const imageUrl = await UserImage.storeImageFile(imageFile);
            console.log('Image URL:', imageUrl);

            res.status(200).json({ message: 'File uploaded successfully', imageUrl });
        } catch (error) {
            console.error('Error storing file:', error);
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = { UserImageController, upload }; // Export upload middleware
