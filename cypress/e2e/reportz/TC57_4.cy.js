import data from '../../fixtures/TC57_4.json';
import userData from '../../fixtures/creds/company_with_products.json';
import dashBoard from '../../page_objects/dashBoard';
import reports from '../../page_objects/reports';

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithMultipleWarehouses).wait(1500);
        cy.closeSuccessNotification();
        dashBoard.reports.click();
    })

    it('checks warehouse filter', () => {
        dashBoard.shiftReports.click();
        reports.warehouseFilter.click();
        cy.contains(data.firstWarehouse).click();
        cy.launchFilter();
        cy.tableHasContent();
        reports.warehouseFilter.click();
        cy.contains(data.secondWarehouse).click();
        cy.tableHasContent();
        cy.launchFilter();
    })

    it('checks user filter', () => {
        dashBoard.shiftReports.click().wait(3000);
        reports.employeeFilter.click();
        cy.chooseOptionFromList(userData.cashierForcompanyWithMultipleWarehousesName);
        cy.launchFilter();
        cy.tableHasContent();
        reports.employeeFilter.click();
        cy.get('span').contains(userData.companyWithMultipleWarehousesAdmin).click();
        cy.launchFilter();
        cy.tableHasContent();
    })

    it('checks starting summ from filter', () => {
        dashBoard.shiftReports.click();
        reports.startSumFrom.type(data.startSumFrom);
        cy.launchFilter();
        cy.tableHasContent();
    })

    it('checks starting summ to filter', () => {
        dashBoard.shiftReports.click();
        reports.startSumTo.type(data.startSumTo);
        cy.launchFilter();
        cy.tableHasContent();
    })

    it('checks end summ from filter', () => {
        dashBoard.shiftReports.click();
        reports.endSumFrom.type(data.endSumFrom);
        cy.launchFilter();
        cy.tableHasContent();
    })

    it('checks end summ to filter', () => {
        dashBoard.shiftReports.click();
        reports.endSumTo.type(data.endSumTo);
        cy.launchFilter();
        cy.tableHasContent();
    })
})
