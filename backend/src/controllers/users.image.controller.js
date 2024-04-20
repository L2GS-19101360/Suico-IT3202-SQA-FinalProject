const UserImage = require('../models/users.image.model');

const UserImageController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await UserImage.getAll();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = UserImageController;
