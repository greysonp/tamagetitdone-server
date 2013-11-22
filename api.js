var request = require("request");
var cheerio = require("cheerio");

/**
 * Given a domain, this will output a json response of the categories
 * that domain falls under according to OpenDNS. They don't have a public
 * API, so we have to scrape the site.
 */
exports.getCategories = function(req, res) {
    var domain = req.params.domain;

    // Make the request for the web content we're going to scrape
    request.get({ "url": "http://domain.opendns.com/" + domain}, function(error, response, body) {
        // If we have an error, print it out
        if (error != null) {
            var obj = { 
                "status": "error",
                "error": response
            }
            res.send(obj);
            return;
        }

        // Use cheerio to parse the html content we grabbed
        var $ = cheerio.load(body);

        // This selector will grab our categories
        var catString = $("h3 span.normal").text();

        // Split up out categories on the comma, then trim them down to eliminate extra spaces
        var categories = catString.split(',');
        for (var i = 0; i < categories.length; i++) {
            categories[i] = categories[i].trim();
        }

        if (categories[0].length === 0) {
            categories = [];
        }

        // Spit out our json response
        var obj = { 
            "status": "success",
            "categories": categories
        }
        res.send(obj);
    });
}