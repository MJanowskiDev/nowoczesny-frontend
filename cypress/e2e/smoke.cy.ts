export {};
describe("empty spec", () => {
  it("passes", () => {
    cy.visit("/");
    cy.get('a[href="/sign-in"]').click();
    cy.get('input[id="identifier-field"]').type("xcfmwyrtjfmiyrtfqi@tmmwj.net");
    cy.get(`button[data-localization-key="formButtonPrimary"]`).click();
    cy.get(`input[id="password-field"]`).type("CypressIsAKingNo1!!");
    cy.get(`button[data-localization-key="formButtonPrimary"]`).click();

    cy.url().should("eq", "http://localhost:3000/");

    cy.getCookie("__session").should("exist")
    //  .then((c) => {
    //    cy.get('a[href="/products-ssg/1"]').first().click();
    //  });
    //cy.visit("/products-ssg/1");
    //cy.get(".flex-wrap > :nth-child(2)")
     // .contains("Add to Cart")
     // .first()
     // .click();

    //cy.get('a[href="/cart"]').first().click();
    //cy.url().should("eq", "http://localhost:3000/cart");
    //cy.get('a[href="/checkout"]').first().click();
    //cy.url().should("eq", "http://localhost:3000/checkout");

    //cy.get(`input[id="firstName"]`).type("MrCypress");
    //cy.get(`input[id="lastName"]`).type("Tester");
    //cy.get(`input[id="phone"]`).type("123456789");
    //cy.get(`input[id="streetAddres"]`).type("Address 123/1");
    //cy.get(`input[id="city"]`).type("City");
    //cy.get(`input[id="postalCode"]`).type("12-345");
    // cy.get("button").contains("Proceed").click();

    // console.log("Test \n\n\n\n\n\n\n");
    // cy.url().should("contain", "checkout.stripe.com/c/pay").as("checkout-test");
    // cy.wait("@checkout-test");
    // cy.get(`input[id="email"]`).type("xcfmwyrtjfmiyrtfqi@tmmwj.net");
    // console.log("Test after \n\n\n\n\n\n\n");
  });
});

// CypressIsAKingNo1!!
// xcfmwyrtjfmiyrtfqi@tmmwj.net
