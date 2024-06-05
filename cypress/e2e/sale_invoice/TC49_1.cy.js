import dashBoard from '../../page_objects/dashBoard';
import realization from '../../page_objects/realization';
import { constants } from '../../support/constants';
import data from '../../fixtures/TC49_1.json'
import sysMessages from '../../fixtures/system_notifications_and_messages.json'
import userData from '../../fixtures/creds/company_with_products.json';

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithData);
        dashBoard.realization.click();
        realization.saleInvoice.click();
        realization.createSaleInvoice.click().wait(1000);
    })

    it('create sale invoice', () => {
        cy.placeHolder('Выбрать клиента').click({ force: true });
        cy.modalContent().contains(data.client_name).click();
        cy.modalContent().contains('button', 'Выбрать').click();
        cy.get('input[placeholder="Тип оплаты"]').click({ force: true });
        cy.chooseOptionFromList(data.payment_type);
        cy.searchProductByBarcodeOrNameFilter().typeSlow(data.barcode).wait(constants.AFTER_SEARCH_TIMEOUT).type('{enter}').wait(2500);
        cy.selectRowAndColumnInTableBody(0, 3)
            .find('input').type(data.price);
        cy.selectRowAndColumnInTableBody(0, 5)
            .find('input').clear().type(data.amount);
        cy.addProductBarSubmitClick();
        cy.buttonContainsClick('Создать');
        cy.messageDisplayed(sysMessages.executionSuccess);
    })
})
