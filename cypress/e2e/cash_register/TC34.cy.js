import userData from '../../fixtures/creds/company_kkm.json';
import dashBoard from '../../page_objects/dashBoard';
import terminal from '../../page_objects/terminalPage';

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        dashBoard.salesMode.click();
        cy.contains(userData.warehouse).click().wait(2000);
        cy.tryToOpenShift();
    })

    it('checks X report in Cash Register (KKM)', () => {
        terminal.cashRegister.click().wait(2000);
        terminal.updateXReport.click();
        cy.modalContent()
            .should('be.visible');
        cy.modalContent()
            .should('contain.text', 'Просмотр отчёта');
        cy.dismiss();
        cy.burgerButton();
        cy.contains('Закрыть смену Prosklad').click();
        cy.modalContent().contains('button', 'Закрыть смену').click();
    })
})
