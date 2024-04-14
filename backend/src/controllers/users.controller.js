'use strict'

const User = require('../models/users.model');

exports.create = function (req, res) {
    const new_user = new User(req.body);
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            error: true,
            message: "Provide All Information"
        });
    } else {
        User.create(new_user, function (err, user) {
            if (err) {
                res.send(err);
            }
            res.json({
                error: false,
                message: "User Created",
                data: user
            });
        });
    }
}

exports.logout = function (req, res) {
    const refreshToken = req.body.refreshToken;
    User.logout(refreshToken, function (err, result) {
        if (err) {
            res.status(500).json({ error: true, message: "Internal server error" });
        } else {
            res.status(200).json({ error: false, message: "Logout successful" });
        }
    });
}

exports.login = function(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: true, message: "Email and password are required" });
    }

    User.login(email, password, function(err, tokens) {
        if (err) {
            return res.status(500).json({ error: true, message: "Internal server error" });
        }

        if (!tokens) {
            return res.status(404).json({ error: true, message: "User not found or incorrect password" });
        }

        res.json({ error: false, message: "Login successful", tokens });
    });
}
