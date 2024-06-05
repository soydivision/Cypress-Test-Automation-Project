import userData from '../../../fixtures/creds/company_with_products.json'
import dashBoard from '../../../page_objects/dashBoard';
import nomenclature from '../../../page_objects/nomenclature';
import sysMessages from '../../../fixtures/system_notifications_and_messages.json'
import data from '../../../fixtures/TC52_2.json'
import { constants } from '../../../support/constants';

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithData);
        cy.closeSuccessNotification();
    })

    it('creates accept from excel file', () => {
        // check and save product quantity
        dashBoard.goods.click();
        dashBoard.nomenclature.click();
        nomenclature.filterBarcode.type(data.barcode);
        nomenclature.submitFilterButton.click().wait(1000);

        cy.selectRowAndColumnInTableBody(0, 6)
            .find('div span')
            .invoke('text')
            .then((value) => {
                const amountInStocktrimmedText = value.trim().replace(/\s+/g, '');
                cy.wrap(amountInStocktrimmedText).as('amountInStock');
                cy.log(amountInStocktrimmedText);
            });

        // make accept   
        dashBoard.goods.click();
        nomenclature.acceptance.click();
        nomenclature.uploadExcel.click('left');
        cy.get('.multiselect__placeholder').contains('Склад').click();
        cy.get('li').clickSpanByText('Основной склад');
        cy.get('.multiselect__placeholder').contains('Поиск поставщика').type(data.supplier);
        cy.get('input[type=file]').selectFile(data.excel_path, { force: true });
        cy.selectRowAndColumnInTableHead(0, 1).click();
        cy.get('th[aria-colindex="2"]').contains('Штрихкод').click();
        cy.selectRowAndColumnInTableHead(0, 4).click();
        cy.get('th[aria-colindex="5"]').contains('Цена закупки').click();
        cy.selectRowAndColumnInTableHead(0, 6).click();
        cy.get('th[aria-colindex="7"]').contains('Количество').click();
        cy.get('button#invoice_from_file_create').click()
        cy.messageDisplayed(sysMessages.creationSuccess);
        cy.wait(constants.EXCEL_IMPORT_TIMEOUT);

        // check product quantity 
        dashBoard.goods.click();
        dashBoard.nomenclature.click();
        nomenclature.filterBarcode.type(data.barcode);
        nomenclature.submitFilterButton.click().wait(1000);
        cy.get('@amountInStock').then(amountInStock => {
            const expectedInStock = parseInt(amountInStock, 10) + 50;
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