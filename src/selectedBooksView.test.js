/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const SelectedBooksView = require("./selectedBooksView");

describe("selectedBooksView", () => {

  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync("./index.html");
  });
  
  it("displays website title", () => {
    const titleElement = document.querySelector("h1");
    expect(titleElement.innerHTML).toEqual("RBC");
  });

  it("should display one book on the page", () => {
    const view = new SelectedBooksView();
    view.displayBooks(["Example Book - Example Author"]);
    const booksElements = document.querySelectorAll("div.books");
    expect(booksElements.length).toEqual(1); 
    expect(booksElements[0].innerText).toEqual("Example Book - Example Author"); 
  })

  });






  
