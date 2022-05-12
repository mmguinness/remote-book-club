const SelectedBooksView = require("./selectedBooksView");
// const SelectedBooksModel = require("./selectedBooksModel")
const view = new SelectedBooksView();
// const model = new SelectedBooksModel();

view.displayBooks(["Girl, Woman, Other - Bernardine Evaristo"]);
view.displayBooks(["Beautiful world, where are you - Sally Rooney"]);
view.displayBooks([
  "Why I no longer talk to white people about race - Reni Eddo-Lodge",
]);
view.displayBooks(["Kitchen - Banana Yoshimoto"]);
view.displayBooks(["Americanah - Chimamanda Ngozi Adichie"]);
