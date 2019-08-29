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

// Students Listener
app.get("/Students", function(req, res) {
    con.query('SELECT * FROM student', function (err, rows)  {
        if (err) {
            console.log('Error during query');
        }
        else {
            var output = [];
            for (var i = 0; i < rows.length; i++) {
                output.push(
                    {studentid: rows[i].studentid, 
                    firstName: rows[i].firstName, 
                    lastName: rows[i].lastName, 
                    dateofbirth: rows[i].dateofbirth, 
                    major: rows[i].major} );
            }
            console.log(JSON.stringify(output));
            res.send(JSON.stringify(output));
        }
    });
});

// Courses Listener
app.get("/Courses", function(req, res) {
    con.query('SELECT * FROM course', function (err, rows)  {
        if (err) {
            console.log('Error during query');
        }
        else {
            var output = [];
            for (var i = 0; i < rows.length; i++) {
                output.push(
                    {courseid: rows[i].courseid, 
                    courseDescription: rows[i].courseDescription} );
            }
            console.log(JSON.stringify(output));
            res.send(JSON.stringify(output));
        }
    });
});


// Grades Listener
app.get("/Grades", function(req, res) {
    con.query('SELECT * FROM grades', function (err, rows)  {
        if (err) {
            console.log('Error during query');
        }
        else {
            var output = [];
            for (var i = 0; i < rows.length; i++) {
                output.push(
                    {id: rows[i].id, 
                    courseid: rows[i].courseid, 
                    studentid: rows[i].studentid, 
                    term: rows[i].term, 
                    Grade: rows[i].Grade} );
            }
            console.log(JSON.stringify(output));
            res.send(JSON.stringify(output));
        }
    });
});

// Transcript Listener
app.get("/Transcript", function(req, res) {
    var person = req.query.input;
    person = person.toString();
    con.query('SELECT student.studentid, firstName, lastName, term, course.courseid, courseDescription, Grade FROM student, course, grades WHERE grades.studentid = student.studentid && grades.courseid = course.courseid && student.firstName = "' + person + '"', (err, rows) => {
        console.log('We queried.');
        if (err) {
            console.log('Error during query');
        }
        else {
            var output = [];
            for (var i = 0; i < rows.length; i++) {
                output.push(
                    {studentid: rows[i].studentid, 
                    firstName: rows[i].firstName, 
                    lastName: rows[i].lastName, 
                    term: rows[i].term, 
                    courseid: rows[i].courseid,
                    courseDescription: rows[i].courseDescription,
                    Grade: rows[i].Grade });
            }
        }
        console.log(JSON.stringify(output));
        res.send(JSON.stringify(output));
    
    });

});


app.listen(8080, function(){
    console.log(`Server running at http://localhost:8080/`);
});
