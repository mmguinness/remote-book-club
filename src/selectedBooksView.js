class SelectedBooksView {
  constructor(model) {
    this.model = model;
    this.mainContainerEl = document.querySelector("#main-container");
  }

  displayBooks() {

    const books = this.model.getBooks();

    books.reverse();

    books.forEach((book) => {
      const newElement = document.createElement("button");
      newElement.className = "books column is-2 button";
      newElement.innerText = book.name;
      newElement.id = book;
      document.querySelector("#main-container").append(newElement);

      newElement.addEventListener('click', () => {
        const bookTitle = newElement.innerText;
        const currentTitleElement = document.querySelector("#book-title-current");
        currentTitleElement.innerText = bookTitle;
      })

    });

  }
}

module.exports = SelectedBooksView;
