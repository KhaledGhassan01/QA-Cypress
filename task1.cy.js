/// <reference types="cypress"/>

describe('Registration Page - Selector Tests', () => {
      beforeEach(() => {
    cy.visit('https://demo.productionready.io/#/register');
  });
  it('should select username input using data-testid attribute selector', () => {
    cy.get('input[placeholder="Username"]').should('exist').type('UserKhaled');
  });
  it('should select email input using attribute selector', () => {
    cy.get('input[type="email"]').should('exist').type('user123@test.com');
  });
  it('should select password input using :nth-of-type pseudo-class selector', () => {
    cy.get('input[type="password"]').should('exist').type('User@123');
  });
  it('should select sign up button using button text selector', () => {
    cy.contains('button', 'Sign up').should('exist').click();
  });
  it('should select checkbox for terms acceptance using adjacent sibling selector', () => {
    cy.get('input[type="checkbox"]').should('exist').check({ force: true });
  });
  it('should select error message container using class selector', () => {
    cy.get('.error-messages').should('exist');
  });

});
