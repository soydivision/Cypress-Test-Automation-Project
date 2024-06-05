import userData from '../../../fixtures/creds/company_with_products.json';
import dashBoard from '../../../page_objects/dashBoard';
import nomenclature from '../../../page_objects/nomenclature';

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithMultipleWarehouses);
        dashBoard.goods.click();
        dashBoard.nomenclature.click().wait(2000);
    })

    it('checks the display of write offs list', () => {
        nomenclature.writeoffsButton.click();
        cy.tableHasContent();
    })
})