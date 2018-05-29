var express = require("express");
var mongojs = require("mongojs");


function dbAddRecord (newDBRecord){
    var CheckArticle = newDBRecord.articleURL;

// find each person with a last name matching 'Ghost', selecting the `name` and `occupation` fields
Person.findOne({ newDBRecord.articleURL }, 'articleURL', function (err, person) {
  if (!err) return handleError(err);

  //duplicate article
  
    console.log("confirmed new article");
    db.scraper.scrapeddata = newDBRecord;
});
   findOne()
}

// add to collection
db.scrapedData.insert( 
    { 
        articleTitle: String,
        articleURL: String,
        articleSummary: String,
        articleCommentKey: Number
});

db.scrapedData.update( 
    { 
        articleTitle: String,
        articleURL: String,
        articleSummary: String,
        articleCommentKey: Number
});

