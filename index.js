const express = require("express");
const path = require("path");
const app = express();
const homeRouter = require("./routes/home");
// const historyRouter = require("./routes/history")
const hbshelpers = require("handlebars-helpers")();
const hbs = require("hbs");

hbs.registerHelper(hbshelpers);

// view engine setup
app.set("view engine", "hbs");
app.set('views', path.join(__dirname, 'views'));

// route setup
app.use("/", homeRouter);
// app.use("/history", historyRouter);
app.use(express.static(__dirname + "/images")); 
app.use("/bulma", express.static(__dirname + "/node_modules/bulma/css/"));

app.listen(3000);

module.exports = app;
