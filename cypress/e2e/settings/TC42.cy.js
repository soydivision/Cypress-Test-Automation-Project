import userData from '../../fixtures/creds/company_with_products.json';
import dashBoard from '../../page_objects/dashBoard';
import terminalPage from '../../page_objects/terminalPage';
import sysMessages from '../../fixtures/system_notifications_and_messages.json'

describe('', () => {
    beforeEach(() => {
        loginAndProceedToSalesMode();
        cy.tryToOpenShift();
    })

    it('leave the system and close shift', () => {
        cy.burgerButton();
        cy.contains('span', 'Закрыть смену Prosklad').click();
        cy.contains('button', 'Закрыть смену и выйти').click();
        cy.url().should('contain', 'auth/signin');

        loginAndProceedToSalesMode();

        terminalPage.openShiftButton.click();
        cy.messageDisplayed(sysMessages.executionSuccess);
    })

    function loginAndProceedToSalesMode() {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithData);
        cy.closeSuccessNotification();
        dashBoard.salesMode.click();
        cy.tryToOpenShift();
    }
})
