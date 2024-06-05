import terminalPage from '../../page_objects/terminalPage'
import dashBoard from '../../page_objects/dashBoard';
import userData from '../../fixtures/creds/company_with_products.json';

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithData);
        cy.closeSuccessNotification();
        dashBoard.salesMode.click();
        cy.tryToOpenShift();
    })

    it('checks filter for sales list within terminal', () => {
        terminalPage.history.click();
        cy.get('#terminalHistoryTable').should('exist');
    })

    it('checks filter for returns within terminal', () => {
        terminalPage.history.click();
        cy.contains('Возвраты').click();
        cy.get('#terminalRefundTable').should('exist');
    })
})
