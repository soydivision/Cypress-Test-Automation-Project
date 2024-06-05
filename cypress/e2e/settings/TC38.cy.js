import userData from '../../fixtures/creds/company_with_products.json';
import dashBoard from '../../page_objects/dashBoard';

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithData);
        cy.closeSuccessNotification();
        dashBoard.salesMode.click();
        cy.tryToOpenShift();
        cy.tryToOpenTerminalList();
    })

    it('goes to main page from sales mode', () => {
        cy.burgerButton();
        cy.get('#terminal-menu_home').click();
        cy.contains('span', 'Главная').should('exist');
    })
})
