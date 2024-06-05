import userData from '../../fixtures/creds/company_kkm.json';
import dashBoard from '../../page_objects/dashBoard';
import data from '../../fixtures/TC58_4.json';
import terminal from '../../page_objects/terminalPage';

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        dashBoard.salesMode.click();
        cy.chooseWarehouse(data.warehouse);
        cy.tryToOpenShift();
    })

    it('checks kkm shift close', () => {
        terminal.cashRegister.click();
        terminal.submitCashIntoCashRegister.click().wait(1000);
        cy.clickNumpadButton('7');
        terminal.insertSummCashRegister.click();
        cy.get('#terminal-cashbox_submit').click()
        cy.burgerButton();
        cy.get('#terminal-menu_home').click();
        dashBoard.reports.click();
        dashBoard.KKMshifts.click();
        cy.selectRowAndColumnInTableBody(0, 4)
            .find('button').first().click();
        cy.modalContent().contains('Сменный X-отчет').should('exist');
    })
})
