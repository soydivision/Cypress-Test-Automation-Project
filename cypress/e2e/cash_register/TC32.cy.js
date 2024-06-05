import userData from '../../fixtures/creds/company_kkm.json';
import sysMessages from '../../fixtures/system_notifications_and_messages.json';
import dashBoard from '../../page_objects/dashBoard';
import terminal from '../../page_objects/terminalPage';

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        dashBoard.salesMode.click();
        cy.contains(userData.warehouse).click().wait(500);
        cy.tryToOpenShift();
    })

    it('opens shift and closes shift', () => {
        terminal.cashRegister.click();
        terminal.submitCashIntoCashRegister.click();
        cy.get('[data-name="sum"]').find('input').type('1', { force: true });
        terminal.insertSumm.click();

        cy.messageDisplayed(sysMessages.cashInsertionSuccess);
        terminal.aboutShift.click();
        terminal.closeCashRegisterShift.should('be.visible');
        cy.closeSuccessNotification();
        // TC35 hereafter
        terminal.cashRegister.click();
        terminal.closeCashRegisterShift.click();
        cy.messageDisplayed(sysMessages.executionSuccess);
        cy.closeSuccessNotification();
        cy.burgerButton();
        cy.contains('Закрыть смену Prosklad').click();
        cy.get('button').contains('Закрыть смену').click();
    })
})