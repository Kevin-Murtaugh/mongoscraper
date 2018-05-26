// Dependencies
var express = require("express");
var mongojs = require("mongojs");
// Require request and cheerio. This makes the scraping possible
const searchScraper = require("./search_scraper");
var mongoose = require("mongoose");
const path = require("path");
// const Article = require("./models/article");

mongoose
  .connect("mongodb://localhost/kevin_scraper")
  .then(() => console.log(`Database connection successful`));

const Article = require("./models/article");

var request = require("request");
var cheerio = require("cheerio");

//Add from scehdulizer
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");

// Initialize Express
var app = express();
app.set("views", path.join(__dirname, "views"));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Database configuration
// var databaseUrl = "scraper";

var collections = ["scrapedData"];

// Hook mongojs configuration to the db variable
// var db = mongojs(databaseUrl, collections);
// db.on("error", function(error) {
//   console.log("Database Error:", error);
// });

// Main route (simple Hello World Message)
app.get("/", function(req, res) {
  res.render("search");
  // res.render("scraped", {
  //   results: [
  //     { articleTitle: "Dummy0", articleURL: "URL", articleSummary: "Summary" },
  //     { articleTitle: "Dummy1", articleURL: "URL", articleSummary: "Summary" },
  //     { articleTitle: "Dummy2", articleURL: "URL", articleSummary: "Summary" }
  //   ]
  // });
});

app.get("/search", function(req, res) {
  const searchTerm = req.query.term.split("+").join(" ");
  console.log(`The search term is ${searchTerm}`);
  searchScraper(searchTerm, function(results) {
    console.log(results);
    // res.render("scraped", { results: results });
    res.json({
      results
    });
  });
  // console.log(req.query.term);
  // res.json({
  //   term: req.query.term
  // });
});

// Retrieve data from the db
app.get("/all", function(req, res) {
  // Find all results from the scrapedData collection in the db
  // db.scrapedData.find({}, function(error, found) {
  //   // Throw any errors to the console
  //   if (error) {
  //     console.log(error);
  //   }
  //   // If there are no errors, send the data to the browser as json
  //   else {
  //     res.json(found);
  //   }
  // });

  // Clear everything in the article collection
  // Then scrape the data and repopulate it with the latest data
  Article.remove({}).then(() => {
    console.log(`The article collection has been cleared`);
    scraper(function(results) {
      Article.collection.insert(results).then(() => {
        Article.find().then(articles => {
          // res.json({
          //   articles
          // });
          res.render("scraped", { articles });
        });
      });
    });
  });
});

// // Scrape data from one site and place it into the mongodb db
// app.get("/scrape", function(req, res) {
//   // Make a request for the news section of `ycombinator`
//   request("https://news.ycombinator.com/", function(error, response, html) {
//     // Load the html body from request into cheerio
//     var $ = cheerio.load(html);
//     // For each element with a "title" class
//     $(".title").each(function(i, element) {
//       // Save the text and href of each link enclosed in the current element
//       var title = $(element).children("a").text();
//       var link = $(element).children("a").attr("href");

//       // If this found element had both a title and a link
//       if (title && link) {
//         // Insert the data in the scrapedData db
//         db.scrapedData.insert({
//           title: title,
//           link: link
//         },n
//             console.log(inserted);
//           }
//         });
//       }
//     });
//   });

//   // Send a "Scrape Complete" message to the browser
//   res.send("Scrape Complete");
// });

app.get("/", function(req, res, next) {
  var results = [];

  // Make a request call to grab the HTML body from the site of your choice
  request("https://www.worldrugby.org/sevens/news?lang=en", function(
    error,
    response,
    html
  ) {
    // Load the HTML into cheerio and save it to a variable
    // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
    var $ = cheerio.load(html);

    // An empty array to save the data that we'll scrape

    // Select each element in the HTML body from which you want information.
    // NOTE: Cheerio selectors function similarly to jQuery's selectors,
    // but be sure to visit the package's npm page to see how it works;;
    $("figure").each(function(i, element) {
      var title = $(element)
        .find("figcaption span.title")
        .text();
      var URL = $(element)
        .find("a")
        .attr("href");
      var summary = $(element)
        .find("figcaption p")
        .text();

      // });

      // Save these results in an object that we'll push into the results array we defined earlier
      results.push({
        title: title,
        URL: "https://www.worldrugby.org" + URL,
        summary: summary
      });
      results.forEach(function(result) {});

      // dbAddRecord(results);
    });

    // Log the results once you've looped through each of the elements found with cheerio
  });
});

// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});
