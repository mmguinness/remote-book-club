// const SelectedBooksView = require("./selectedBooksView");
// const SelectedBooksModel = require("./selectedBooksModel");
// const books = require("./bookObjects");
const express = require("express");
const path = require("path");
const app = express();
const homeRouter = require("./routes/home");
const hbshelpers = require("handlebars-helpers")();
const hbs = require("hbs");

hbs.registerHelper(hbshelpers);

// view engine setup
app.set("view engine", "hbs");
app.set('views', path.join(__dirname, 'views'));

// route setup
app.use("/", homeRouter);

app.listen(3000);

// const model = new SelectedBooksModel();

// model.addBook(books[0]);
// model.addBook(books[1]);
// model.addBook(books[2]);
// model.addBook(books[3]);
// model.addBook(books[4]);
// model.addBook(books[5]);

// model.getBooks();

// const view = new SelectedBooksView(model);
// view.displayBooks();

module.exports = app;
