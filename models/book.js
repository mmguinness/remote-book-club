const mongoose = require("mongoose");
const imagePath = "images";
const path = require("path");
const moment = require("moment");

const BookSchema = new mongoose.Schema(
  {
    bookTitle: String,
    author: String,
    bookCover: {
      type: String,
      default: "placeholderBook.png",
    },
    description: {
      type: String,
      default: "Add description",
    },
    discussionDate: {
      type: String,
      default: "TBC",
    },
    reason: {
      type: String,
      default: "Give a reason why you think the group should read this title",
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    selected: false,
  },
  { timestamps: true }
);

BookSchema.virtual("imagePath").get(function () {
  if (this.image != null) {
    return path.join("/", imagePath, this.image);
  }
});

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
module.exports.imagePath = imagePath;