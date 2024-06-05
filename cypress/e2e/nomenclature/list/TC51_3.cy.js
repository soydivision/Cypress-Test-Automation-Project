import userData from '../../../fixtures/creds/company_with_products.json';
import nomenclature from '../../../page_objects/nomenclature';
import dashBoard from '../../../page_objects/dashBoard';
import { constants } from '../../../support/constants';
import data from '../../../fixtures/TC51_3.json';

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithData);
        cy.closeSuccessNotification();

        dashBoard.goods.click();
        dashBoard.nomenclature.click();
        Cypress.config('defaultCommandTimeout', 5000);
    })

    it('creates products from excel file with quantity and (both purchase and selling) prices', () => {
        // check and save 654635161616531 quantity
        nomenclature.filterBarcode.type('654635161616531');
        nomenclature.submitFilterButton.click().wait(1000);
        cy.selectRowAndColumnInTableBody(0, 6)
            .find('div span')
            .invoke('text')
            .then((value) => {
                const amountInStocktrimmedText = value.trim().replace(/\s+/g, '');
                cy.wrap(amountInStocktrimmedText).as('amountInStock');
                cy.log(amountInStocktrimmedText);
            });
        // begin import
        nomenclature.addProduct.click();
        nomenclature.importNomenclature.click();
        cy.get('input[type=file]').selectFile(data.excelPath, { action: 'drag-drop' });
        cy.clickContinue();
        cy.get('th[aria-colindex="1"]').click();
        cy.get('th[aria-colindex="1"]').contains('Наименование').click();
        cy.get('th[aria-colindex="2"]').click();
        cy.get('th[aria-colindex="2"]').contains('Штрихкод').click();
        cy.get('th[aria-colindex="3"]').click();
        cy.get('th[aria-colindex="3"]').contains('Ед. измерения').click();
        cy.get('th[aria-colindex="4"]').click();
        cy.get('th[aria-colindex="4"]').contains('Цена продажи').click();
        cy.get('th[aria-colindex="5"]').click();
        cy.get('th[aria-colindex="5"]').contains('Цена закупки').click();
        cy.get('th[aria-colindex="6"]').click();
        cy.get('th[aria-colindex="6"]').contains('Категория').click();
        cy.get('th[aria-colindex="7"]').click();
        cy.get('th[aria-colindex="7"]').contains('Остаток на складе').click();
        cy.get('th[aria-colindex="8"]').click();
        cy.get('th[aria-colindex="8"]').contains('Артикул').click();
        cy.get('button').contains('Импортировать').click();
        cy.modalContent().contains(userData.warehouse).click();
        cy.choose();
        cy.get('button').contains('Хорошо').click().wait(constants.EXCEL_IMPORT_TIMEOUT);
        cy.notifications();
        cy.contains('Номенклатура успешно импортирована!').should('be.visible');
        cy.contains('Очистить всё').click();
        // search for imported product with 0 quantity
        dashBoard.goods.click();
        dashBoard.nomenclature.click();
        nomenclature.filterBarcode.type(data.importedProductBarcode);
        nomenclature.submitFilterButton.click().wait(1000);
        cy.get('td').contains('Нет результатов').should('not.exist');
        cy.selectRowAndColumnInTableBody(0, 2)
            .find('div')
            .invoke('text')
            .then((text) => {
                const trimmedText = text.trim().replace(/\s+/g, ' ');
                expect(trimmedText).to.include(data.importedProductName);
            });
        // remove imported product
        cy.get('[for="product_row_all_checkbox"]').click({ force: true });
        cy.get('#multiple_action_delete').click();
        cy.modalContent().contains('Удалить').click();
        // assert removed
        nomenclature.filterBarcode.clear().type(data.importedProductBarcode);
        nomenclature.submitFilterButton.click().wait(1000);
        cy.get('td').contains('Нет результатов').should('exist');

        // check 654635161616531 quantity 
        dashBoard.goods.click();
        dashBoard.nomenclature.click();
        nomenclature.filterBarcode.type('654635161616531');
        nomenclature.submitFilterButton.click().wait(1000);
        cy.get('@amountInStock').then(amountInStock => {
            const expectedInStock = parseInt(amountInStock, 10) + 100;
            cy.selectRowAndColumnInTableBody(0, 6)
                .find('div span')
                .invoke('text')
                .then((value) => {
                    const amountInStocktrimmedTextAfterAccept = value.trim().replace(/\s+/g, '');
                    expect(expectedInStock).to.eq(parseInt(amountInStocktrimmedTextAfterAccept, 10));
                });
        });
    })
})