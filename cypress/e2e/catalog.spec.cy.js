describe('home', () => {

  beforeEach('', () => {
    cy.fixture('data.json').as('productData')
    cy.visit('/')
  })
  it('Should be online', () => {
    cy.title().should('eq', 'Starbugs')
  });

  it('Should list coffee catalog', () => {
    cy.get('.coffee-item').its('length').should('be.gt', 1)
  });

  it('should start the coffee purchase and show the Checkout page with the correct total amount', function () {
    const product = this.productData.catalog.available

    cy.buyCoffee(product.name)

    cy.get('.item-details h1').should('contain.text', product.name);
    cy.get('.sub-price').should('contain.text', `R$ ${product.price}`);
    cy.get('.delivery-price').should('contain.text', `R$ ${product.delivery}`);
    cy.get('.total-price').should('contain.text', `R$ ${product.total}`);
  })

})