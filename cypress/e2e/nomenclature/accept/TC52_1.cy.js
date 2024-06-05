import userData from '../../../fixtures/creds/company_with_products.json'
import dashBoard from '../../../page_objects/dashBoard';
import nomenclature from '../../../page_objects/nomenclature';
import sysMessages from '../../../fixtures/system_notifications_and_messages.json'
import data from '../../../fixtures/TC52_1.json'

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithData);
        cy.closeSuccessNotification();
        dashBoard.goods.click();
        nomenclature.acceptance.click();
    })

    it('creates accept from nomenclature', () => {
        cy.acceptGoods().wait(1500);
        cy.searchProductByBarcodeOrNameFilter().type(data.barcode_for_accept);
        cy.selectRowAndColumnInTableBody(0, 4).clear().type(data.quantity);
        cy.selectRowAndColumnInTableBody(0, 6).clear().type(data.selling_price);
        cy.selectRowAndColumnInTableBody(0, 7).clear().type(data.profit);
        cy.clickOnButtonContains('Завершить приемку');
        cy.clickOnButtonContains('Завершить сейчас');
        cy.modalContent().find('#invoice_form_search_vendor').typeSlow(data.supplier);
        cy.modalContent().find('.multiselect__placeholder').click();
        cy.modalContent().clickSpanByText(data.payment_method);
        cy.modalContent().pay();
        cy.messageDisplayed(sysMessages.creationSuccess);
    })
})