/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const SelectedBooksView = require("./selectedBooksView");
const SelectedBooksModel = require("./selectedBooksModel");
const books = require("./bookObjects");

describe("selectedBooksView", () => {

  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync("./index.html");
  });
  
  it("displays website title", () => {
    const titleElement = document.querySelector("h1");
    expect(titleElement.innerHTML).toEqual("RBC");
  });

  it("should display two books on the page header", () => {
    const model = new SelectedBooksModel();
    const view = new SelectedBooksView(model);
    let exampleBookOne = { id: 1, name: "Example Book One - Example Author" };
    let exampleBookTwo = { id: 2, name: "Example Book Two - Example Author" };
    model.addBook(exampleBookOne);
    model.addBook(exampleBookTwo);

    view.displayBooks();
    const booksElements = document.getElementsByClassName(
      "books column is-2"
    );
    expect(booksElements.length).toEqual(2); 
    expect(booksElements[1].innerText).toEqual("Example Book One - Example Author"); 
  })

  it("should update main display when you click on a book in the header", () => {
    const model = new SelectedBooksModel();
    const view = new SelectedBooksView(model);
    let exampleBookOne = { id: 1, name: "Example Book One - Example Author" };
    let exampleBookTwo = { id: 2, name: "Example Book Two - Example Author" };
    model.addBook(exampleBookOne);
    model.addBook(exampleBookTwo);
    view.displayBooks();

    const mainTitleElement = document.getElementById("book-title-current");
    expect(mainTitleElement.innerHTML).toEqual("Select a book");
    const buttonElements = document.getElementsByClassName("books column is-2");
    const buttonElement = buttonElements[0];
    buttonElement.click();
    const revisedMainTitleElement = document.getElementById("book-title-current");
    expect(revisedMainTitleElement.innerText).not.toBe("Select a book");
  });

  });






  
