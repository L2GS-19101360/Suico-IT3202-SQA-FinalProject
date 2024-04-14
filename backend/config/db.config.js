'use stict'

const mysql = require('mysql');

const dbConnection = mysql.createConnection({
    host: `bzk2o4psfaiqi6lcnros-mysql.services.clever-cloud.com`,
    user: `uszvqggydnbn455e`,
    password: `aDC4oRbWR5dtvw4sH6rb`,
    database: `bzk2o4psfaiqi6lcnros`
});

dbConnection.connect(function(err) {
    console.log("Database Connected");
});

module.exports = dbConnection;