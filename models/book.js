const mongoose = require("mongoose");

const books = new mongoose.Schema(
  {
    name: String,
    author_name: String,
    image: String,
    iscussion_date: String,
    description: String,
  },
  { timestamps: true }
);

const BookData = mongoose.model("BookData", books);

module.exports = BookData;
