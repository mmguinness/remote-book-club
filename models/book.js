const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    name: String,
    author_name: String,
    image: String,
    iscussion_date: String,
    description: String,
  },
  { timestamps: true }
);

const BookData = mongoose.model("BookData", BookSchema);

module.exports = BookData;
