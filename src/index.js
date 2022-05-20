// const SelectedBooksView = require("./selectedBooksView");
// const SelectedBooksModel = require("./selectedBooksModel");
// const books = require("./bookObjects");
const express = require("express");
const app = express();
const port = 3000;
const hbs = require("express-handlebars");

// Routes to be set up for new pages
const routes = require('./routes/index');


// view engine setup
app.engine("hbs", hbs({extname: 'hbs', defaultLayout: 'layout', layoutDir: __dirname + '/views/layouts/'}));
app.set("view engine", "hbs");
app.set('views', path.join(__dirname, 'views'));




app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("main", { layout: "index" });
});

app.listen(port, () => console.log(`App listening to port ${port}`));

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
