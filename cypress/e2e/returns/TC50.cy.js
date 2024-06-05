import userData from '../../fixtures/creds/company_with_products.json';
import nomenclature from '../../page_objects/nomenclature';
import dashBoard from '../../page_objects/dashBoard';
import sysMessages from '../../fixtures/system_notifications_and_messages.json'
import productData from '../../fixtures/TC50.json'

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithData);
        cy.closeSuccessNotification();
        dashBoard.goods.click();
    })

    it('create product return', () => {
        cy.chooseOptionFromList('Возврат поставщику');
        cy.clickOnButtonContains('Создать возврат');
        cy.searchProductByBarcodeOrNameFilter().type(productData.barcode);
        cy.dataLabel('Количество').find('input').clear().type(productData.quantity);
        cy.get('[data-icon="user-plus"]').click();
        cy.modalContent().contains(productData.seller).click();
        cy.modalContent().contains('Выбрать').click().wait(4000);
        cy.finish();
        cy.typeToTextArea(productData.comment);
        cy.confirm();
        cy.messageDisplayed(sysMessages.creationSuccess);
    })

    it('searches for existing product return in nomenclature/returns', () => {
        cy.chooseOptionFromList('Возврат поставщику');
        cy.get('[placeholder="Поиск товара"]').parent().typeSlow(productData.product_with_returns).wait(3000).type('{enter}');
        nomenclature.submitFilterButton.click();
        cy.selectRowAndColumnInTableBody(0, 7).click();
        cy.chooseOptionFromList('Просмотр');
        cy.selectRowAndColumnInTableBody(0, 1)
            .find('div')
            .first()
            .invoke('text')
            .then((text) => {
                const trimmedText = text.trim();
                expect(trimmedText).to.eq(productData.product_with_returns);
            });
    })
}) 
