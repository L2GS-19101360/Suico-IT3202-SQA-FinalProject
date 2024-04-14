'use strict'

const dbConnection = require('../../config/db.config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

const User = function (user) {
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.email = user.email;
    this.password = user.password;
    this.role = user.role;
    this.active_status = user.active_status ? user.active_status : 1;
    this.created = new Date();
    this.updated = null;
}

User.create = function (newUser, result) {
    dbConnection.query("INSERT INTO users set ?", newUser, function (err, res) {
        if (err) {
            console.log(err);
            result(err, null);
        } else {
            console.log(res.insertId);
            result(null, res.insertId);
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

            if (res) {
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

User.logout = function (result) {
    
}


module.exports = User;
