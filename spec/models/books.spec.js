var mongoose = require("mongoose");

require("../mongodb_helper");
var Book = require("../../models/book");
const User = require("../../models/user");
describe("Book model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.books.drop(() => {
      done();
    });
  });

  it("has the properties of a book", () => {
    const book = new Book({ bookTitle: "Example Book Title" });
    expect(book.bookTitle).toEqual("Example Book Title");
  });

  it("has a timestamp", async () => {
    const book = new Book({ bookTitle: "Example Book Title" });
    await book.save();
    const currentTime = new Date();
    expect(book.createdAt.setMilliseconds(0)).toEqual(
      currentTime.setMilliseconds(0)
    );
  });

  it("has a user assigned to the book", async () => {
    const user = new User({
      userName: "username",
      email: "email",
      password: "password",
    });
    await user.save();

    const book = new Book({
      bookTitle: "Example Book Title",
      user: user._id,
    });
    await book.save();

    expect(book.user).toEqual(user._id);
  });

    it("can save a book", async () => {
      const book = new Book({ bookTitle: "Example Book Title" });
      await book.save();
      let books = await Book.find();

      expect(books[0].bookTitle).toEqual("Example Book Title");
    });

  it("can list all books", async () => {
    const bookOne = new Book({ bookTitle: "Example Book Title One" });
    await bookOne.save();
    const bookTwo = new Book({ bookTitle: "Example Book Title Two" });
    await bookTwo.save();
    let books = await Book.find();
    expect(books.length).toEqual(2);
  });

});
