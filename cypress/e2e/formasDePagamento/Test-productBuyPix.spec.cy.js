describe('PIX', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  context('Pagamento Via PIX', () => {
    it('Comprar Expresso Tradicional', () => {
      cy.selectProduct('Expresso Tradicional')
      cy.deliveryAddress()
      cy.selectPaymentType(`À vista no PIX`)
      cy.confirmOrder(`À vista no Pix`)

    });
    it('Comprar Expresso Americano', () => {
      cy.selectProduct('Expresso Americano')
      cy.deliveryAddress()
      cy.selectPaymentType(`À vista no PIX`)
      cy.confirmOrder(`À vista no Pix`)

    });
    it('Validar pedido de produto Expresso Cremoso indisponível', () => {
      cy.selectProduct('Expresso Cremoso')
      cy.get('.swal2-popup').should('exist')
      cy.get('.swal2-confirm').click({ force: true })
    });
    it('Comprar Expresso Gelado', () => {
      cy.selectProduct('Expresso Gelado')
      cy.deliveryAddress()
      cy.selectPaymentType(`À vista no PIX`)
      cy.confirmOrder(`À vista no Pix`)

    });
    it('Comprar Café com Leite', () => {
      cy.selectProduct('Café com Leite')
      cy.deliveryAddress()
      cy.selectPaymentType(`À vista no PIX`)
      cy.confirmOrder(`À vista no Pix`)

    });
    it('Comprar Latte', () => {
      cy.selectProduct('Latte')
      cy.deliveryAddress()
      cy.selectPaymentType(`À vista no PIX`)
      cy.confirmOrder(`À vista no Pix`)

    });
    it('Comprar Capuccino', () => {
      cy.selectProduct('Capuccino')
      cy.deliveryAddress()
      cy.selectPaymentType(`À vista no PIX`)
      cy.confirmOrder(`À vista no Pix`)
    });
    it('Comprar Macchiato', () => {
      cy.selectProduct('Macchiato')
      cy.deliveryAddress()
      cy.selectPaymentType(`À vista no PIX`)
      cy.confirmOrder(`À vista no Pix`)

    });
  });
});
