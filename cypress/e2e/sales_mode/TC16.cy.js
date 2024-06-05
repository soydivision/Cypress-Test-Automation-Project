import terminalPage from '../../page_objects/terminalPage';
import searchData from '../../fixtures/TC16.json';
import { constants } from '../../support/constants';
import userData from '../../fixtures/creds/company_with_products.json';
import dashBoard from '../../page_objects/dashBoard';

describe('', () => {
  beforeEach(() => {
    cy.logIn(userData.phoneNumber, userData.password);
    cy.selectCompany(userData.companyWithData);
    cy.closeSuccessNotification();
    dashBoard.salesMode.click();
    cy.tryToOpenShift();
  })

  it('search product and add to cart - all types of products listed below', () => {
    // search product
    cy.get('#terminalSearchInput').typeSlow(searchData.productBarcode)
      .wait(constants.SEARCH_TIMEOUT_SMALL);
    terminalPage.noResultMessage.should('not.exist');

    // search service
    cy.get('#terminalSearchInput').clear()
      .typeSlow(searchData.serviceBarcode);
    terminalPage.noResultMessage.should('not.exist');

    // search compound product
    cy.get('#terminalSearchInput').clear()
      .typeSlow(searchData.compoundProductBarcode)
      .wait(constants.SEARCH_TIMEOUT_SMALL);
    terminalPage.noResultMessage.should('not.exist');

    // search universal product
    cy.get('#terminalSearchInput').clear()
      .typeSlow(searchData.universalProductBarcode)
      .wait(constants.SEARCH_TIMEOUT_SMALL);
    terminalPage.noResultMessage.should('not.exist');

    // search archived product
    cy.get('#terminalSearchInput').clear()
      .typeSlow(searchData.archivedProductBarcode)
      .wait(constants.SEARCH_TIMEOUT_SMALL);
    terminalPage.noResultMessage.should('exist');
  })
})
