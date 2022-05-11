/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const SelectedBooksView = require("./selectedBooksView");

describe("selectedBooksView", () => {
  
  it("should display one book on the page", () => {
    document.body.innerHTML = fs.readFileSync("./index.html");
    const view = new SelectedBooksView();

    view.displayBooks(["Kitchen"]);
    
    const booksElements = document.querySelectorAll("div.books");
    expect(booksElements.length).toEqual(1); 
    expect(booksElements[0].innerText).toEqual("Kitchen"); 

  })

  });



// const fs = require("fs");
// const View = require("./selectedBooksView");

// describe("selectedBooksView", () => {

//   beforeEach(() => {
//     document.body.innerHTML = fs.readFileSync("./index.html"); 
//   })

//   it("displays website title", () => {
//     const view = new View();
//     const title = document.querySelector("h1").innerText;
//     console.log(title);
//     expect(title).toEqual("RBC");
//   });
  
// });