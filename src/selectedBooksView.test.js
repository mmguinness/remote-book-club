/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const SelectedBooksView = require("./selectedBooksView");
const SelectedBooksModel = require("./selectedBooksModel");

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
    model.addBook("Example Book - Example Author");
    model.addBook("Example Book - Example Author");

    view.displayBooks();
    const booksElements = document.getElementsByClassName(
      "books column is-2"
    );
    expect(booksElements.length).toEqual(2); 
    expect(booksElements[0].innerText).toEqual("Example Book - Example Author"); 
  })

  it("should update main display when you click on a book in the header", () => {
    const model = new SelectedBooksModel();
    const view = new SelectedBooksView(model);
    model.addBook("Example Book 1");
    model.addBook("Example Book 2");
    view.displayBooks();

    const mainTitleElement = document.getElementById("book-title-current");
    expect(mainTitleElement.innerHTML).toEqual("Select a book");

    const buttonElement = document.getElementById("Example Book 2");
    buttonElement.click();
    const revisedMainTitleElement = document.getElementById("book-title-current");
    expect(revisedMainTitleElement.innerText).toBe("Example Book 2");
  });

  });






  
