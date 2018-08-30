var friends = require("../data/friends");
var bodyParser = require("body-parser");

// Settting up API routes
function apiRoutes(app) {
    app.get("/api/friends", function (req, res) {
        return res.json(friends);
    });

    app.post("/api/friends", function (req, res) {
        var newFriend = req.body;

        var scoreDiffs = [];

        for (var i = 0; i < friends.length; i++) {

            var diff = 0;

            for (var j = 0; j < friends[i].scores.length; j++) {
                diff += Math.abs(friends[i].scores[j] - parseInt(newFriend.scores[j]));
            }

            scoreDiffs.push(diff);
        };

        var matchIndex = scoreDiffs.indexOf(Math.min(...scoreDiffs));

        var match = friends[matchIndex];

        friends.push(newFriend);

        return res.json(match);
    });
};

module.exports = apiRoutes;