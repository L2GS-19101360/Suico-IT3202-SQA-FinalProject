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
    deleteImageFile: async (imageName) => {
        try {
            const bucket = dbStorage.bucket("suico-it3202-sqa-finalpr-b13ba.appspot.com");
            const file = bucket.file(`UserImages/${imageName}`);
            await file.delete();
            console.log(`Image ${imageName} deleted successfully.`);
        } catch (error) {
            throw new Error(`Error deleting image file: ${error.message}`);
        }
    },
    getAllFiles: async () => {
        try {
            const userFiles = await dbStorage.bucket("suico-it3202-sqa-finalpr-b13ba.appspot.com").getFiles({
                prefix: `UserImages/`,
            });

            const filteredFiles = userFiles[0].filter(file => file.name !== 'UserImages/');

            const files = await Promise.all(filteredFiles.map(async (file) => {
                const token = await file.getSignedUrl({
                    action: 'read',
                    expires: '01-01-2100' // Set an expiration date far in the future
                });

                const publicUrl = `https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/${encodeURIComponent(file.name)}?alt=media&token=${token}`;
                
                return {
                    name: file.name,
                    publicUrl: publicUrl,
                };
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

            // Construct the public URL with the desired format
            const token = await file.getSignedUrl({
                action: 'read',
                expires: '01-01-2100' // Set an expiration date far in the future
            });

            const publicUrl = `https://firebasestorage.googleapis.com/v0/b/suico-it3202-sqa-finalpr-b13ba.appspot.com/o/${encodeURIComponent(fileName)}?alt=media&token=${token}`;

            return publicUrl;
        } catch (error) {
            throw new Error(`Error storing image file: ${error.message}`);
        }
    }
}

module.exports = UserImage;
