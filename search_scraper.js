const cheerio = require("cheerio");
const phantom = require("phantom");
const fs = require("fs");

const searchScraper = (searchTerm, callback) => {
  const results = [];
  const term = searchTerm.split(" ").join("+");
  const url = `https://www.worldrugby.org/search?s=${term}`;
  request(url, function(html) {
    const $ = cheerio.load(html);
    $(".article-wrap-link").each(function(i, element) {
      let articleTitle = $(this)
        .find("figcaption a")
        .text();

      let articleURL = "https://www.worldrugby.org";
      articleURL += $(this)
        .find("figcaption a")
        .attr().href;

      let articleSummary = $(this)
        .find("figcaption p")
        .text();

      results.push({ articleTitle, articleURL, articleSummary });
    });
    callback(results);
  });
};

const request = (url, callback) => {
  phantom.create().then(function(ph) {
    ph.createPage().then(function(page) {
      page.open(url).then(function(status) {
        page.property("content").then(function(content) {
          callback(content);
          page.close();
          ph.exit();
        });
      });
    });
  });
};

module.exports = searchScraper;
