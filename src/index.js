const SelectedBooksView = require("./selectedBooksView");
const SelectedBooksModel = require("./selectedBooksModel");
const books = require("./bookObjects");

const model = new SelectedBooksModel();

model.addBook(books[0]);
model.addBook(books[1]);
model.addBook(books[2]);
model.addBook(books[3]);
model.addBook(books[4]);
model.addBook(books[5]);

model.getBooks();

const view = new SelectedBooksView(model);
view.displayBooks();
