import userData from '../../../fixtures/creds/company_with_products.json';
import dashBoard from '../../../page_objects/dashBoard';
import nomenclature from '../../../page_objects/nomenclature';
import data from '../../../fixtures/TC55_6.json';

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithData);
        cy.closeSuccessNotification();
        dashBoard.goods.click();
        dashBoard.nomenclature.click();
        nomenclature.revisionButton.click();
    })

    it('check revision filter using warehouse', () => {
        cy.multiSelectPlaceholderContains('Склад').click();
        cy.clickSpanByText('Основной склад');
        cy.get('#filter_invoice_datepicker').trigger('mouseover').click();
        cy.contains(' С начала года ').click();
        cy.launchFilter();
        cy.tableHasContent();
    })

    it('check revision filter using product name', () => {
        cy.placeHolder('Название').type(data.name, { force: true });
        cy.get('#filter_invoice_datepicker').trigger('mouseover').click();
        cy.contains(' С начала года ').click();
        cy.launchFilter();
        cy.tableHasContent();
    })

    it('check revision filter using admin employee name', () => {
        cy.placeHolder('Сотрудник').parent().find('input').type(data.employee_admin, { force: true }).wait(2000).type('{enter}');
        cy.get('#filter_invoice_datepicker').trigger('mouseover').click();
        cy.contains(' С начала года ').click();
        cy.launchFilter();
        cy.tableHasContent();
    })

    it('check revision filter using casheer employee name', () => {
        cy.placeHolder('Сотрудник').parent().find('input').type(data.employee_casheer, { force: true }).wait(2000).type('{enter}');
        cy.launchFilter();
        cy.contains('Нет результатов').should('exist');
    })
})