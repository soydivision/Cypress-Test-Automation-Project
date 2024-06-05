import userData from '../../fixtures/creds/company_kkm.json';
import dashBoard from '../../page_objects/dashBoard';
import realization from '../../page_objects/realization';
import data from '../../fixtures/TC46_2.json';

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        dashBoard.realization.click();
        realization.sales.click();
    })

    it('searches sale using receipt (fiscal) number', () => {
        cy.typeFiscalNumber(data.fiscal_number);
        cy.setPeriod('С начала года');
        cy.launchFilter();
        cy.tableHasContent();
    })

    it('searches sale using employee name', () => {
        cy.typeEmployeeNameInSearchFilter(data.employee_name);
        cy.chooseOptionFromList(data.employee_name);
        cy.setPeriod('С начала года');
        cy.launchFilter();
        cy.tableHasContent();
    })

    it('searches sale using warehouse name', () => {
        cy.typeWarehouseInFilter(data.warehouse).wait(1500).type('{enter}');
        cy.setPeriod('С начала года');
        cy.launchFilter();
        cy.tableHasContent();
    })
})
