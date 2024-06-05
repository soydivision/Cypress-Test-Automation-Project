import userData from '../../fixtures/creds/company_kkm.json';
import dashBoard from '../../page_objects/dashBoard';
import data from '../../fixtures/TC58_3.json';

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        dashBoard.reports.click();
    })

    it('check filters', () => {
        dashBoard.KKMshifts.click();
        cy.placeHolder('Касса').click({ force: true });
        cy.chooseOptionFromList(data.casse);
        cy.tableHasContent();
    })
})
