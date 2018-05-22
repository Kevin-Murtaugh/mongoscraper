// Using this template, the cheerio documentation,
// and what you've learned in class so far, scrape a website
// of your choice, save information from the page in a result array, and log it to the console.
var cheerio = require("cheerio");
var request = require("request");

function scraper(callback) {
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
        articleTitle: title,
        articleURL: "https://www.worldrugby.org" + URL,
        articleSummary: summary
      });
      // console.log(results);

      // dbAddRecord(results);
    });
    callback(results);
    // Log the results once you've looped through each of the elements found with cheerio
  });
}

// scraper(function(results) {
//   console.log(results);
// });
module.exports = scraper;
