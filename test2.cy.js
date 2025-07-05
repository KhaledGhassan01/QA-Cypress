/// <reference types="cypress"/>

describe('Wishlist Functionality Test', () => {
  const credentials = {
    email: 'userguest@gmail.com',
    password: 'User@123'
  };
  
  const productUrl = 'https://magento.softwaretestingboard.com/radiant-tee.html';
  const productName = 'Radiant Tee';

  beforeEach(() => {
    // Visit login page
    cy.visit('https://magento.softwaretestingboard.com/customer/account/login');
    
    // Login with provided credentials
    cy.get('#email').type(credentials.email);
    cy.get('#pass').type(credentials.password);
    cy.get('#send2').click();
    
    // Verify successful login
    cy.get('.greet.welcome').should('contain', 'Welcome');
    cy.visit(productUrl);
  });

  it('Adds product to wishlist and verifies', () => {
    // Add to wishlist using more reliable selector
    cy.get('[data-action="add-to-wishlist"]').first().click();

    // Verify success message
    cy.get('.message-success', { timeout: 10000 })
      .should('be.visible')
      .and('contain', `${productName} has been added to your Wish List`);

    // Go directly to wishlist page
    cy.visit('https://magento.softwaretestingboard.com/wishlist/');

    // Verify product in wishlist
    cy.get('.product-item-name', { timeout: 8000 })
      .should('be.visible')
      .and('contain', productName);
    
    // Verify wishlist persistence
    cy.reload();
    cy.get('.product-item-name').should('contain', productName);
  });

});