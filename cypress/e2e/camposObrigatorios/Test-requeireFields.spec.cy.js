describe('Teste de Via Cartão de Crédito', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  context('Pagamento Via Cartão de Crédito', () => {
       it('Comprar Expresso Tradicional', () => {
      cy.selectProduct('Expresso Tradicional')
      cy.deliveryAddressRequire()
    
    });
    
  });
});
