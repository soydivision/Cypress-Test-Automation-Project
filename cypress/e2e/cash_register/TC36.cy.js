import userData from '../../fixtures/creds/company_kkm.json';
import dashBoard from '../../page_objects/dashBoard';

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
    })

    it('check Z report', () => {
        dashBoard.reports.click();
        cy.contains('Смены ККМ').click();
        cy.get('button:contains(Просмотр)').eq(3).click();
        cy.modalContent().contains('Сменный Z-отчет').should('exist');
    })
})
