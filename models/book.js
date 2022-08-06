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

BookSchema.virtual("formattedDate").get(function () {
  if (this.discussionDate != "TBC") {
    const formattedDate = moment(this.discussionDate).format("MMMM");
    return `${formattedDate}`;
  }
});

BookSchema.virtual("imagePath").get(function () {
  if (this.image != null) {
    return path.join("/", imagePath, this.image);
  }
});

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
module.exports.imagePath = imagePath;