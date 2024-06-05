import userData from '../../fixtures/creds/company_with_products.json';

describe('', () => {
  beforeEach(() => {
  })

  it('can login and see Desktop', () => {
    cy.logIn(userData.phoneNumber, userData.password);
    cy.contains('span', 'Главная').should('exist');
  })
})
