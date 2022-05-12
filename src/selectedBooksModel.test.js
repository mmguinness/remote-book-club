const SelectedBooksModel = require('./selectedBooksModel');

describe('SelectedBooks model class', () => {
  it('starts with no books', () => {
    const books = new SelectedBooksModel();

    expect(books.getBooks()).toEqual([]);
  });

  it("adds a books", () => {
    const books = new SelectedBooksModel();
    books.addBook("Example Book - Example Author");

    expect(books.getBooks()).toEqual(["Example Book - Example Author"]);
  });

});