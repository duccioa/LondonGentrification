#!/usr/bin/env node

//  Food Premises API Server
//  Author:  Adapted from original code by Steven Gray
//  Description:  This API connects to a database containing food premises in London and visualises them on a map with the possibility of filtering the premises' names by the words they contains

//  Notes:        This API assumes you have an SQL function called DISTANCE defined which can be created by running the following query in MySQL:

//  CREATE FUNCTION distance(a POINT, b POINT) RETURNS double DETERMINISTIC RETURN ifnull(acos(sin(X(a)) * sin(X(b)) + cos(X(a)) * cos(X(b)) * cos(Y(b) - Y(a))) * 6380, 0)

var moment = require('moment');

var portNumber = 8866;

var mysql = require('mysql');

// MySQL Connection Variables
var connection = mysql.createConnection({
    host: '128.40.150.34',
    user: 'ucfndai',
    password: 'cefevodayo',
    database: 'ucfndai'
});

connection.connect();

//  Setup the Express Server
var express = require('express');
var app = express();
app.set('view engine', 'ejs');

// Provides the static folders we have added in the project to the web server.
app.use(express.static(__dirname + '/js'));
app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/images'));

// Default API Endpoint - return the index.ejs file in the views folder
app.get('/', function(req, res) {
    return res.render('index');
})


//  API EndPoint to get data from specific area - /data/51.1/0.0/30 
app.get('/data/tokens_spatial/:lat_min/:lon_min/:lat_max/:lon_max/:token/', function(req, res) {

    // Alows data to be downloaded from the server with security concerns
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-WithD");
    // If all the variables are provided connect to the database
    if (req.params.lat_min !== "" && req.params.lon_min !== "" && req.params.lat_max !== "" && req.params.lon_max !== "" && req.params.token !== "") {

        // Parse the values from the URL into numbers for the query
        var lat_min = parseFloat(req.params.lat_min);
        var lon_min = parseFloat(req.params.lon_min);
        var lat_max = parseFloat(req.params.lat_max);
        var lon_max = parseFloat(req.params.lon_max);
        var token = req.params.token



        // SQL Statement to run
        //var sql = "SELECT * FROM tokens_spatial WHERE DISTANCE(points, POINT("+lon+","+lat+") ) <= " + radius;
        var sql = "SELECT * FROM tokens_spatial AS t WHERE t.lat >= " + lat_min + " AND t.lat <= " + lat_max + " AND t.lon >= " + lon_min + " AND t.lon <= " + lon_max + "AND t.Token IN (\"" + token + "\");";


        // Log it on the screen for debugging
        console.log(sql);

        // Run the SQL Query
        connection.query(sql, function(err, rows, fields) {
            if (err) console.log("Err:" + err);
            if (rows != undefined) {
                // If we have data that comes back send it to the user.
                res.send(rows);
            } else {
                res.send("");
            }
        });
    } else {
        // If all the URL variables are not passed send an empty string to the user
        res.send("");
    }
});

// API Endpoint to get data for specific premise from database - /data/tokens_spatials/12
app.get('/data/tokens_spatial/:BusinessID', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-WithD");
    if (req.params.BusinessID != "") {
        var bID = parseInt(req.params.BusinessID);

        var sql = "SELECT * FROM tokens_spatial AS t WHERE t.BusinessID = " + bID;

        console.log(sql);
        connection.query(sql, function(err, rows, fields) {
            if (err) console.log("Err:" + err);
            if (rows !== undefined) {
                res.send(rows);
            } else {
                res.send("");
            }
        });
    } else {
        res.send("");
    }
});


// Setup the server and print a string to the screen when server is ready
var server = app.listen(portNumber, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('App listening at http://%s:%s', host, port);
});

function mysql_real_escape_string(str) {
    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function(char) {
        switch (char) {
            case "\0":
                return "\\0";
            case "\x08":
                return "\\b";
            case "\x09":
                return "\\t";
            case "\x1a":
                return "\\z";
            case "\n":
                return "\\n";
            case "\r":
                return "\\r";
            case "\"":
            case "'":
            case "\\":
            case "%":
                return "\\" + char; // prepends a backslash to backslash, percent,
                // and double/single quotes
        }
    });
}

process.on('SIGINT', function() {

    console.log("Caught interrupt signal");

    connection.destroy()

    process.exit();

});