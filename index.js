const express = require("express");
const path = require("path");
const app = express();
const homeRouter = require("./routes/home");
const historyRouter = require("./routes/history");
const booksRouter = require("./routes/books");
const usersRouter = require("./routes/users");
const hbshelpers = require("handlebars-helpers")();
const hbs = require("hbs");

hbs.registerHelper(hbshelpers);

// view engine setup
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());

// route setup
app.use("/", homeRouter);
app.use("/history", historyRouter);
app.use("/users", usersRouter);
app.use("/books", booksRouter);
app.use(express.json());

app.use(express.static(__dirname + "/images"));
app.use("/bulma", express.static(__dirname + "/node_modules/bulma/css/"));


module.exports = app;
