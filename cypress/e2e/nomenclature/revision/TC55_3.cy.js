import userData from '../../../fixtures/creds/company_with_products.json';
import dashBoard from '../../../page_objects/dashBoard';
import nomenclature from '../../../page_objects/nomenclature';

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithData);
        cy.closeSuccessNotification();
        dashBoard.goods.click();
        dashBoard.nomenclature.click();
        nomenclature.revisionButton.click();
    })

    it('check for existing  revisions', () => {
        cy.resetFilter();
        cy.tableHasContent();

    })

    it('check for created revisions', () => {
        cy.resetFilter();
        cy.contains('Незавершенные').click();
        cy.tableHasContent();
    })
})