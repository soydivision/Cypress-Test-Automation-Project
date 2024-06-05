import data from '../../fixtures/TC22.json';
import userData from '../../fixtures/creds/company_kkm.json';
import dashBoard from '../../page_objects/dashBoard';
import terminal from '../../page_objects/terminalPage';
import RandomNumberGenerator from '../../support/randomNumberGenerator';


describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        dashBoard.salesMode.click();
        cy.contains(userData.warehouse).click();
        cy.tryToOpenShift();
    })

    it('checks if products of one company cannot be found in another', () => {
        cy.get('#terminalSearchInput')
            .typeSlow(data.product)
            .wait(2000);
        terminal.noResultMessage.should('exist');
        cy.get('#terminalSearchInput').clear();
        cy.burgerButton();
        cy.contains('Закрыть смену Prosklad').click();
        cy.clickNumpadButton(RandomNumberGenerator.generateRandomNumberInRange(1, 9));
        cy.clickNumpadButton(RandomNumberGenerator.generateRandomNumberInRange(1, 9));
        cy.clickNumpadButton(RandomNumberGenerator.generateRandomNumberInRange(1, 9));
        cy.get('button').contains('Закрыть смену').click();
    })
})
