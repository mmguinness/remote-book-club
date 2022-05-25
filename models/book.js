const mongoose = require("mongoose");
const moment = require("moment");

const BookSchema = new mongoose.Schema(
  {
    message: String,
    bookTitle: String,
    author: String,
    bookCover: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

BookSchema.virtual("timeFormat").get(function () {
  const today = new Date();

  if (
    moment(this.createdAt).format("DD MMMM") === moment(today).format("DD MMMM")
  ) {
    return moment(this.createdAt).fromNow();
  } else {
    const formatedDate = moment(this.createdAt).format("DD MMMM");
    const formatedTime = moment(this.createdAt).format("HH:MM");
    return `${formatedDate} at ${formatedTime}`;
  }
});


const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
