describe('Product Comparison Test', () => {
  it('Successfully adds products to comparison list', () => {
    // Add Radiant Tee to comparison
    cy.visit('https://magento.softwaretestingboard.com/radiant-tee.html');
    
    // Universal button click with multiple fallbacks
    cy.get('body').then(($body) => {
      const selectors = [
        '.action.tocompare', 
        '[title="Add to Compare"]',
        'a:contains("Add to Compare")',
        'button:contains("Add to Compare")'
      ];
      
      let found = false;
      
      // Try all selectors until one works
      for (const selector of selectors) {
        if ($body.find(selector).length > 0) {
          found = true;
          cy.get(selector).first()
            .scrollIntoView()
            .click({ force: true });
          break;
        }
      }
      
      // Final fallback if no selectors match
      if (!found) {
        cy.get('a, button').contains('Add to Compare').click({ force: true });
      }
    });

    // Verify success message with flexible check
    cy.get('.message-success, .messages')
      .should('be.visible')
      .and('contain', 'comparison list');

    // Add Breathe-Easy Tank to comparison
    cy.visit('https://magento.softwaretestingboard.com/breathe-easy-tank.html');
    
    // Direct text-based approach with retry
    cy.contains('Add to Compare', { timeout: 10000 })
      .should('be.visible')
      .then($btn => {
        if ($btn.is(':visible')) {
          cy.wrap($btn).click({ force: true });
        } else {
          cy.get('body').scrollTo('bottom');
          cy.wrap($btn).click({ force: true });
        }
      });

    // Navigate to comparison using multiple possible methods
    cy.get('body').then($body => {
      if ($body.find('a:contains("comparison list")').length) {
        cy.contains('a', 'comparison list').click();
      } else if ($body.find('.action.compare').length) {
        cy.get('.action.compare').click();
      } else {
        cy.visit('/catalog/product_compare/');
      }
    });

    // Verify both products in comparison
    cy.get('.product-item-name', { timeout: 10000 })
      .should(($items) => {
        expect($items).to.have.length.gte(2);
        const names = $items.map((i, el) => el.innerText).get();
        expect(names).to.include('Radiant Tee');
        expect(names).to.include('Breathe-Easy Tank');
      });
  });
});
