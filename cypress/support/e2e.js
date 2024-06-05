import './commands'
import './constants';
import 'cypress-mochawesome-reporter/register';
import 'cypress-if'

beforeEach(() => {
    Cypress.on('uncaught:exception', () => { return false }) // ignore errors on front-end
})

before(() => {
    cy.viewport(1280, 720); // setting resolution of the webdriver browser
})