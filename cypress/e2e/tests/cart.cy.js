import LoginPage from "../../support/pages/LoginPage";
import CartPage from "../../support/pages/CartPage";

describe("Cart Tests", () => {
  beforeEach(() => {
    // Login before each test
    LoginPage.visit();
    cy.fixture("testdata").then((data) => {
      LoginPage.login(
        data.validUser.username,
        data.validUser.password
      );
      cy.url().should("include", "/inventory");
    });
  });

  it("Should add one item to cart", () => {
    cy.fixture("testdata").then((data) => {
      CartPage.addItemToCart(data.products.item1);
      // Cart badge should show 1
      CartPage.getCartCount().should("have.text", "1");
    });
  });

  it("Should add two items to cart", () => {
    cy.fixture("testdata").then((data) => {
      CartPage.addItemToCart(data.products.item1);
      CartPage.addItemToCart(data.products.item2);
      // Cart badge should show 2
      CartPage.getCartCount().should("have.text", "2");
    });
  });

  it("Should navigate to cart and see items", () => {
    cy.fixture("testdata").then((data) => {
      CartPage.addItemToCart(data.products.item1);
      CartPage.goToCart();
      // Should be on cart page
      cy.url().should("include", "/cart");
      // Item should be visible in cart
      CartPage.getCartItems()
        .should("be.visible")
        .and("contain", data.products.item1);
    });
  });

  it("✅ Should remove item from cart", () => {
    cy.fixture("testdata").then((data) => {
      CartPage.addItemToCart(data.products.item1);
      CartPage.goToCart();
      CartPage.removeItemFromCart(data.products.item1);
      // Cart badge should disappear
      cy.get('[data-test="shopping-cart-badge"]').should("not.exist");
    });
  });

  it("Should proceed to checkout", () => {
    cy.fixture("testdata").then((data) => {
      CartPage.addItemToCart(data.products.item1);
      CartPage.goToCart();
      CartPage.clickCheckout();
      // Should land on checkout page
      cy.url().should("include", "/checkout-step-one");
    });
  });
});