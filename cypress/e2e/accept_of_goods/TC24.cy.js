import searchData from '../../fixtures/TC24.json'
import terminal from '../../page_objects/terminalPage'
import { constants } from '../../support/constants';
import data from '../../fixtures/creds/company_with_products.json';
import dashBoard from '../../page_objects/dashBoard';

describe('', () => {
  beforeEach(() => {
    cy.logIn(data.phoneNumber, data.password);
    cy.selectCompany(data.companyWithData);
    cy.closeSuccessNotification();
    dashBoard.salesMode.click();
    cy.clickAcceptOfGoods();
    cy.tryToOpenShift();
  })

  it('searches in accept of goods window using name and barcodes', () => {
    cy.get('#terminalSearchInput')
      .typeSlow(searchData.productBarcode)
      .wait(constants.SEARCH_TIMEOUT_SMALL);
    terminal.noResultMessage.should('not.exist');

    cy.get('#terminalSearchInput').clear()
      .typeSlow(searchData.serviceName)
      .wait(constants.SEARCH_TIMEOUT_SMALL);
    terminal.noResultMessage.should('be.visible');

    cy.get('#terminalSearchInput').clear()
      .typeSlow(searchData.compoundProductName)
      .wait(constants.SEARCH_TIMEOUT_SMALL);
    terminal.noResultMessage.should('be.visible');

    cy.get('#terminalSearchInput').clear()
      .typeSlow(searchData.universalProductBarcode)
      .wait(constants.SEARCH_TIMEOUT_SMALL);
    terminal.noResultMessage.should('be.visible');

    cy.get('#terminalSearchInput').clear()
      .typeSlow(searchData.archivedProduct)
      .wait(constants.SEARCH_TIMEOUT_SMALL);
    terminal.noResultMessage.should('be.visible');
  })

  it.only('searches product by category', () => {
    cy.tryToOpenTerminalList();
    cy.contains(searchData.productCategory).click();
    cy.contains(searchData.productFromCategory).should('be.visible');
    terminal.noResultMessage.should('not.exist');
  })
})
