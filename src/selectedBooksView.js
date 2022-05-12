class SelectedBooksView {
  constructor(model) {
    this.model = model;
    this.mainContainerEl = document.querySelector("#main-container");
  }

  displayBooks() {

    const books = this.model.getBooks();

    books.reverse();

    books.forEach((book) => {
      const newElement = document.createElement("div");
      newElement.className = "books column is-2";
      newElement.innerText = book;
      document.querySelector("#main-container").append(newElement);
    });
  }
}

module.exports = SelectedBooksView;
