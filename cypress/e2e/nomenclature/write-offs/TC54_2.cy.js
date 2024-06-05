import userData from '../../../fixtures/creds/company_with_products.json';
import sysMessages from '../../../fixtures/system_notifications_and_messages.json';
import dashBoard from '../../../page_objects/dashBoard';
import nomenclature from '../../../page_objects/nomenclature';
import RandomNumberGenerator from '../../../support/randomNumberGenerator';
import data from '../../../fixtures/TC54_2.json';

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithMultipleWarehouses);
        dashBoard.goods.click();
        dashBoard.nomenclature.click();
    })

    it('checks amount of products after write off', () => {
        const PRODUCT_CREATION_MAX_AMOUNT = 1000;
        const maxAmount = RandomNumberGenerator.generateRandomNumberInRange(2, PRODUCT_CREATION_MAX_AMOUNT);
        const writeOffAmount = RandomNumberGenerator.generateRandomNumberUnderUpperBound(maxAmount);
        const amountLeft = maxAmount - writeOffAmount;

        // create new product
        nomenclature.addProduct.click();
        nomenclature.monoTypeProduct.click();
        nomenclature.productNameInput.type(data.product_name);
        nomenclature.productUnitMultiselectButton.click();
        cy.chooseOptionFromList(data.measurement_unit);
        nomenclature.generateBarcodeButton.click().wait(2000);
        cy.get('#productFormExtended_barcodeInput')
            .invoke('val')
            .then((value) => {
                const barcodeValue = value;
                cy.wrap(barcodeValue).as('barcodeValue');
            });
        cy.get('#productFormExtended_quantity').type(maxAmount);
        // cy.clickSpanByText('Склад');
        cy.multiSelectPlaceholderContains('Склад').click();
        cy.clickSpanByText('Основной склад');
        nomenclature.saveProductButton.click();
        cy.dismissFeedbackWindow();
        cy.messageDisplayed(sysMessages.creationSuccess);

        // write off certain amount
        dashBoard.goods.click();
        nomenclature.writeoffsButton.click();
        nomenclature.createWriteoffButton.click();
        cy.modalContent().contains(data.main_warehouse).click();
        cy.choose().wait(3000);
        cy.get('@barcodeValue').then(barcode => {
            cy.get('input').type(barcode).wait(2000);
        })
        cy.get('#writeoff_form_value_row_1').type(writeOffAmount);
        cy.clickSpanByText('Завершить');
        cy.typeToTextArea(data.write_off_comment);
        cy.get('#formWriteOff_submit').click();
        cy.messageDisplayed(sysMessages.creationSuccess);

        // check amount after write off
        dashBoard.goods.click();
        dashBoard.nomenclature.click();
        cy.get('@barcodeValue').then(barcode => {
            nomenclature.filterBarcode.type(barcode);
        })
        nomenclature.submitFilterButton.click().wait(2000);
        cy.dataLabel('Количество').find('span').invoke('text').then((text) => {
            const trimmedString = text.replace(/\s/g, '');
            expect(parseInt(trimmedString)).to.equal(amountLeft);
        })

        // write off amount left
        dashBoard.goods.click();
        nomenclature.writeoffsButton.click();
        nomenclature.createWriteoffButton.click();
        cy.modalContent().contains(data.main_warehouse).click();
        cy.choose().wait(3000);
        cy.get('@barcodeValue').then(barcode => {
            cy.get('input').type(barcode).wait(2000);
        })
        cy.get('#writeoff_form_value_row_1').type(amountLeft);
        cy.clickSpanByText('Завершить');
        cy.typeToTextArea(data.write_off_comment);
        cy.get('#formWriteOff_submit').click();
        cy.messageDisplayed(sysMessages.creationSuccess);

        // remove product
        dashBoard.goods.click();
        dashBoard.nomenclature.click();
        cy.get('@barcodeValue').then(barcode => {
            nomenclature.filterBarcode.type(barcode);
        });
        nomenclature.submitFilterButton.click().wait(2000);
        cy.get('tbody[role="rowgroup"]').find('#product_row_1_checkbox').click({ force: true });
        nomenclature.deleteMultipleButton.click();
        cy.get('.modal-content').find('button').contains('Удалить').click();
        cy.messageDisplayed(sysMessages.oneElementIsRemovedSuccess);
    })
})