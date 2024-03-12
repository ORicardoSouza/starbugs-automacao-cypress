Cypress.Commands.add('buyCoffee', (product) => {
  const coffeeItem = cy.get('h1').contains(product).parent()
  const button = coffeeItem.find('button.buy-coffee')
  button.click()
})

Cypress.Commands.add('selectProduct', (nomeProduct) => {
  cy.contains(`${nomeProduct}`)
    .parents('.coffee-item')
    .find('.buy-coffee')
    .click({ force: true });
});

Cypress.Commands.add('deliveryAddress', () => {
  const street = `Rua Ginaldo Willis Galdino`
  const district = `Jardim Antártica`
  const city = `São Paulo`
  const uf = `SP`

  cy.get('input[name="number"]').type(`12`);


  cy.get('input[name="cep"]').type('02652190');
  cy.get('input[value="Buscar CEP"]').click({ force: true });
  cy.get('input[name="street"]').should('have.value', `${street}`);
  cy.get('input[name="district"]').should('have.value', `${district}`);
  cy.get('input[name="city"]').should('have.value', `${city}`);
  cy.get('input[name="uf"]').should('have.value', `${uf}`)

});

Cypress.Commands.add('selectPaymentType', (type) => {
  switch (type) {
    case 'Cartão de Crédito':
      cy.get('label[for=credit]').click();
      break;
    case 'Cartão de Débito':
      cy.get('label[for=debit]').click();
      break;
    case 'À vista no PIX':
      cy.get('label[for=pix]').click();
      break;
    default:
      throw new Error(`Unsupported payment type: ${paymentType}`);
  }
})

Cypress.Commands.add('applyCoupon', (coupon) => {
  cy.findByPlaceholderText('Código do cupom').type(coupon);
  cy.get('.button-coupon').click();
})

Cypress.Commands.add('confirmOrder', () => {
  cy.get('.sc-idXgbr').click()
  cy.contains(`h1`, `Uhull! Pedido confirmado`).should('be.visible')
  cy.get('.sc-lllmON .sc-ipEyDJ')
    .should('contain', 'Previsão de entrega')
    .and('contain', '20 min - 30 min')
    .and('contain', 'Pagamento na entrega')
    .and('contain', 'À vista no Pix');
});