import userData from '../../../fixtures/creds/company_with_products.json';
import sysMessages from '../../../fixtures/system_notifications_and_messages.json';
import dashBoard from '../../../page_objects/dashBoard';
import nomenclature from '../../../page_objects/nomenclature';
import RandomNumberGenerator from '../../../support/randomNumberGenerator';

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithData);
        cy.closeSuccessNotification();
        dashBoard.goods.click();
        dashBoard.nomenclature.click();
        // nomenclature.list.click();
    })

    it('create multitype product in pcs', () => {
        nomenclature.addProduct.click();
        nomenclature.multiTypeProduct.click();
        nomenclature.multiProductNameInput.typeSlow('Galactic annihilator');
        nomenclature.productUnitMultiselectButton.click();
        // pick a random measurement unit from list 
        cy.get('#productCreateBaseInfo_unitName').find('.multiselect__element').
            then($elements => {
                cy.wrap($elements[RandomNumberGenerator.generateRandomNumberUnderUpperBound($elements.length)]).click();
            });
        nomenclature.generateBarcodeButton.click().wait(1000);
        // save barcode
        cy.get('#productCreateBaseInfo_barcodeInput')
            .invoke('val')
            .then((value) => {
                const barcodeValue = value;
                cy.wrap(barcodeValue).as('barcodeValue');
            });

        cy.proceed();
        cy.addCharacteristic().wait(2000);
        cy.chooseCharacteristic('Размер');
        cy.get('[placeholder="Например XS"]').type('X');
        cy.get('.outline-dashed').click();
        cy.get('[placeholder="Например XS"]').last().type('M');
        cy.get('.outline-dashed').click();
        cy.get('[placeholder="Например XS"]').last().type('L');
        cy.addCharacteristic();
        cy.chooseCharacteristic('Цвет');
        cy.clickSpanByText('Не выбрано');
        cy.chooseOptionFromList('Красный');
        cy.get('.outline-dashed').last().click();
        cy.clickSpanByText('Не выбрано');
        cy.chooseOptionFromList('Зеленый');
        cy.get('.outline-dashed').last().click();
        cy.clickSpanByText('Не выбрано');
        cy.chooseOptionFromList('Синий');
        cy.proceed();
        nomenclature.generateBarcodeButton.click().wait(1000);
        cy.proceed();
        cy.createProduct();
        cy.get('button[class="close"]').click();

        // remove created product
        dashBoard.goods.click();
        dashBoard.nomenclature.click();
        // nomenclature.list.click();
        cy.get('@barcodeValue').then(barcode => {
            nomenclature.filterBarcode.type(barcode).wait(2000);;
        })
        nomenclature.submitFilterButton.click().wait(2000);
        cy.get('tbody[role="rowgroup"]').find('#product_row_1_checkbox').click({ force: true });
        nomenclature.deleteMultipleButton.click();
        cy.get('.modal-content').find('button').contains('Удалить').click();
        cy.messageDisplayed(sysMessages.oneElementIsRemovedSuccess);
    })
})
