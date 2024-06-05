import userData from '../../../fixtures/creds/company_with_products.json';
import dashBoard from '../../../page_objects/dashBoard';
import nomenclature from '../../../page_objects/nomenclature';
import data from '../../../fixtures/TC52_7.json'
import sysMessages from '../../../fixtures/system_notifications_and_messages.json'
import RandomNumberGenerator from '../../../support/randomNumberGenerator';

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithData);
        cy.closeSuccessNotification();
        dashBoard.goods.click();
        nomenclature.acceptance.click();
    })

    it('create and remove accept', () => {
        const randomPrice = RandomNumberGenerator.generateRandomNumberInRange(3, 999);
        const randomQuantity = RandomNumberGenerator.generateRandomNumberInRange(2, 10);
        const acceptSumm = randomPrice * randomQuantity;
        // create accept
        cy.acceptGoods().wait(2000);
        cy.searchProductByBarcodeOrNameFilter().typeSlow(data.barcode_for_accept).wait(2000).type('{enter}');;
        cy.selectRowAndColumnInTableBody(0, 4).clear().type(randomQuantity);
        cy.selectRowAndColumnInTableBody(0, 6).clear().type(randomPrice);
        cy.selectRowAndColumnInTableBody(0, 7).clear().type(data.profit);
        cy.clickOnButtonContains('Завершить приемку');
        cy.clickOnButtonContains('Завершить сейчас');
        cy.modalContent().find('#invoice_form_search_vendor').click();
        cy.contains(data.supplier).click();
        cy.modalContent().find('.multiselect__placeholder').click();
        cy.modalContent().clickSpanByText(data.payment_method);
        cy.modalContent().pay();
        cy.messageDisplayed(sysMessages.creationSuccess);
        cy.dismissFeedbackWindow();

        // find an accept to remove to do add data
        cy.multiSelectPlaceholderContains('Склад').click();
        cy.clickSpanByText(data.warehouse);
        cy.multiSelectPlaceholderContains('Сотрудник').click();
        cy.clickSpanByText(data.employee);
        cy.multiSelectPlaceholderContains('Поиск товара').click();
        cy.get('#search_product_by_barcode_or_name').type(data.barcode_for_accept).wait(1000).type('{enter}');
        cy.multiSelectPlaceholderContains('Поиск поставщика').click();
        cy.clickSpanByText(data.supplier);
        cy.launchFilter().wait(3000);

        // ensure we removing the proper accept by checking the summ
        cy.selectRowAndColumnInTableBody(0, 4)
            .find('div')
            .invoke('text')
            .then((text) => {
                const trimmedString = text.replace(/\s/g, '');
                const trimmedSumm = parseInt(trimmedString);
                expect(trimmedSumm).to.eq(acceptSumm);
            });
        cy.selectRowAndColumnInTableBody(0, 7).find('button').click();
        cy.get('button').contains('Отменить').click();
        cy.modalContent().contains('Да').first().click();
        cy.messageDisplayed(sysMessages.deletionSuccess);
    })
})