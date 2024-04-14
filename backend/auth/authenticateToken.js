// const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');
// const userController = require('../src/controllers/users.controller')

// dotenv.config();

// module.exports = function (req, res, next) {
//     const { accessToken, refreshToken } = req.tokens || {};

//     // console.log("Access Token:", accessToken);
//     // console.log("Refresh Token:", refreshToken);

//     if (!accessToken || !refreshToken) {
//         return res.status(401).json({ error: true, message: "Access denied. Tokens are required." });
//     }

//     jwt.verify(accessToken, accessTokenSecret, (err, user) => {
//         if (err) return res.status(403).json({ error: true, message: "Invalid access token." });

//         jwt.verify(refreshToken, refreshTokenSecret, (err, decoded) => {
//             if (err) return res.status(403).json({ error: true, message: "Invalid refresh token." });

//             req.user = user; 
//             next(); 
//         });
//     });
// };
