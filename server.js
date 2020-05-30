// Dependencies
var express = require("express");
var mongojs = require("mongojs");

// Initialize Express
var app = express();

// Set up a static folder (public) for our web app
app.use(express.static("public"));

// DB config

var databaseUrl = "invitae";
var collections = ["variants"];

// Mongojs to hook the database to the db variable

var db = mongojs(databaseUrl, collections);

db.on("error", function(error) {
    console.log("Database Error:", error);
})

//Routes
// root path

app.get("/", function(req, res) {
    res.send("Hello Invitae");
});

app.get("/all", function(req, res) {
    db.variants.find({}, function(error, found){
        // Log the errors if there is one
        if (error) {
            console.log(error);
        }
        // Otherwise send the result to the browser
        else {
            res.json(found)
        }
    });
});

// Set the app to listen on port 3000

app.listen(3000, function() {
    console.log("App running on port 3000");
})
