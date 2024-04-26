const admin = require("firebase-admin");
const serviceAccount = require("../../serviceAccountKey.json");

if (!admin.apps.length) {
    // Initialize Firebase
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    console.log("Firebase initialized successfully");
} else {
    console.log("Firebase app already initialized");
}

const dbStorage = admin.storage();

const BookContent = {
    storePdfFile: async (pdfFile) => { // Rename method to storePdfFile
        try {
            const bucket = dbStorage.bucket("suico-it3202-sqa-finalpr-b13ba.appspot.com");
            const fileName = `BookContents/${pdfFile.originalname}`; // Set the filename in Storage

            const file = bucket.file(fileName);
            const stream = file.createWriteStream({
                metadata: {
                    contentType: 'application/pdf' // Set content type to PDF
                }
            });

            stream.on('error', (error) => {
                throw error;
            });

            stream.on('finish', () => {
                console.log('File uploaded successfully');
            });

            stream.end(pdfFile.buffer);

            // Construct the public URL with the desired format
            const token = await file.getSignedUrl({
                action: 'read',
                expires: '01-01-2100' // Set an expiration date far in the future
            });

            const publicUrl = `https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/${encodeURIComponent(fileName)}?alt=media&token=${token}`;

            return publicUrl;
        } catch (error) {
            throw new Error(`Error storing PDF file: ${error.message}`);
        }
    }
}

module.exports = BookContent;
