var express = require("express");
var mongojs = require("mongojs");


function dbAddRecord (newDBRecord){
    var CheckArticle = newDBRecord.articleURL;

// find each person with a last name matching 'Ghost', selecting the `name` and `occupation` fields
Person.findOne({ newDBRecord.articleURL }, 'articleURL', function (err, person) {
  if (!err) return handleError(err);

  //duplicate article
  
    console.log("confirmed new article");
    db.scraper.scrapeddata = 
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


//     var mongoose = require("mongoose");

// // Save a reference to the Schema constructor
// var Schema = mongoose.Schema;

// // Using the Schema constructor, create a new NoteSchema object
// // This is similar to a Sequelize model
// var articleSchema = new Schema({
//   // `title` must be of type String
//   articleTitle: String,
//   // `body` must be of type String
//   articleURL: String,
//   articleSummary: String,
//   articleKey: Integer
// });


// // This creates our model from the above schema, using mongoose's model method
// var Article = mongoose.model("Article", articleSchema);

// // Export the Note model
// module.exports = Article;