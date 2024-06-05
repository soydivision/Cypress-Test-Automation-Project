import userData from '../../../fixtures/creds/company_with_products.json'
import dashBoard from '../../../page_objects/dashBoard';
import nomenclature from '../../../page_objects/nomenclature';

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithMultipleWarehouses);
        cy.closeSuccessNotification();
        dashBoard.goods.click();
        nomenclature.acceptance.click();
    })

    it('checks existing (finished) accepts list', () => {
        cy.tableHasContent();
    })

    it('checks created (unfinished) accepts list', () => {
        cy.contains('Не завершенные').click('left');
        cy.resetFilter();
        cy.tableHasContent();
    })
})