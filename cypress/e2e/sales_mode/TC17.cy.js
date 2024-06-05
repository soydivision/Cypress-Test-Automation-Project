import searchData from '../../fixtures/TC17.json'
import userData from '../../fixtures/creds/company_with_products.json';
import dashBoard from '../../page_objects/dashBoard';
import terminalPage from '../../page_objects/terminalPage';

describe('', () => {
  beforeEach(() => {
    cy.logIn(userData.phoneNumber, userData.password);
    cy.selectCompany(userData.companyWithData);
    cy.closeSuccessNotification();
    dashBoard.salesMode.click();
    cy.tryToOpenShift();
    cy.tryToOpenTerminalList();
  })

  it('search product by category', () => {
    cy.contains(searchData.productCategory).click();
    cy.contains(searchData.productFromCategory).should('exist');
    terminalPage.noResultMessage.should('not.exist');
  })
})
