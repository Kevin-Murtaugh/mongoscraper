let cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");

// https://www.nytimes.com/search?endDate=20180430&query=trump&sort=best&startDate=20180401&endDate=20180430

// BOTH START DATE AND END DATE SPECIFIED
// https://www.nytimes.com/search?endDate=20180228&query=california&sort=best&startDate=20170801

//  ONLY START DATE

// ONLY END DATE

const nytimes_scraper = (searchterm, callback) => {
  const results = [];
  // const url = `https://www.nytimes.com/search?query=${searchterm}`;

  let url = `https://www.nytimes.com/search?&query=${searchterm}`;

  request(url, function(error, response, html) {
    const $ = cheerio.load(html);
    $("li.SearchResults-item--3k02W").each(function(i, element) {
      let title = $(this)
        .find("h4.Item-headline--3WqlT")
        .text();

      let link = $(this)
        .find("a")
        .attr("href");

      let summary = $(this)
        .find("p.Item-summary--3nKWX")
        .text();

      link = `https://www.nytimes.com${link}`;

      results.push({
        articleTitle: title,
        articleURL: link,
        articleSummary: summary
      });
    });
    callback(results);
  });
};

// nytimes_scraper("trump", results => {
//   console.log(results);
// });

module.exports = nytimes_scraper;
