# QA Automation Project 

An advanced end-to-end test automation framework built with Cypress, following the Page Object Model (POM) design pattern.

## Tech Stack
- **Cypress** v15 - E2E Testing Framework
- **JavaScript** - Programming Language
- **Mochawesome** - HTML Test Reporter
- **Page Object Model** - Design Pattern

## Project Structure

qa-automation-project/
├── cypress/
│   ├── e2e/
│   │   └── tests/
│   │       ├── login.cy.js       # Login test cases
│   │       └── cart.cy.js        # Cart test cases
│   ├── support/
│   │   └── pages/
│   │       ├── LoginPage.js      # Login page object
│   │       └── CartPage.js       # Cart page object
│   └── fixtures/
│       └── testdata.json         # Test data
├── cypress.config.js             # Cypress configuration
└── package.json                  # Project dependencies
```

## Test Cases

### Login Tests (4 tests)
- ✅ Should login successfully with valid credentials
- ✅ Should show error with invalid credentials
- ✅ Should show error when username is empty
- ✅ Should show error when password is empty

### Cart Tests (5 tests)
- ✅ Should add one item to cart
- ✅ Should add two items to cart
- ✅ Should navigate to cart and see items
- ✅ Should remove item from cart
- ✅ Should proceed to checkout

##  How to Run

### Install dependencies
```bash
npm install
```

### Open Cypress UI (watch tests run live)
```bash
npm run cy:open
```

### Run all tests headlessly
```bash
npm run cy:run
```

### Run specific test suites
```bash
npm run cy:run:login
npm run cy:run:cart
```

### Generate HTML Report
npx mochawesome-merge cypress/reports/*.json > cypress/reports/final-report.json && npx marge cypress/reports/final-report.json --reportDir cypress/reports/html --inline

## Reporting
- Screenshots captured automatically on test failure
- Video recording of all test runs
- Mochawesome HTML reports generated after each run

##  Application Under Test
[Sauce Demo](https://www.saucedemo.com) - A practice e-commerce application

