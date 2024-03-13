import '@shelex/cypress-allure-plugin';
import './commands'
import 'cypress-plugin-steps' // Usado para dar melhor visibilidade nos steps dos testes
import 'cypress-plugin-xhr-toggle' // configurado no (cypress.config.js como env: {hideXhr: true},) 