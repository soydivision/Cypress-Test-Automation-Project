import userData from '../../../fixtures/creds/company_with_products.json';
import dashBoard from '../../../page_objects/dashBoard';
import nomenclature from '../../../page_objects/nomenclature';
import data from '../../../fixtures/TC53_4.json'

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithMultipleWarehouses);
        cy.closeSuccessNotification();
        dashBoard.goods.click();
        dashBoard.nomenclature.click();
        nomenclature.productTransfer.click();
    })

    it('checks barcode filter in transfers', () => {
        cy.searchProductByBarcodeOrNameFilter().type(data.barcode).wait(1500).type('{enter}');
        cy.get('#filter_transfer_datepicker').trigger('mouseover').click();
        cy.contains(' С начала года ').click();
        cy.launchFilter();
        cy.selectRowAndColumnInTableBody(0, 5).find('button').click();
        cy.contains('Просмотр').click();
        cy.get('td').contains(data.barcode).should('exist');
    })
})