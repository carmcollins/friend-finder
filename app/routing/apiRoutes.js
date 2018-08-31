var friends = require("../data/friends");

// Settting up API routes
function apiRoutes(app) {
    app.get("/api/friends", function (req, res) {
        return res.json(friends);
    });

    app.post("/api/friends", function (req, res) {
        // Get the info from newFriend
        var newFriend = req.body;

        // Compare the newFriend's scores to all of the other scores in the friends array
        var scoreDiffs = [];

        for (var i = 0; i < friends.length; i++) {

            var diff = 0;

            for (var j = 0; j < friends[i].scores.length; j++) {
                diff += Math.abs(friends[i].scores[j] - parseInt(newFriend.scores[j]));
            }

            scoreDiffs.push(diff);
        };

        // Whoever's scoreDiff is the lowest is the user's match
        var matchIndex = scoreDiffs.indexOf(Math.min(...scoreDiffs));

        var match = friends[matchIndex];

        // Add newFriend to the friends array
        friends.push(newFriend);

        // Send the match's info back to survey.html
        return res.json(match);
    });
};

module.exports = apiRoutes;