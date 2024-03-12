describe('Successful purchase', () => {
  
  beforeEach('', () =>{ 
    cy.fixture('data.json').as('data')
    cy.visit('/')
  })

  it('completes the purchase successfully and displays payment type', function () {
    const product = this.data.checkout

    cy.buyCoffee(product.name)
    cy.get('input[name=cep]').type(product.zipcode);
    cy.get('input[type=button][value="Buscar CEP"]').click();
    cy.get('input[name=number]').type(product.number);
    cy.get('input[name=complement]').type(product.complement);

    cy.selectPaymentType(product.payment);

    cy.get('button[type=submit]').click();

    cy.url().should('contain', '/order-success');

    cy.findByText('Pagamento na entrega').should('have.text', `Pagamento na entrega${product.payment}`);
  });
});

describe('Apply coupon', () => {
  beforeEach('', function () { 
    cy.visit('/');
    cy.fixture('data.json').then((data) => {
      this.data = data;
      cy.buyCoffee(this.data.coupon.product.name)
    });
  })

  it('Should apply valid coupon and update total price', function(){
    cy.applyCoupon(this.data.coupon.success.code);

    cy.get('.sub-price').should('have.text', `R$ ${this.data.coupon.product.price} `);
    cy.get('.discount').should('have.text', `Desconto cupomR$ ${this.data.coupon.success.discount}`);
    cy.get('.total-price').should('have.text', `R$ ${this.data.coupon.success.new_total} `);
  })

  it('Should show an alert on attempt to apply expired coupon', function (){
    cy.applyCoupon(this.data.coupon.fail.expired.code);
    cy.get('.notice').should('have.text', this.data.coupon.fail.expired.alert)
    cy.get('.total-price').should('have.text', `R$ ${this.data.coupon.product.total} `);
  })
})