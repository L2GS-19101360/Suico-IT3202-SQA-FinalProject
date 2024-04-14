'use strict'

const dbConnection = require('../../config/db.config');
const bcrypt = require('bcrypt');

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

        console.log(email + password);
        console.log("Rows:", rows);

        if (!rows.length) {
            return result(null, null);
        }

        const user = rows[0];

        bcrypt.compare(password, user.password, function (err, res) {
            if (err) {
                console.error(err);
                return result(err, null);
            }

            console.log("Password comparison result:", res);

            if (!res) {
                return result(null, user);
            } else {
                return result(null, null);
            }
        });
    });
}

module.exports = User;