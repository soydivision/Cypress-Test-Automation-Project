import userData from '../../fixtures/creds/company_kkm.json';
import dashBoard from '../../page_objects/dashBoard';

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        dashBoard.reports.click();
    })

    it('check X report', () => {
        dashBoard.KKMshifts.click();
        cy.selectRowAndColumnInTableBody(0, 4).find('button').first().click();
        cy.modalContent().contains('Сменный X-отчет').should('be.visible');
    })
})
