// Using this template, the cheerio documentation,
// and what you've learned in class so far, scrape a website
// of your choice, save information from the page in a result array, and log it to the console.

var cheerio = require("cheerio");
var request = require("request");

// Make a request call to grab the HTML body from the site of your choice
request("http://kuklaskorner.com/weblog/results/84b4efad0980e93146477cdb13ef0814", function(error, response, html) {

  // Load the HTML into cheerio and save it to a variable
  // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
  var $ = cheerio.load(html);

  // An empty array to save the data that we'll scrape
  var results = [];

  // Select each element in the HTML body from which you want information.
  // NOTE: Cheerio selectors function similarly to jQuery's selectors,
  // but be sure to visit the package's npm page to see how it works;;
 $("h2").each(function(i, element) {

  // });
  
  //$("b").each(function(i, element) {npm 
//      var title = $(element).children().text();
    var title = $(element).find("a").text();
    var URL = $(element).find("a").attr("href");
    var summary = $(element).next("p").text();
 //   var summary = $(element).children().attr("blockquote");
    // var link = $(element).children().attr("href");
    // var filler = $(element).children().attr("href");
    // var team = $(element).children().attr("infoMeta.href.href");
//    var team = $(element).children().attr("tags");
// });

    // Save these results in an object that we'll push into the results array we defined earlier
    results.push({
//        toptest: toptest,
     title: title,
//      test: test,
      URL : URL,
      summary: summary
    });
  });

  // Log the results once you've looped through each of the elements found with cheerio
  console.log(results);
});
