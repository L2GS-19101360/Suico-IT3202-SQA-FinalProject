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

const dbFirebase = admin.firestore();
const dbStorage = admin.storage();

const UserImage = {
    getAll: async () => {
        try {
            // Fetch user data from Firestore
            const querySnapshot = await dbFirebase.collection("Users").get();
            const users = [];

            // Iterate through each document to retrieve user data
            for (const doc of querySnapshot.docs) {
                const userData = doc.data();

                // Fetch files associated with each user from Firebase Storage
                const userFiles = await dbStorage.bucket("suico-it3202-sqa-finalpr-b13ba.appspot.com").getFiles({
                    prefix: `UserImages/`, // Adjust the prefix according to your storage structure
                });

                // Add user data along with files to the users array
                const files = userFiles[0].map(file => ({
                    name: file.name,
                    publicUrl: `https://storage.googleapis.com/suico-it3202-sqa-finalpr-b13ba.appspot.com/${file.name}`,
                }));

                users.push({
                    id: doc.id,
                    userData,
                    files,
                });
            }

            console.log("Fetched users and files from Firestore and Storage:", users);
            return users;
        } catch (error) {
            throw new Error(`Error fetching user data and files: ${error.message}`);
        }
    }
}

module.exports = UserImage;
