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

  });






  
