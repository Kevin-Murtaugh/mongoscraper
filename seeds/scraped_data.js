const scraper = require("../scraper");
var mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/kevin_scraper")
  .then(() => console.log(`Database connection successful`));

const Article = require("../models/article");

scraper(function(results) {
  Article.collection.insert(results);
  // console.log(results);
  // console.log("One");
});
