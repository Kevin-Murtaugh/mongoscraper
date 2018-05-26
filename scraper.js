
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
        articleTitle: title,
        articleURL: "https://www.worldrugby.org" + URL,
        articleSummary: summary
      });
      // console.log(results);

    });
    callback(results);

  });
}

// scraper(function(results) {
//   console.log(results);
// });
module.exports = scraper;
