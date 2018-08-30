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
    res.sendFile(path.join(__dirname, "/app/public/home.html"));
});

app.get("/survey", function (req, res) {
    res.sendFile(path.join(__dirname, "/app/public/survey.html"));
});

// Setting up data
var friends = [
    {
        "name" : "Carmen",
        "photo" : "https://placehold.it/200x200",
        "scores" : [2, 5, 3, 4, 4, 3, 2, 1, 3, 5]
    },
    {
        "name" : "Olivia",
        "photo" : "https://placehold.it/200x200",
        "scores" : [3, 2, 4, 4, 4, 1, 2, 4, 1, 3]
    },
    {
        "name" : "Natalie",
        "photo" : "https://placehold.it/200x200",
        "scores" : [5, 2, 2, 2, 5, 2, 5, 3, 2, 5]
    }
];

// Settting up API routes
app.get("/api/friends", function (req, res) {
    return res.json(friends);
});

app.post("/api/friends", function (req, res) {
    var newFriend = req.body;

    console.log(newFriend);

    var scoreDiffs = [];

    for (var i = 0; i < friends.length; i++) {

        var diff = 0;

        for (var j = 0; j < friends[i].scores.length; j++) {
            diff += Math.abs(friends[i].scores[j] - newFriend.scores[j]);
        }

        scoreDiffs.push(diff);
    };

    var matchIndex = scoreDiffs.indexOf(Math.min(...scoreDiffs));

    var match = friends[matchIndex];

    friends.push(newFriend);

    return res.json(match);
});

// Starts the server to begin listening
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});