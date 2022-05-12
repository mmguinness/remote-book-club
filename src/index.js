const SelectedBooksView = require("./selectedBooksView");
const SelectedBooksModel = require("./selectedBooksModel");

const model = new SelectedBooksModel();

model.addBook('Example Book');
model.addBook("Example Book");
model.addBook("Example Book");
model.getBooks();

const view = new SelectedBooksView(model);
view.displayBooks();
