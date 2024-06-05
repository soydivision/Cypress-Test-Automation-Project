import userData from '../../fixtures/creds/company_kkm.json';
import dashBoard from '../../page_objects/dashBoard';

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        dashBoard.reports.click();
    })

    it('check Z report', () => {
        dashBoard.KKMshifts.click();
        dashBoard.KKMshifts.click();
        cy.selectRowAndColumnInTableBody(2, 4).find('button').contains('Просмотр').click();
        cy.get(".modal-body").contains('Сменный Z-отчет').should('be.visible');
    })
})
