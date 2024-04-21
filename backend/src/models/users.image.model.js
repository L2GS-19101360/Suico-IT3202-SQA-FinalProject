const admin = require("firebase-admin");
const serviceAccount = require("../../serviceAccountKey.json");

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  console.log("Firebase initialized successfully");
} catch (error) {
  console.error("Error initializing Firebase:", error);
}

const dbStorage = admin.storage();

const UserImage = {
    getAllFiles: async () => {
        try {
            const userFiles = await dbStorage.bucket("suico-it3202-sqa-finalpr-b13ba.appspot.com").getFiles({
                prefix: `UserImages/`,
            });

            const filteredFiles = userFiles[0].filter(file => file.name !== 'UserImages/');

            const files = filteredFiles.map(file => ({
                name: file.name,
                publicUrl: `https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/${file.name}`,
            }));

            console.log("Fetched files from Storage:", files);
            return files;
        } catch (error) {
            throw new Error(`Error fetching files from Firebase Storage: ${error.message}`);
        }
    },

    storeImageFile: async (imageFile) => {
        try {
            const bucket = dbStorage.bucket("suico-it3202-sqa-finalpr-b13ba.appspot.com");
            const fileName = `UserImages/${imageFile.originalname}`; // Set the filename in Storage

            const file = bucket.file(fileName);
            const stream = file.createWriteStream({
                metadata: {
                    contentType: imageFile.mimetype
                }
            });

            stream.on('error', (error) => {
                throw error;
            });

            stream.on('finish', () => {
                console.log('File uploaded successfully');
            });

            stream.end(imageFile.buffer);

            const publicUrl = `https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/${fileName}`;
            return publicUrl;
        } catch (error) {
            throw new Error(`Error storing image file: ${error.message}`);
        }
    }
}

module.exports = UserImage;
