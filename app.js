// Grab express and our routes
var express = require("express")
var app = express();
var api = require("./api");

// Setup our public folder for all of our assets and such
app.use(express.static("public"));

// List out all of our api calls
app.get("/api/v1/categories/:domain", api.getCategories);

// If on our production server, we'll use the environment port.
// Otherwise, we just use 5000
var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on port " + port);
});