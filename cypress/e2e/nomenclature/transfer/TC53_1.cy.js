import userData from '../../../fixtures/creds/company_with_products.json';
import sysMessages from '../../../fixtures/system_notifications_and_messages.json';
import dashBoard from '../../../page_objects/dashBoard';
import nomenclature from '../../../page_objects/nomenclature';
import data from '../../../fixtures/TC53_1.json';
import RandomNumberGenerator from '../../../support/randomNumberGenerator';

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithMultipleWarehouses);
        cy.closeSuccessNotification();
        dashBoard.goods.click();
        dashBoard.nomenclature.click().wait(2000);
        nomenclature.productTransfer.click();
        nomenclature.createProductTransfer.click();
    })

    it('create transfer from one warehouse to another', () => {
        const amountToTransfer = RandomNumberGenerator.generateRandomNumberInRange(data.min_amount * 1, data.max_amount * 1);
        cy.modalContent().find('#fromStocksList').contains(data.source_warehouse).click();
        cy.modalContent().find('#toStocksList').contains(data.target_warehouse).click();
        cy.modalContent().choose();
        cy.searchProductByBarcodeOrNameFilter().typeSlow(data.transfer_product_barcode).wait(2000).type('{enter}');
        cy.dataLabel('Количество').find('input').clear().type(amountToTransfer);
        cy.addProductBarSubmitClick();
        cy.messageDisplayed(sysMessages.creationSuccess);
        cy.get('tbody')
            .find('tr')
            .find('[type="button"]').first().click();

        cy.get('[role="menuitem"]').contains('Просмотр').click({ force: true });
        cy.selectRowAndColumnInTableBody(0, 2)
            .find('div')
            .invoke('text')
            .then((text) => {
                const strippedText = text.replace(/\D/g, '');
                const trimmedSumm = parseInt(strippedText);
                expect(trimmedSumm).to.eq(parseInt(amountToTransfer));
            });
    })
})