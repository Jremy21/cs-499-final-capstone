// API endpoint for retrieving trips data
const tripsEndpoint = "http://localhost:3000/api/trips";

// Options used with fetch for GET request
const options = {
    method: "GET",
    headers: {
        "Accept": "application/json"
    }
};

// var fs = require("fs");
// var trips = JSON.parse(fs.readFileSync("./data/trips.json", "utf8"));

/* GET travel view */
const travel = async function (req, res, next) {

    await fetch(tripsEndpoint, options)
        .then(res => res.json())
        .then(json => {

            let message = null;

            // Check if response is not an array
            if (!(json instanceof Array)) {
                message = "API lookup error";
                json = [];  // Reset json to empty list
            }
            else {
                // Check if array is empty
                if (json.length === 0) {
                    message = "No trips exist in our database";
                }
            }

            // Render travel view
            res.render("travel", {
                title: "Travlr Getaways",
                trips: json,
                message
            });
        })
        .catch(err => res.status(500).send(err.message));
};

// Export controller method
module.exports = {
    travel,
};