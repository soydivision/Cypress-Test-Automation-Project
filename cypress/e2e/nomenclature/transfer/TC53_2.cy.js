import userData from '../../../fixtures/creds/company_with_products.json';
import sysMessages from '../../../fixtures/system_notifications_and_messages.json';
import dashBoard from '../../../page_objects/dashBoard';
import nomenclature from '../../../page_objects/nomenclature';
import data from '../../../fixtures/TC53_2.json';

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithMultipleWarehouses);
        cy.closeSuccessNotification();
        dashBoard.goods.click();
    })

    it('create transfer from one warehouse to another and check quantity afterwards', () => {
        // создать приемку
        nomenclature.acceptance.click();
        cy.acceptGoods();
        cy.get('.modal-content').contains(data.source_warehouse).click();
        cy.choose().wait(3000);
        cy.searchProductByBarcodeOrNameFilter().type(data.transfer_product_barcode).wait(3000);
        cy.dataLabel('Кол-во').find('input').wait(2000);
        cy.dataLabel('Кол-во').find('input').clear();
        cy.dataLabel('Кол-во').find('input').type(data.source_amount_before_transfer);
        cy.clickOnButtonContains('Завершить приемку');
        cy.clickOnButtonContains('Завершить сейчас');
        cy.modalContent().find('#invoice_form_search_vendor').click();
        cy.contains(data.supplier).click();
        cy.modalContent().find('.multiselect__placeholder').click();
        cy.modalContent().clickSpanByText(data.payment_method);
        cy.modalContent().pay();
        cy.messageDisplayed(sysMessages.creationSuccess);
        cy.dismissFeedbackWindow();

        // сделать перемещение
        dashBoard.goods.click();
        nomenclature.productTransfer.click();
        nomenclature.createProductTransfer.click();
        cy.modalContent().find('#fromStocksList').contains(data.source_warehouse).click();
        cy.modalContent().find('#toStocksList').contains(data.target_warehouse).click();
        cy.modalContent().choose();
        cy.searchProductByBarcodeOrNameFilter().typeSlow(data.transfer_product_barcode).wait(3000).type('{enter}');
        cy.dataLabel('Количество').find('input').wait(2000);
        cy.dataLabel('Количество').find('input').clear();
        cy.dataLabel('Количество').find('input').type(data.amount_to_transfer);
        cy.addProductBarSubmitClick();
        cy.messageDisplayed(sysMessages.creationSuccess);
        cy.get('tbody')
            .find('tr')
            .find('[type="button"]').first().click();
        cy.get('[role="menuitem"]').contains('Просмотр').click({ force: true });
        cy.dataLabel('Название').find('div').contains(data.product_name).should('be.visible');
        cy.dataLabel('Количество').find('div').contains(data.amount_to_transfer).should('be.visible');
        cy.dataLabel('Штрихкод').find('div').contains(data.transfer_product_barcode).should('be.visible');

        // проверить количество на складе 1
        dashBoard.goods.click();
        dashBoard.nomenclature.click();
        // nomenclature.list.click();
        nomenclature.filterBarcode.type(data.transfer_product_barcode);
        nomenclature.filterWarehouse.click();
        cy.get('span').find('.option-descr__title').contains(data.source_warehouse).click();
        nomenclature.submitFilterButton.click().wait(4000);
        cy.dataLabel('Количество').find('span').invoke('text').then((text) => {
            const trimmedString = text.replace(/\s/g, '');
            expect(trimmedString).to.equal(data.source_amount_after_transfer);
        })

        // проверить количество на складе 2
        nomenclature.resetFilter.click().wait(2000);
        nomenclature.filterBarcode.type(data.transfer_product_barcode);
        nomenclature.filterWarehouse.click();
        cy.get('span').find('.option-descr__title').contains(data.target_warehouse).click();
        nomenclature.submitFilterButton.click().wait(4000);
        cy.dataLabel('Количество').find('span').invoke('text').then((text) => {
            const trimmedString = text.replace(/\s/g, '');
            expect(trimmedString).to.equal(data.amount_to_transfer);
        })

        // списать с обоих складов
        dashBoard.goods.click();

        nomenclature.writeoffsButton.click();
        nomenclature.createWriteoffButton.click();
        cy.modalContent().contains(data.source_warehouse).click();
        cy.choose().wait(3000);
        cy.get('input').type(data.transfer_product_barcode).wait(2000);
        cy.get('#writeoff_form_value_row_1').type(data.source_amount_before_transfer);
        cy.clickSpanByText('Завершить');
        cy.typeToTextArea(data.comment);
        cy.get('#formWriteOff_submit').click();
        cy.messageDisplayed(sysMessages.creationSuccess);
        dashBoard.goods.click();
        nomenclature.writeoffsButton.click();
        nomenclature.createWriteoffButton.click();
        cy.modalContent().contains(data.target_warehouse).click();
        cy.choose().wait(3000);
        cy.get('input').type(data.transfer_product_barcode).wait(2000);
        cy.get('#writeoff_form_value_row_1').type(data.amount_to_transfer);
        cy.clickSpanByText('Завершить');
        cy.typeToTextArea(data.comment);
        cy.get('#formWriteOff_submit').click();
        cy.messageDisplayed(sysMessages.creationSuccess);

        // убедиться что товар списан product 1 и 2


        dashBoard.goods.click();
        dashBoard.nomenclature.click();
        // nomenclature.list.click();
        nomenclature.filterBarcode.type(data.transfer_product_barcode);
        nomenclature.filterWarehouse.click();
        cy.get('span').find('.option-descr__title').contains(data.source_warehouse).click();
        nomenclature.submitFilterButton.click().wait(4000);
        cy.dataLabel('Количество').find('span').invoke('text').then((text) => {
            const trimmedString = text.replace(/\s/g, '');
            expect(trimmedString).to.equal(data.amount_after_write_off);
        })

        nomenclature.resetFilter.click().wait(2000);
        nomenclature.filterBarcode.type(data.transfer_product_barcode);
        nomenclature.filterWarehouse.click();
        cy.get('span').find('.option-descr__title').contains(data.target_warehouse).click();
        nomenclature.submitFilterButton.click().wait(4000);
        cy.dataLabel('Количество').find('span').invoke('text').then((text) => {
            const trimmedString = text.replace(/\s/g, '');
            expect(trimmedString).to.equal(data.amount_after_write_off);
        })
    })
})



