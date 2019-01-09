// ===============================================================================
// LOAD DATA
// ===============================================================================
var surveyData = require("../data/friends")
// ===============================================================================
// ROUTING
// ===============================================================================
module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(surveyData);
    });
    app.post("/api/friends", function(req, res) {
        if (surveyData.length > 0) {

        }
        // Keeps track of all differences with latest submission
        let allDifferences = [];
        // Brings back lowest difference from submissions in server
        const getBestMatch = (array) => {
            let bestIndex = 0;
            let lowestScoreDifference = array[bestIndex]; // Starts with first index of allDifferences array inserted
            let bestMatch = surveyData[bestIndex]; // Object to be returned with best match based on least difference amongst all scores. Initially starts at index 0.
            array.forEach(element => {
                if (lowestScoreDifference > element) {
                    lowestScoreDifference = element;
                    bestIndex = array.indexOf(lowestScoreDifference);
                    bestMatch = surveyData[bestIndex];
                }
            });
            return bestMatch;
        };
        surveyData.forEach(element => {
            let totalDifference = 0;
            for (let index = 0; index < element.scores.length; index++) {
                totalDifference += Math.abs(req.body.scores[index] - element.scores[index]);
            };
            element.scores.forEach(element => {
                
            });
            allDifferences.push(totalDifference);
            res.json(getBestMatch(allDifferences));
        });
        surveyData.push(req.body);
    });
};