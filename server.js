// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Setting up Express
var app = express();
var PORT = process.env.PORT || 3000;

// Setting up Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Settting up HTML routes
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
});

app.get("/survey", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/survey.html"));
});

// Settting up API routes
app.get("/api/friends", function (req, res) {
    return res.json(friends);
});

app.post("/api/friends", function (req, res) {
    var newFriend = req.body;
});

// Setting up data
var friends = [
    // Example object
    {
        "name" : "Carmen",
        "photo" : "https://placehold.it/200x200",
        "scores" : [1, 2, 3, 4, 5, 1, 2, 3, 4, 5]
    }
];