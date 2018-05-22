var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model
var articleSchema = new Schema({
  // `title` must be of type String
  articleID: {
    type: String,
    required: true
  },
  articleTitle: {
    type: String,
    required: true
  },
  articleURL: {
    type: String,
    unique: true,
    required: true
  },
  articleSummary: {
    type: Integer,
    required: true
  }
});

// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", articleSchema);

// Export the Note model
module.exports = Article;