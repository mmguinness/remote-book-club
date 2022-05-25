const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  bookTitle: String,
  author: String,
  bookCover: String,
});

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
