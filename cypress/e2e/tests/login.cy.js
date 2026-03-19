import LoginPage from "../../support/pages/LoginPage";

describe("Login Tests", () => {
  beforeEach(() => {
    // Runs before each test - visits the login page
    LoginPage.visit();
  });

  it("Should login successfully with valid credentials", () => {
    cy.fixture("testdata").then((data) => {
      LoginPage.login(
        data.validUser.username,
        data.validUser.password
      );
      // After login we should land on inventory page
      cy.url().should("include", "/inventory");
      cy.get('[data-test="inventory-container"]').should("be.visible");
    });
  });

  it("❌ Should show error with invalid credentials", () => {
    cy.fixture("testdata").then((data) => {
      LoginPage.login(
        data.invalidUser.username,
        data.invalidUser.password
      );
      // Error message should appear
      LoginPage.getErrorMessage()
        .should("be.visible")
        .and("contain", "Username and password do not match");
    });
  });

  it("Should show error when username is empty", () => {
    LoginPage.login("", "secret_sauce");
    LoginPage.getErrorMessage()
      .should("be.visible")
      .and("contain", "Username is required");
  });

  it(" Should show error when password is empty", () => {
    LoginPage.login("standard_user", "");
    LoginPage.getErrorMessage()
      .should("be.visible")
      .and("contain", "Password is required");
  });
});