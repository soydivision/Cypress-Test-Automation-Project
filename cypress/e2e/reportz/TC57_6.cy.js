import data from '../../fixtures/TC57_6.json';
import userData from '../../fixtures/creds/company_with_products.json';
import dashBoard from '../../page_objects/dashBoard';


describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithData).wait(1500);
        cy.closeSuccessNotification();
        dashBoard.reports.click();
    })

    it('checks cashiers filter', () => {
        dashBoard.cashiersReport.click();
        cy.placeHolder('Сотрудник').click({ force: true });
        cy.chooseOptionFromList(data.cashierOne);
        cy.launchFilter();
        cy.tableHasContent();
    })
})