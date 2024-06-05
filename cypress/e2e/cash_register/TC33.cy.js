import userData from '../../fixtures/creds/company_kkm.json';
import dashBoard from '../../page_objects/dashBoard';
import cashRegister from '../../fixtures/TC33.json'
import sysMessages from '../../fixtures/system_notifications_and_messages.json'
import terminal from '../../page_objects/terminalPage'
import RandomNumberGenerator from '../../support/randomNumberGenerator';

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        dashBoard.salesMode.click();
        cy.contains(userData.warehouse).click().wait(500);
        cy.tryToOpenShift();
    })

    it('inserts cash in Cash Register (KKM)', () => {
        terminal.cashRegister.click();
        terminal.insertSummCashRegister.click();
        terminal.summToExtractInput.click({ force: true }).type(cashRegister.insertSumm);
        terminal.insertSummButton.click();
        cy.messageDisplayed(sysMessages.cashInsertionSuccess);
    })

    it('extracts cash in Cash Register (KKM)', () => {
        terminal.cashRegister.click();
        terminal.extractSummCashRegister.click();
        terminal.summToExtractInput.click({ force: true }).type(cashRegister.extractSumm);
        terminal.extractSummButton.click();
        cy.messageDisplayed(sysMessages.cashExtractionSuccess);
    })

    afterEach(() => {
        cy.burgerButton();
        cy.contains('Закрыть смену Prosklad').click().wait(2000);
        cy.modalContent().find('li button').contains(RandomNumberGenerator.generateRandomNumberInRange(1, 9)).click();
        cy.modalContent().find('li button').contains(RandomNumberGenerator.generateRandomNumberInRange(1, 9)).click();
        cy.modalContent().find('li button').contains(RandomNumberGenerator.generateRandomNumberInRange(1, 9)).click();
        cy.get('button').contains('Закрыть смену').click();
    })
})
