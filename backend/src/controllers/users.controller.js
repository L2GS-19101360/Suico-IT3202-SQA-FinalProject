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