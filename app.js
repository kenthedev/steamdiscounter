var express = require('express');
var request = require('request');
var app = express();
var mysql = require('mysql');
const SteamAPI = require('steamapi');
var key = "8C68E25ECA89AADB8CE55AC7003D668B";
const steam = new SteamAPI(key);
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

function GetAllGames() {
    var addToData;
    var apps = steam.getAppList();
    apps.then((data) => {
        for (var i = 0; i < data.length; i++) {
            addToData = "INSERT INTO allgames (appId, name) VALUES (";
            addToData += data[i].appid.toString() + ", \"" + data[i].name.toString() + "\");";
            //console.log(addToData);
            con.query(addToData, function (err, result) {
                if (err) {
                    console.log("Error: " + err);
                }
                else {
                }
            });
        
        }
    });
}

function GetDetails () {
    var array = [];
    con.query("SELECT * FROM allgames LIMIT 200", function(err,rows,fields) {
        for (var j = 0; j < rows.length; j++) {
            array.push(rows[j].appId);
        }
        var bigOOF = array[0];
        var gg = steam.getGameDetails(bigOOF);
        gg.then((oof) => {
            var foo = oof.genres;
            console.log(foo);
        });
    });
}

app.get("/data", function (req, res) {
    //GetAllGames();
    GetDetails();
    
});

app.get("/genre", function (req, res) { //All Student Information
    con.query("SELECT * FROM student", function(err,rows,fields) {
        if (err)
            console.log("Error during query processing");
        var outMessage = "<table border=1 align='center' style='background-color: white'>";
        outMessage += "<tr><th>ID</th><th>First Name</th><th>Last Name</th><th>Date of Birth</th><th>Major</th></tr>";
        for (var i = 0; i < rows.length; i++) {
            var dateTime = rows[i].dateOfBirth; //Following lines get date out of SQL DATE info
            var dateSplit = dateTime.toString(); //Converts to string for spliting
            var dateArray = dateSplit.split(" ");
            var date = "";
            for (var j = 1; j <= 3; j++) { //Gets just Month, Day, and Year
                date += dateArray[j];
                date += " ";
            }
            outMessage += "<tr>";
            outMessage += "<th>" + rows[i].id + "</th>";
            outMessage += "<th>" + rows[i].firstName + "</th>";
            outMessage += "<th>" + rows[i].lastName + "</th>";
            outMessage += "<th>" + date + "</th>";
            outMessage += "<th>" + rows[i].major + "</th>";
            outMessage += "</tr>";
        };
        outMessage += "</table>";
        res.status(200).send(outMessage);
    });
});
    
