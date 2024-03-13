describe('Cartão de Débito', () => {
  beforeEach(() => {
    cy.visit('/');
  }); 
  context('Pagamento Via Cartão de Débito', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('Comprar Expresso Tradicional', () => {
      cy.selectProduct('Expresso Tradicional')
      cy.deliveryAddress()
      cy.selectPaymentType(`Cartão de Débito`)
      cy.confirmOrder(`Cartão de Débito`)

    });

    it('Comprar Expresso Americano', () => {
      cy.selectProduct('Expresso Americano')
      cy.deliveryAddress()
      cy.selectPaymentType(`Cartão de Débito`)
      cy.confirmOrder(`Cartão de Débito`)

    });

    it('Validar pedido de produto Expresso Cremoso indisponível', () => {
      cy.selectProduct('Expresso Cremoso')
      cy.get('.swal2-popup').should('exist')
      cy.get('.swal2-confirm').click({ force: true })
    });

    it('Comprar Expresso Gelado', () => {
      cy.selectProduct('Expresso Gelado')
      cy.deliveryAddress()
      cy.selectPaymentType(`Cartão de Débito`)
      cy.confirmOrder(`Cartão de Débito`)

    });

    it('Comprar Café com Leite', () => {
      cy.selectProduct('Café com Leite')
      cy.deliveryAddress()
      cy.selectPaymentType(`Cartão de Débito`)
      cy.confirmOrder(`Cartão de Débito`)

    });

    it('Comprar Latte', () => {
      cy.selectProduct('Latte')
      cy.deliveryAddress()
      cy.selectPaymentType(`Cartão de Débito`)
      cy.confirmOrder(`Cartão de Débito`)

    });

    it('Comprar Capuccino', () => {
      cy.selectProduct('Capuccino')
      cy.deliveryAddress()
      cy.selectPaymentType(`Cartão de Débito`)
      cy.confirmOrder(`Cartão de Débito`)

    });

    it('Comprar Macchiato', () => {
      cy.selectProduct('Macchiato')
      cy.deliveryAddress()
      cy.selectPaymentType(`Cartão de Débito`)
      cy.confirmOrder(`Cartão de Débito`)

    });
  });
});
