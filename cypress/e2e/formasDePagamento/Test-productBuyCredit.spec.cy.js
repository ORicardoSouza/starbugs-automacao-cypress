describe('Cartão de Crédito', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  context('Pagamento Via Cartão de Crédito', () => {
       it('Comprar Expresso Tradicional', () => {
      cy.selectProduct('Expresso Tradicional')
      cy.deliveryAddress()
      cy.selectPaymentType(`Cartão de Crédito`)
      cy.confirmOrder(`Cartão de Crédito`)
    });
    it('Comprar Expresso Americano', () => {
      cy.selectProduct('Expresso Americano')
      cy.deliveryAddress()
      cy.selectPaymentType(`Cartão de Crédito`)
      cy.confirmOrder(`Cartão de Crédito`)
    });
    it('Validar pedido de produto Expresso Cremoso indisponível', () => {
      cy.selectProduct('Expresso Cremoso')
      cy.get('.swal2-popup').should('exist')
      cy.get('.swal2-confirm').click({ force: true })
    });
    it('Comprar Expresso Gelado', () => {
      cy.selectProduct('Expresso Gelado')
      cy.deliveryAddress()
      cy.selectPaymentType(`Cartão de Crédito`)
      cy.confirmOrder(`Cartão de Crédito`)
    });
    it('Comprar Café com Leite', () => {
      cy.selectProduct('Café com Leite')
      cy.deliveryAddress()
      cy.selectPaymentType(`Cartão de Crédito`)
      cy.confirmOrder(`Cartão de Crédito`)
    });
    it('Comprar Latte', () => {
      cy.selectProduct('Latte')
      cy.deliveryAddress()
      cy.selectPaymentType(`Cartão de Crédito`)
      cy.confirmOrder(`Cartão de Crédito`)
    });
    it('Comprar Capuccino', () => {
      cy.selectProduct('Capuccino')
      cy.deliveryAddress()
      cy.selectPaymentType(`Cartão de Crédito`)
      cy.confirmOrder(`Cartão de Crédito`)
    });
    it('Comprar Macchiato', () => {
      cy.selectProduct('Macchiato')
      cy.deliveryAddress()
      cy.selectPaymentType(`Cartão de Crédito`)
      cy.confirmOrder(`Cartão de Crédito`)
    });
  });
});
