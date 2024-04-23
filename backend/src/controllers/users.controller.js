'use strict';

const User = require('../models/users.model');
const jwt = require('jsonwebtoken');

exports.findUserByInput = function(req, res) {
    const searchInput = req.params.input;

    User.findUserByInput(searchInput, function(err, user) {
        if (err) {
            res.status(500).json({ error: "Internal server error" });
        } else {
            res.status(200).json({ data: user });
        }
    });
};

exports.activateUser = function(req, res) {
    const userId = req.params.id;

    // Call the activateUser method on the User model
    User.activateUser(userId, function(err, result) {
        if (err) {
            res.status(500).json({ error: true, message: "Failed to activate user" });
        } else {
            res.status(200).json({ error: false, message: "User activated successfully" });
        }
    });
};

exports.deactivateUser = function(req, res) {
    const userId = req.params.id;

    // Call the deactivateUser method on the User model
    User.deactivateUser(userId, function(err, result) {
        if (err) {
            res.status(500).json({ error: true, message: "Failed to deactivate user" });
        } else {
            res.status(200).json({ error: false, message: "User deactivated successfully" });
        }
    });
};

exports.getAllUsers = function (req, res) {
    User.getAll(function (err, user) {
        if (err) {
            res.send(err);
        }
        console.log(user);
        res.send({
            status: 200,
            data: user
        });
    });
}

exports.getByStatus = function (req, res) {
    // Extract the status from the request parameters
    const status = req.params.input;

    // Call the getByStatus method of the User model with the status
    User.getByStatus(status, function (err, users) {
        if (err) {
            res.status(500).json({ status: 500, error: err });
        } else {
            res.status(200).json({ status: 200, data: users });
        }
    });
};

exports.getByRole = function (req, res) {
    // Extract the role from the request parameters
    const role = req.params.input;

    // Call the getByRole method of the User model with the role
    User.getByRole(role, function (err, users) {
        if (err) {
            res.status(500).json({ status: 500, error: err });
        } else {
            res.status(200).json({ status: 200, data: users });
        }
    });
};

exports.update = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            error: true,
            message: "Please Provide All Required Fields"
        });
    }
    else {
        const updatedUser = new User({ id: req.params.id, ...req.body });

        User.update(req.params.id, updatedUser, function (err, user) {
            if (err) {
                res.send(err);
            }
            res.json({
                error: false,
                status: 200,
                message: "User Updated Successfully!",
            });
        });
    }
}

exports.create = function (req, res) {
    const new_user = new User(req.body);
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.status(400).send({
            error: true,
            message: "Provide All Information"
        });
    } else {
        User.create(new_user, function (err, data) {
            if (err) {
                res.status(500).send({
                    error: true,
                    message: "Error creating user"
                });
            } else {
                if (data && data.accessToken && data.refreshToken) {
                    res.status(201).json({
                        error: false,
                        message: "User Created",
                        data: {
                            insertId: data.insertId,
                            accessToken: data.accessToken,
                            refreshToken: data.refreshToken
                        }
                    });
                } else {
                    res.status(500).send({
                        error: true,
                        message: "User could not be created"
                    });
                }
            }
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

