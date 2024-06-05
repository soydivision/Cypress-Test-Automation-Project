import userData from '../../fixtures/creds/company_with_products.json';
import dashBoard from '../../page_objects/dashBoard';

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithData).wait(1500);
        cy.closeSuccessNotification();
        dashBoard.reports.click();
    })

    it('checks shift reports', () => {
        dashBoard.shiftReports.click();
        cy.tableHasContent();
    })
})
