import searchData from '../../fixtures/TC1.json'
import { constants } from '../../support/constants';
import userData from '../../fixtures/creds/company_with_products.json';
import dashBoard from '../../page_objects/dashBoard';
import terminal from '../../page_objects/terminalPage'

describe('', () => {
  beforeEach(() => {
    cy.logIn(userData.phoneNumber, userData.password);
    cy.selectCompany(userData.companyWithData);
    cy.closeSuccessNotification();
    dashBoard.salesMode.click();
    cy.tryToOpenShift();
  })

  it('search product by name - all types of products listed below', () => {
    // search product
    cy.get('#terminalSearchInput')
      .typeSlow(searchData.productName)
      .wait(constants.SEARCH_TIMEOUT_SMALL);
    terminal.noResultMessage.should('not.exist');

    // search service
    cy.get('#terminalSearchInput').clear()
      .typeSlow(searchData.serviceName)
      .wait(constants.SEARCH_TIMEOUT_SMALL);
    terminal.noResultMessage.should('not.exist');

    // search compound product
    cy.get('#terminalSearchInput').clear()
      .typeSlow(searchData.compoundProductName)
      .wait(constants.SEARCH_TIMEOUT_SMALL);
    terminal.noResultMessage.should('not.exist');

    // search universal product
    cy.get('#terminalSearchInput').clear()
      .typeSlow(searchData.universalProduct)
      .wait(constants.SEARCH_TIMEOUT_SMALL);
    terminal.noResultMessage.should('not.exist');

    // search archived product
    cy.get('#terminalSearchInput').clear()
      .typeSlow(searchData.archivedProduct)
      .wait(constants.SEARCH_TIMEOUT_SMALL);
    terminal.noResultMessage.should('exist');
  })
})
