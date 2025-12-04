/// <reference types="cypress" />

describe('Sign up Page - Conduit', () => {

  it('Verify elements using alternative commands (no should)', () => {

    cy.visit('https://demo.productionready.io/#/register');

    cy.get('a.navbar-brand')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).to.equal('conduit');
      });

    cy.contains('a.nav-link', 'Home')
      .invoke('attr', 'href')
      .then((href) => {
        expect(href).to.equal('#/');
      });

    cy.get('a.nav-link[href="#/login"]')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).to.equal('Sign in');
      });

    cy.get('a.nav-link[href="#/register"]')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).to.equal('Sign up');
      });

    cy.contains('h1', 'Sign up')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).to.equal('Sign up');
      });

    cy.contains('a', 'Have an account?')
      .invoke('attr', 'href')
      .then((href) => {
        expect(href).to.equal('#/login');
      });

    cy.get('input[placeholder="Username"]')
      .invoke('attr', 'type')
      .then((type) => {
        expect(type).to.equal('text');
      })
      .type('cypressUserX');

    cy.get('input[placeholder^="Email"]')
      .invoke('attr', 'type')
      .then((type) => {
        expect(type).to.equal('email');
      })
      .type('cy@test.com');

    cy.get('input[placeholder$="Password"]')
      .invoke('attr', 'type')
      .then((type) => {
        expect(type).to.equal('password');
      })
      .type('StrongPass123');

    cy.get('button[type="submit"]')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).to.equal('Sign up');
      })
      .click();

    cy.get('a.logo-font')
      .invoke('text')
      .then((text) => {
        expect(text.trim()).to.equal('conduit');
      });

    cy.get('span.attribution')
      .invoke('text')
      .then((text) => {
        expect(text).to.contain('An interactive learning project');
      });

  });

});
