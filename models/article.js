const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  articleTitle: String,
  articleURL: String,
  articleSummary: String
});

module.exports = Article = mongoose.model("articles", ArticleSchema);
