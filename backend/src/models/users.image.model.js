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
    // You can keep the logic related to fetching files from Firebase Storage
    getAllFiles: async () => {
        try {
            // Fetch files from Firebase Storage
            const userFiles = await dbStorage.bucket("suico-it3202-sqa-finalpr-b13ba.appspot.com").getFiles({
                prefix: `UserImages/`, // Adjust the prefix according to your storage structure
            });

            // Filter out the directory itself (Object 1)
            const filteredFiles = userFiles[0].filter(file => file.name !== 'UserImages/');

            // Format and return the files
            const files = filteredFiles.map(file => ({
                name: file.name,
                publicUrl: `https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/${file.name}`,
            }));

            console.log("Fetched files from Storage:", files);
            return files;
        } catch (error) {
            throw new Error(`Error fetching files from Firebase Storage: ${error.message}`);
        }
    }
}

module.exports = UserImage;
