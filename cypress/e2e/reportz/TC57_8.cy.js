import userData from '../../fixtures/creds/company_with_products.json';
import dashBoard from '../../page_objects/dashBoard';
import reports from '../../page_objects/reports';

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithData).wait(1500);
        cy.closeSuccessNotification();
        dashBoard.reports.click();
    })

    it('checks abc reports', () => {
        dashBoard.ABCanalysis.click();
        reports.searchByBarcode.type('48511322').wait(1500).type('{enter}');
        cy.launchFilter();
    })
})
