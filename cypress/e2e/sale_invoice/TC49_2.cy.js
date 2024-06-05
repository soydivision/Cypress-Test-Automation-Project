import dashBoard from '../../page_objects/dashBoard';
import realization from '../../page_objects/realization';
import userData from '../../fixtures/creds/company_with_products.json';

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithData);
        dashBoard.realization.click();
        realization.saleInvoice.click();
    })

    it('checks if sales invoice list is not empty', () => {
        cy.get('#saleTable tbody').find('tr').should('have.length.above', 1);
    })
})
