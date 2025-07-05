/// <reference types="cypress"/>
describe('Guest User Product Review Submission', () => {
  const productUrl = 'https://magento.softwaretestingboard.com/radiant-tee.html';
  const timestamp = Date.now();
  
  it('Submits review as guest user', () => {
    // Visit product page
    cy.visit(productUrl);
    
    // Scroll to reviews section
    cy.get('#tab-label-reviews-title').scrollIntoView().click();
    
    // Generate unique review content
    const reviewData = {
      nickname: `UserKH_${timestamp}`,
      summary: `Auto-review ${timestamp}`,
      content: `Automated test review submitted by Cypress at ${new Date().toLocaleTimeString()}. Product met expectations!`
    };

    // Fill review form
    cy.get('#nickname_field').type(reviewData.nickname);
    cy.get('#summary_field').type(reviewData.summary);
    cy.get('#review_field').type(reviewData.content);
    
    // Select 5-star rating
    cy.get('input#Rating_5').check({ force: true });
    
    // Submit review
    cy.get('.action.submit.primary').click();
    
    // Verify success message
    cy.get('.message-success')
      .should('be.visible')
      .and('contain', 'You submitted your review for moderation.');
    
    // Verify form reset
    cy.get('#nickname_field').should('have.value', '');
    cy.get('#summary_field').should('have.value', '');
    cy.get('#review_field').should('have.value', '');
  });
});