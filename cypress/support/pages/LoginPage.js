class LoginPage {
  // Define all element selectors in one place
  elements = {
    usernameInput: () => cy.get('[data-test="username"]'),
    passwordInput: () => cy.get('[data-test="password"]'),
    loginButton: () => cy.get('[data-test="login-button"]'),
    errorMessage: () => cy.get('[data-test="error"]'),
  };

  // Actions
  visit() {
    cy.visit("https://www.saucedemo.com");
  }

  enterUsername(username) {
    this.elements.usernameInput().clear();
    // Only type if username is not empty
    if (username !== "") {
      this.elements.usernameInput().type(username);
    }
  }

  enterPassword(password) {
    this.elements.passwordInput().clear();
    // Only type if password is not empty
    if (password !== "") {
      this.elements.passwordInput().type(password);
    }
  }

  clickLogin() {
    this.elements.loginButton().click();
  }

  // Full login in one step
  login(username, password) {
    this.enterUsername(username);
    this.enterPassword(password);
    this.clickLogin();
  }

  getErrorMessage() {
    return this.elements.errorMessage();
  }
}

export default new LoginPage();