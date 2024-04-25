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

const BookImage = {
    getAllFiles: async () => {
        
    }
}

module.exports = BookImage