import allureCommandline from 'allure-commandline';
import allure, { allureId } from 'allure-cypress';

describe('Campos obrigatorios', () => {
  beforeEach(() => {
cy.section(`Acessando tela principal`)  
    cy.visit('/');
  });
  context('Pagamento Via Cartão de Crédito', () => {
       it('Comprar Expresso Tradicional', () => {
      cy.selectProduct('Expresso Tradicional')
      cy.deliveryAddressRequire()
    });
  });
});