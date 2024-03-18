import * as allure from "allure-cypress";

describe('Validação de itens obrigatorios', () => {
  beforeEach(() => {
    cy.section(`Acessando tela principal`);
    cy.visit('/');
  });
  context('Campos obrigatorios [ CEP , Número da casa , forma de pagamento ]', () => {
    it('Validação do campos obrigatorio', () => {
      cy.selectProduct('Expresso Tradicional');
      cy.deliveryAddressRequire();
    });
  });
  it('Validação do campo obrigatorio do CEP', () => {
    cy.selectProduct('Expresso Tradicional');
    cy.get('input[value="Buscar CEP"]').click({ force: true });
    cy.contains('p', 'Informe um CEP válido').should('exist')
  });
});