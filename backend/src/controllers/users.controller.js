'use strict';

const User = require('../models/users.model');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../../auth/authenticateToken')

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

exports.login = function (req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: true, message: "Email and password are required" });
    }

    User.login(email, password, function (err, tokens) {
        if (err) {
            return res.status(500).json({ error: true, message: "Internal server error" });
        }

        if (!tokens) {
            return res.status(404).json({ error: true, message: "User not found" });
        }

        res.json({ error: false, message: "Login successful", tokens });
    });
}

exports.logout = function (req, res) {
    const { accessToken, refreshToken } = req.body;

    if (!accessToken || !refreshToken) {
        return res.status(400).json({ error: true, message: "Access token and refresh token are required" });
    }

    User.logout(accessToken, refreshToken, function (err, result) {
        if (err) {
            return res.status(500).json({ error: true, message: "Internal server error" });
        }

        res.json({ error: false, message: result.message });
    });
}

