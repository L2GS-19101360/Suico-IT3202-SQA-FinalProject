const multer = require('multer'); // Import multer for handling file uploads
const BookContent = require('../models/books.content.model')

const upload = multer();

const BookContentController = {
    deletePdf: async (req, res) => {
        try {
            const pdfName = req.params.pdfName;
            await BookContent.deletePdfFile(pdfName);
            res.status(200).json({ message: `PDF ${pdfName} deleted successfully` });
        } catch (error) {
            console.error('Error deleting PDF:', error);
            res.status(500).json({ error: error.message });
        }
    },
    storePdf: async (req, res) => { // Rename method to storePdf
        try {
            if (!req.file) {
                console.error('No file uploaded');
                return res.status(400).json({ error: "No file uploaded" });
            }

            const pdfFile = req.file;
            console.log('Received PDF file in controller.js:', pdfFile);

            // Pass the file to the model to store in Firebase Storage
            const pdfUrl = await BookContent.storePdfFile(pdfFile);
            console.log('PDF URL:', pdfUrl);

            res.status(200).json({ message: 'PDF uploaded successfully', pdfUrl });
        } catch (error) {
            console.error('Error storing PDF:', error);
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = { BookContentController, upload };
