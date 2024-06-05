import userData from '../../../fixtures/creds/company_with_products.json';
import sysMessages from '../../../fixtures/system_notifications_and_messages.json';
import dashBoard from '../../../page_objects/dashBoard';
import nomenclature from '../../../page_objects/nomenclature';
import RandomNumberGenerator from '../../../support/randomNumberGenerator';
import data from '../../../fixtures/TC51_2.json'

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithData);
        cy.closeSuccessNotification();
        dashBoard.goods.click();
        dashBoard.nomenclature.click();
    })

    it('create product in pcs', () => {
        nomenclature.addProduct.click();
        nomenclature.monoTypeProduct.click();
        cy.get('input[type=file]').selectFile('cypress\/fixtures\/Sinn_Sisamouth.jpg', { force: true });
        nomenclature.productNameInput.type(data.product_in_pcs_name);
        nomenclature.productUnitMultiselectButton.click();
        cy.chooseOptionFromList(data.product_in_pcs_measurement_unit);
        nomenclature.generateBarcodeButton.click().wait(2000);
        cy.get('#productFormExtended_barcodeInput')
            .invoke('val')
            .then((value) => {
                const barcodeValueForProductInPcs = value;
                cy.wrap(barcodeValueForProductInPcs).as('barcodeValueForProductInPcs');
            });

        nomenclature.saveProductButton.click();
        cy.clickButtonByText('Создать без приемки');
        cy.messageDisplayed(sysMessages.creationSuccess);
        cy.get('button[class="close"]').click().wait(5000);
        // remove created product
        dashBoard.goods.click();
        dashBoard.nomenclature.click();
        cy.get('@barcodeValueForProductInPcs').then(barcode => {
            nomenclature.filterBarcode.type(barcode).wait(2000);;
        })
        nomenclature.submitFilterButton.click().wait(2000);
        cy.get('tbody[role="rowgroup"]').find('#product_row_1_checkbox').click({ force: true });
        nomenclature.deleteMultipleButton.click();
        cy.get('.modal-content').find('button').contains('Удалить').click();
        cy.messageDisplayed(sysMessages.oneElementIsRemovedSuccess);
    })

    it('create product in gramm', () => {
        nomenclature.addProduct.click();
        nomenclature.monoTypeProduct.click();
        nomenclature.productNameInput.type(data.product_in_gramms_name);
        nomenclature.productUnitMultiselectButton.click();
        cy.chooseOptionFromList(data.product_in_gramms_name_measurement);
        nomenclature.generateBarcodeButton.click().wait(2000);
        cy.get('#productFormExtended_barcodeInput')
            .invoke('val')
            .then((value) => {
                const barcodeValueForProductInPcs = value;
                cy.wrap(barcodeValueForProductInPcs).as('barcodeValueForProductInPcs');
            });

        nomenclature.saveProductButton.click();
        cy.clickButtonByText('Создать без приемки');
        cy.messageDisplayed(sysMessages.creationSuccess);
        cy.get('button[class="close"]').click().wait(5000);
        // remove created product
        dashBoard.goods.click();
        dashBoard.nomenclature.click();
        cy.get('@barcodeValueForProductInPcs').then(barcode => {
            nomenclature.filterBarcode.type(barcode).wait(2000);;
        })
        nomenclature.submitFilterButton.click().wait(2000);
        cy.get('tbody[role="rowgroup"]').find('#product_row_1_checkbox').click({ force: true });
        nomenclature.deleteMultipleButton.click();
        cy.get('.modal-content').find('button').contains('Удалить').click();
        cy.messageDisplayed(sysMessages.oneElementIsRemovedSuccess);
    })

    it('create product in littre', () => {
        nomenclature.addProduct.click();
        nomenclature.monoTypeProduct.click();
        nomenclature.productNameInput.type(data.product_in_littre_name);
        nomenclature.productUnitMultiselectButton.click();
        cy.chooseOptionFromList(data.product_in_littre_name_measurement);
        nomenclature.generateBarcodeButton.click().wait(2000);
        cy.get('#productFormExtended_barcodeInput')
            .invoke('val')
            .then((value) => {
                const barcodeValueForProductInPcs = value;
                cy.wrap(barcodeValueForProductInPcs).as('barcodeValueForProductInPcs');
            });
        nomenclature.saveProductButton.click();
        cy.clickButtonByText('Создать без приемки');
        cy.messageDisplayed(sysMessages.creationSuccess);
        cy.get('button[class="close"]').click().wait(5000);
        // remove created product
        dashBoard.goods.click();
        dashBoard.nomenclature.click();
        cy.get('@barcodeValueForProductInPcs').then(barcode => {
            nomenclature.filterBarcode.type(barcode).wait(2000);;
        })
        nomenclature.submitFilterButton.click().wait(2000);
        cy.get('tbody[role="rowgroup"]').find('#product_row_1_checkbox').click({ force: true });
        nomenclature.deleteMultipleButton.click();
        cy.get('.modal-content').find('button').contains('Удалить').click();
        cy.messageDisplayed(sysMessages.oneElementIsRemovedSuccess);
    })

    it('create product in square m', () => {
        nomenclature.addProduct.click();
        nomenclature.monoTypeProduct.click();
        nomenclature.productNameInput.type(data.product_in_sq_m_name);
        nomenclature.productUnitMultiselectButton.click();
        cy.chooseOptionFromList(data.product_in_sq_m_name_measurement);
        nomenclature.generateBarcodeButton.click().wait(2000);
        cy.get('#productFormExtended_barcodeInput')
            .invoke('val')
            .then((value) => {
                const barcodeValueForProductInPcs = value;
                cy.wrap(barcodeValueForProductInPcs).as('barcodeValueForProductInPcs');
            });
        nomenclature.saveProductButton.click();
        cy.clickButtonByText('Создать без приемки');
        cy.messageDisplayed(sysMessages.creationSuccess);
        cy.get('button[class="close"]').click().wait(5000);

        // remove created product
        dashBoard.goods.click();
        dashBoard.nomenclature.click();

        cy.get('@barcodeValueForProductInPcs').then(barcode => {
            nomenclature.filterBarcode.type(barcode).wait(2000);
        })
        nomenclature.submitFilterButton.click().wait(2000);
        cy.get('tbody[role="rowgroup"]').find('#product_row_1_checkbox').click({ force: true });
        nomenclature.deleteMultipleButton.click();
        cy.get('.modal-content').find('button').contains('Удалить').click();
        cy.messageDisplayed(sysMessages.oneElementIsRemovedSuccess);
    })

    it('create product in conventional unit', () => {
        nomenclature.addProduct.click();
        nomenclature.monoTypeProduct.click();
        nomenclature.productNameInput.type(data.product_in_conventional_unit_name);
        nomenclature.productUnitMultiselectButton.click();
        cy.chooseOptionFromList(data.product_in_conventional_unit_measurement);
        nomenclature.generateBarcodeButton.click().wait(2000);
        cy.get('#productFormExtended_barcodeInput')
            .invoke('val')
            .then((value) => {
                const barcodeValueForProductInPcs = value;
                cy.wrap(barcodeValueForProductInPcs).as('barcodeValueForProductInPcs');
            });
        nomenclature.saveProductButton.click();
        cy.clickButtonByText('Создать без приемки');
        cy.messageDisplayed(sysMessages.creationSuccess);
        cy.get('button[class="close"]').click().wait(5000);

        // remove created product
        dashBoard.goods.click();
        dashBoard.nomenclature.click();
        cy.get('@barcodeValueForProductInPcs').then(barcode => {
            nomenclature.filterBarcode.type(barcode).wait(2000);;
        })
        nomenclature.submitFilterButton.click().wait(2000);
        cy.get('tbody[role="rowgroup"]').find('#product_row_1_checkbox').click({ force: true });
        nomenclature.deleteMultipleButton.click();
        cy.get('.modal-content').find('button').contains('Удалить').click();
        cy.messageDisplayed(sysMessages.oneElementIsRemovedSuccess);
    })

    it('create product in random measurement unit', () => {
        nomenclature.addProduct.click();
        nomenclature.monoTypeProduct.click();
        nomenclature.productNameInput.type(data.random_product_name);
        nomenclature.productUnitMultiselectButton.click();
        // pick a random measurement unit from list 
        cy.get('#productFormExtended_unitName').find('.multiselect__element').
            then($elements => {
                cy.wrap($elements[RandomNumberGenerator.generateRandomNumberUnderUpperBound($elements.length)]).click();
            });

        nomenclature.generateBarcodeButton.click().wait(2000);
        cy.get('#productFormExtended_barcodeInput')
            .invoke('val')
            .then((value) => {
                const barcodeValueForProductInPcs = value;
                cy.wrap(barcodeValueForProductInPcs).as('barcodeValueForProductInPcs');
            });
        nomenclature.saveProductButton.click();
        cy.clickButtonByText('Создать без приемки');
        cy.messageDisplayed(sysMessages.creationSuccess);
        cy.get('button[class="close"]').click().wait(5000);

        // remove created product
        dashBoard.goods.click();
        dashBoard.nomenclature.click();
        cy.get('@barcodeValueForProductInPcs').then(barcode => {
            nomenclature.filterBarcode.type(barcode).wait(2000);;
        })
        nomenclature.submitFilterButton.click().wait(2000);
        cy.get('tbody[role="rowgroup"]').find('#product_row_1_checkbox').click({ force: true });
        nomenclature.deleteMultipleButton.click();
        cy.get('.modal-content').find('button').contains('Удалить').click();
        cy.messageDisplayed(sysMessages.oneElementIsRemovedSuccess);
    })
})
