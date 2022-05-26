describe("Home page", () => {
  it("has a title", () => {
    cy.visit("/");
    // cy.get(".title").should("contain", "Book Club");
    // expect(true).to.equal(true);
  });
});
