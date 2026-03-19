class CartPage {
  // Define all element selectors in one place
  elements = {
    productItem: (name) => cy.contains('[data-test="inventory-item-name"]', name),
    addToCartButton: (name) =>
      cy.contains('[data-test="inventory-item-name"]', name)
        .parents(".inventory_item")
        .find("button"),
    cartIcon: () => cy.get('[data-test="shopping-cart-link"]'),
    cartCount: () => cy.get('[data-test="shopping-cart-badge"]'),
    cartItems: () => cy.get('[data-test="inventory-item-name"]'),
    removeButton: (name) =>
      cy.contains('[data-test="inventory-item-name"]', name)
        .parents(".cart_item")
        .find("button"),
    checkoutButton: () => cy.get('[data-test="checkout"]'),
    continueShoppingButton: () => cy.get('[data-test="continue-shopping"]'),
  };

  // Actions
  addItemToCart(itemName) {
    this.elements.addToCartButton(itemName).click();
  }

  goToCart() {
    this.elements.cartIcon().click();
  }

  getCartCount() {
    return this.elements.cartCount();
  }

  getCartItems() {
    return this.elements.cartItems();
  }

  removeItemFromCart(itemName) {
    this.elements.removeButton(itemName).click();
  }

  clickCheckout() {
    this.elements.checkoutButton().click();
  }

  continueShopping() {
    this.elements.continueShoppingButton().click();
  }
}

export default new CartPage();