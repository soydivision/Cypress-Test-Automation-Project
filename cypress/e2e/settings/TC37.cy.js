import data from '../../fixtures/TC37.json'
import userData from '../../fixtures/creds/company_with_products.json';
import sysMessages from '../../fixtures/system_notifications_and_messages.json'
import RandomNumberGenerator from '../../support/randomNumberGenerator';
import dashBoard from '../../page_objects/dashBoard';

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithData);
        cy.closeSuccessNotification();
        dashBoard.salesMode.click();
        cy.tryToOpenShift();
    })

    it('blocks and unblocks terminal', () => {
        cy.burgerButton();
        cy.get('#terminal-menu_lock').click();
        cy.inputNumpadNumber(String(RandomNumberGenerator.generateRandomNumberInRange(1000, 9999)));
        cy.messageDisplayed(sysMessages.invalidPincode);
        cy.inputNumpadNumber(data.pin);
    })
})
