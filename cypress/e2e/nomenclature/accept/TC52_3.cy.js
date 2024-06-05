import userData from '../../../fixtures/creds/company_with_products.json'
import dashBoard from '../../../page_objects/dashBoard';
import nomenclature from '../../../page_objects/nomenclature';
import sysMessages from '../../../fixtures/system_notifications_and_messages.json'
import data from '../../../fixtures/TC52_3.json'

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithMultipleWarehouses);
        cy.closeSuccessNotification();
        dashBoard.goods.click();
        dashBoard.nomenclature.click();
        nomenclature.acceptance.click();
    })

    it('creates accept from nomenclature and checks quantity in main warehouse', () => {
        cy.acceptGoods();
        cy.get('.modal-content').contains(data.main_warehouse).click();
        cy.choose();
        cy.searchProductByBarcodeOrNameFilter().type(data.barcode).wait(1000);
        cy.dataLabel('Кол-во').find('input').clear().type(data.quantity);
        cy.clickOnButtonContains('Завершить приемку');
        cy.clickOnButtonContains('Завершить сейчас');
        cy.modalContent().find('#invoice_form_search_vendor').click();
        cy.contains(data.supplier).click();
        cy.modalContent().find('.multiselect__placeholder').click();
        cy.modalContent().clickSpanByText(data.payment_method);
        cy.modalContent().pay();
        cy.messageDisplayed(sysMessages.creationSuccess);
        cy.dismiss();

        // check the amount
        dashBoard.goods.click();
        dashBoard.nomenclature.click();
        nomenclature.filterBarcode.type(data.barcode);
        nomenclature.submitFilterButton.click().wait(2000);
        cy.dataLabel('Количество').find('span').invoke('text').then((text) => {
            const trimmedString = text.replace(/\s/g, '');
            expect(trimmedString).to.equal(data.quantity);
        })

        // write off 
        dashBoard.goods.click();
        nomenclature.writeoffsButton.click();
        nomenclature.createWriteoffButton.click();
        cy.modalContent().contains(data.main_warehouse).click();
        cy.choose().wait(1500);
        cy.get('input').type(data.barcode).wait(2000);
        cy.get('#writeoff_form_value_row_1').type(data.quantity);
        cy.clickSpanByText('Завершить');
        cy.typeToTextArea(data.comment);
        cy.get('#formWriteOff_submit').click();
        cy.messageDisplayed(sysMessages.creationSuccess);
    })

    it('creates accept from nomenclature and checks quantity in second warehouse', () => {
        cy.acceptGoods();
        cy.get('.modal-content').contains(data.second_warehouse).click();
        cy.choose();
        cy.searchProductByBarcodeOrNameFilter().type(data.barcode_2).wait(1000);
        cy.dataLabel('Кол-во').find('input').clear().type(data.quantity_2);
        cy.clickOnButtonContains('Завершить приемку');
        cy.clickOnButtonContains('Завершить сейчас');
        cy.modalContent().find('#invoice_form_search_vendor').click();
        cy.contains(data.supplier).click();
        cy.modalContent().find('.multiselect__placeholder').click();
        cy.modalContent().clickSpanByText(data.payment_method);
        cy.modalContent().pay();
        cy.messageDisplayed(sysMessages.creationSuccess);
        cy.dismiss();

        // check the amount
        dashBoard.goods.click();
        dashBoard.nomenclature.click();

        nomenclature.filterBarcode.type(data.barcode_2);
        nomenclature.submitFilterButton.click().wait(2000);
        cy.dataLabel('Количество').find('span').invoke('text').then((text) => {
            const trimmedString = text.replace(/\s/g, '');
            expect(trimmedString).to.equal(data.quantity_2);
        })

        // write off 
        dashBoard.goods.click();
        nomenclature.writeoffsButton.click();
        nomenclature.createWriteoffButton.click();
        cy.modalContent().contains(data.second_warehouse).click();
        cy.choose().wait(1500);
        cy.get('input').type(data.barcode_2).wait(2000);
        cy.get('#writeoff_form_value_row_1').type(data.quantity_2);
        cy.clickSpanByText('Завершить');
        cy.typeToTextArea(data.comment);
        cy.get('#formWriteOff_submit').click();
        cy.messageDisplayed(sysMessages.creationSuccess);
    })
})