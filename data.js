var express = require('express');
var request = require('request');
var app = express();
var request = require('request');
var mysql = require('mysql');
const db = require('dotenv'); //Protects database information
const result = db.config(); //Allows use of protected information
var con =  mysql.createConnection({ //Connects to database with hidden information
    host: 'localhost',
    user: result.parsed.DB_USER,
    password: result.parsed.DB_PASS,
    database: result.parsed.DB_NAME
});

con.connect(function(err) { //Checks for proper connection to database
    if (err) {
        console.log("Error connecting to database");
    }
    else {
        console.log("Database successfully connected");
    }
});

app.use(express.static("."));

app.listen(8080,function(){ //Sets server port
    console.log("Server open on port 8080");
});

var url = "http://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=8C68E25ECA89AADB8CE55AC7003D668B&format=json";
request.get(url, function (err, res, body) {
    console.log(body);
    var x = body.apps;
    console.log(x);
    
});