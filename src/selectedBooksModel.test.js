const SelectedBooksModel = require('./selectedBooksModel');

describe('SelectedBooks model class', () => {
  it('starts with no books', () => {
    const books = new SelectedBooksModel();

    expect(books.getBooks()).toEqual([]);
  });

  it("adds a books", () => {
    const books = new SelectedBooksModel();
    books.addBook("Crying in H Mart");

    expect(books.getBooks()).toEqual(["Crying in H Mart"]);
  });

});