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



// Main route (simple Hello World Message)
app.get("/", function(req, res) {
  res.render("search");

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

});

// Retrieve data from the db
app.get("/all", function(req, res) {

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


app.get("/", function(req, res, next) {
  var results = [];

  // Make a request call to grab the HTML body from the site of your choice
  request("https://www.worldrugby.org/sevens/news?lang=en", function(
    error,
    response,
    html
  ) {

    var $ = cheerio.load(html);


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
