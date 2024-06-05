import userData from '../../fixtures/creds/company_with_products.json';
import dashBoard from '../../page_objects/dashBoard';
import reports from '../../page_objects/reports';

describe.skip('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithData).wait(1500);
        cy.closeSuccessNotification();
        dashBoard.reports.click();
    })

    it('checks abc reports', () => {
        dashBoard.ABCanalysis.click();
        reports.ABCReportExport.click();
        reports.barcodeInput.type('12123123132');
        cy.modalContent().find('form').contains('button', 'Выполнить экспорт').click();
    })

    // to do
    // make sell 
    // input the right dates
    // make export
})
