var express = require('express');
var app = express();
app.use(express.static("."));
const db = require('dotenv');
const result = db.config();
var mysql = require('mysql');
var con = mysql.createConnection({
    host: result.parsed.DB_HOSTNAME,
    user: result.parsed.DB_USERNAME,
    password: result.parsed.DB_PASSWORD,
    database: result.parsed.DB_DATABASE
});

con.connect(function(err) {
    if(err) {
        console.log("Error connecting to database");
    }
    else {
        console.log("Database successfully connected");
    }
});


// Courses Listener
app.get("/", function(req, res) {

    var jsondata = req.body;
    var values = [];

    for(var i = 0; i < jsondata.length; i++)
    {
        values.push([jsondata[i].appid,jsondata[i].name]);
    }

    con.query('INSERT INTO steamListings (appid, name) * VALUES ?', [values], function (err, result)  {
        if (err) {
            console.log('Error during query');
        }
        else {
            console.log(body);
            res.send(200, 'Inserted those bad boys!');
        }
    });
});



app.listen(8080, function(){
    console.log(`Server running at http://localhost:8080/`);
});
