'use strict'

const dbConnection = require('../../config/db.config');

const User = function(user) {
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.email = user.email;
    this.password = user.password;
    this.role = user.role;
    this.active_status = user.active_status;
    this.created = new Date();
    this.updated = null;
}

module.exports = User;