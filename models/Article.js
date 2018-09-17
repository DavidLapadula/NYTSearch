const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: { 
    type: String, 
    unique: true, 
    required: true, 
    dropDups: true, 
  },
  url: { type: String, required: true },
  date: { type: String, required: true }, 
  savedDate: {type: String}
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;