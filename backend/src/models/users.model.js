'use strict'

const dbConnection = require('../../config/db.config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

const User = function (user) {
    this.image = user.image;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.email = user.email;
    this.password = user.password;
    this.role = user.role;
    this.active_status = user.active_status ? user.active_status : 1;
    this.created = new Date();
    this.updated = null;
}

User.getByRole = function(role, result) {
    dbConnection.query("SELECT * FROM users WHERE role=?", role, function(err, res) {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            console.log(res);
            result(null, res);
        }
    });
};

User.getAll = function (result) {
    dbConnection.query("SELECT * FROM users", function (err, res) {
        if (err) {
            console.log(err);
            result(null, err);
        } else {
            console.log(res);
            result(null, res);
        }
    });
}

User.update = function (id, user, result) {
    console.log("Updating User with ID:", id);
    console.log("User data:", user);

    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            user.password = hash;

            dbConnection.query("UPDATE users SET image=?, firstname=?, lastname=?, email=?, password=?, updated=? WHERE id=?", [user.image, user.firstname, user.lastname, user.email, user.password, new Date(), id], function (err, res) {
                if (err) {
                    console.log("Error: ", err);
                    result(null, err);
                } else {
                    console.log("Update result:", res);
                    result(null, res);
                }
            });
        }
    })
}

User.create = function (newUser, result) {
    bcrypt.hash(newUser.password, 10, function (err, hash) {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            newUser.password = hash;

            dbConnection.query("INSERT INTO users SET ?", newUser, function (err, res) {
                if (err) {
                    console.log(err);
                    result(err, null);
                } else {
                    const accessToken = jwt.sign({ id: res.insertId, email: newUser.email }, accessTokenSecret, { expiresIn: '7d' });
                    const refreshToken = jwt.sign({ id: res.insertId, email: newUser.email }, refreshTokenSecret);

                    console.log(res.insertId);
                    result(null, { insertId: res.insertId, accessToken: accessToken, refreshToken: refreshToken });
                }
            });
        }
    });
}

User.login = function (email, password, result) {
    dbConnection.query("SELECT * FROM users WHERE email = ?", email, function (err, rows) {
        if (err) {
            console.log(err);
            return result(err, null);
        }

        if (!rows.length) {
            return result(null, null);
        }

        const user = rows[0];

        bcrypt.compare(password, user.password, function (err, res) {
            if (err) {
                console.error(err);
                return result(err, null);
            }

            if (res && !res) {
                return result(null, null);
            } else {
                // Generate JWT token
                const accessToken = jwt.sign({ id: user.id, email: user.email }, accessTokenSecret, { expiresIn: '7d' });
                const refreshToken = jwt.sign({ id: user.id, email: user.email }, refreshTokenSecret);
                result(null, { user, accessToken, refreshToken });
            }
        });
    });
}

User.logout = function (accessToken, refreshToken, result) {
    const revokedTokens = [];

    revokedTokens.push(accessToken);
    revokedTokens.push(refreshToken);

    result(null, { message: "Logout successful" });
}



module.exports = User;
