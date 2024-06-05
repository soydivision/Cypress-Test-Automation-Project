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

    it('checks if client list exists', () => {
        cy.burgerButton();
        cy.contains('Список клиентов').click();
        cy.contains('span.card-header-title', 'Список клиентов').should('exist');
        cy.tableHasContent();
    })
})
