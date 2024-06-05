import userData from '../../fixtures/creds/company_with_products.json';
import dashBoard from '../../page_objects/dashBoard'

describe('', () => {
  beforeEach(() => {
    cy.logIn(userData.phoneNumber, userData.password);
    cy.selectCompany(userData.companyWithData);
    cy.closeSuccessNotification();
    dashBoard.salesMode.click();
    cy.tryToOpenShift();
  })

  it('search product by fast products tab', () => {
    cy.contains('Быстрые')
      .contains('товары').click();
    cy.get('.modal-title').contains('Быстрые товары').should('exist');
  })
})

