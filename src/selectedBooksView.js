class SelectedBooksView {
  constructor(model) {
    this.model = model;
    this.mainContainerEl = document.querySelector("#main-container");
  }

  displayBooks() {
    const books = this.model.getBooks();

    books.reverse();

    books.forEach((book) => {
      const newElement = document.createElement("image");
      newElement.className = "image books column is-2";
      newElement.innerText = book.name;
      newElement.id = book.id;
      newElement.src = book.image;
      document.querySelector("#main-container").append(newElement);

      newElement.addEventListener("click", () => {
        const bookTitle = newElement.innerText;
        const currentTitleElement = document.querySelector(
          "#book-title-current"
        );
        currentTitleElement.innerText = bookTitle;

        const bookAuthorName = book.author_name;
        const currentAuthorName = document.querySelector(
          "#author-name-current"
        );
        currentAuthorName.innerText = bookAuthorName;

        const bookDiscussionDate = book.discussion_date;
        const currentSDiscussionDate = document.querySelector(
          "#discussion-date-current"
        );
        currentSDiscussionDate.innerText = bookDiscussionDate;

        const bookDescription = book.description;
        const currentDescription = document.querySelector(
          "#description-current"
        );
        currentDescription.innerText = bookDescription;
      });
    });
  }
}

module.exports = SelectedBooksView;
