const SelectedBooksView = require("./selectedBooksView");
const SelectedBooksModel = require("./selectedBooksModel");

const model = new SelectedBooksModel();

model.addBook('Example Book 1');
model.addBook("Example Book 2");
model.addBook("Example Book 3");
model.addBook("Example Book 4");
model.addBook("Example Book 5");
model.addBook("Example Book 6");

model.getBooks();

const view = new SelectedBooksView(model);
view.displayBooks();
