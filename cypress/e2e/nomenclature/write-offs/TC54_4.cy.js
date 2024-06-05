import userData from '../../../fixtures/creds/company_with_products.json';
import dashBoard from '../../../page_objects/dashBoard';
import nomenclature from '../../../page_objects/nomenclature';
import data from '../../../fixtures/TC54_4.json';

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithMultipleWarehouses);
        cy.closeSuccessNotification();
        dashBoard.goods.click();
    })

    it('checks write offs using warehouse 1', () => {
        nomenclature.writeoffsButton.click();
        cy.placeHolder('Склад').parent().find('input').type(data.warehouse_1, { force: true }).wait(1000).type('{enter}');
        cy.launchFilter();
        cy.tableHasContent();
    })

    it('checks write offs using warehouse 2', () => {
        nomenclature.writeoffsButton.click();
        cy.placeHolder('Склад').parent().find('input').type(data.warehouse_2, { force: true }).wait(1000).type('{enter}');
        cy.launchFilter();
        cy.tableHasContent();
    })

    it.only('search product in write off', () => {
        nomenclature.writeoffsButton.click();
        cy.placeHolder('Склад').parent().find('input').type(data.warehouse_1, { force: true }).wait(1000).type('{enter}');
        cy.get('[placeholder="Поиск товара"]').parent().typeSlow(data.write_off_product_name).wait(1500).type('{enter}');
        cy.launchFilter();
        cy.tableHasContent();
    })
})