import userData from '../../../fixtures/creds/company_with_products.json';
import productData from '../../../fixtures/TC51_1.json';
import multiProductToAccept from '../../../fixtures/TC51_1_2.json';
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
    })

    it('creates monotype product without accepting it to warehouse and then removes it', () => {
        nomenclature.addProduct.click();
        nomenclature.monoTypeProduct.click();
        nomenclature.productNameInput.type(productData.mono_product_name);
        nomenclature.productUnitMultiselectButton.click();
        cy.chooseOptionFromList(productData.measurementUnit_for_mono).wait(1000);
        nomenclature.generateBarcodeButton.click().wait(1000);
        cy.get('#productFormExtended_barcodeInput')
            .invoke('val')
            .then((value) => {
                const barcodeValue = value;
                cy.wrap(barcodeValue).as('barcodeValue');
            });
        nomenclature.saveProductButton.click();
        cy.clickButtonByText('Создать без приемки');
        cy.messageDisplayed(sysMessages.creationSuccess);
        cy.dismissFeedbackWindow();
        // remove created product
        dashBoard.goods.click();
        dashBoard.nomenclature.click();
        cy.get('@barcodeValue').then(barcodeValue => {
            nomenclature.filterBarcode.type(barcodeValue);
        })
        nomenclature.submitFilterButton.click().wait(1500);
        cy.dataLabel('Количество').find('span').invoke('text').then((text) => {
            const trimmedString = text.replace(/\s/g, '');
            expect(trimmedString).to.equal('0');
        })
        cy.get('tbody[role="rowgroup"]').find('#product_row_1_checkbox').click({ force: true });
        nomenclature.deleteMultipleButton.click();
        cy.get('.modal-content').find('button').contains('Удалить').click();
        cy.messageDisplayed(sysMessages.oneElementIsRemovedSuccess);
    })

    it('creates monotype product and accepts it to warehouse and then removes it', () => {
        let randomBarcode =
            RandomNumberGenerator.generateRandomNumberInRange(1000000000000, 9999999999999);
        cy.log(randomBarcode);
        nomenclature.addProduct.click();
        nomenclature.monoTypeProduct.click();
        nomenclature.productNameInput.type(productData.mono_product_name);
        nomenclature.productUnitMultiselectButton.click();
        cy.chooseOptionFromList(productData.measurementUnit_for_mono);
        nomenclature.barcodeInput.type(randomBarcode);
        cy.get('fieldset').contains('Поставщик').parent().find('.multiselect').type(productData.monoProductSupplier);
        cy.get('fieldset').contains('Количество').parent().type(productData.quantity_mono_product);
        nomenclature.saveProductButton.click();
        cy.messageDisplayed(sysMessages.creationSuccess);
        cy.dismissFeedbackWindow();

        // write off 
        dashBoard.goods.click();
        nomenclature.writeoffsButton.click();
        nomenclature.createWriteoffButton.click().wait(3000);
        cy.get('input').type(randomBarcode).wait(3000).type('{enter}');
        // check the quantity
        cy.get('td[aria-colindex="4"]').find('div').invoke('text').then((text) => {
            const trimmedString = text.replace(/\s/g, '');
            expect(trimmedString).to.equal(productData.quantity_mono_product);
        });
        cy.get('#writeoff_form_value_row_1').type(productData.quantity_mono_product);
        cy.clickSpanByText('Завершить');
        cy.typeToTextArea(productData.write_off_comment);
        cy.get('#formWriteOff_submit').click();
        cy.messageDisplayed(sysMessages.creationSuccess);

        // remove product
        dashBoard.goods.click();
        dashBoard.nomenclature.click();
        nomenclature.filterBarcode.type(randomBarcode);
        nomenclature.submitFilterButton.click().wait(1500);
        cy.get('tbody[role="rowgroup"]').find('#product_row_1_checkbox').click({ force: true });
        nomenclature.deleteMultipleButton.click();
        cy.get('.modal-content').find('button').contains('Удалить').click();
        cy.messageDisplayed(sysMessages.oneElementIsRemovedSuccess);
    })

    it('creates multitype product without accepting it to warehouse and then removes it', () => {
        nomenclature.addProduct.click().wait(1500);
        nomenclature.multiTypeProduct.click().wait(1500);
        nomenclature.multiProductNameInput.typeSlow(productData.multi_type_product_name);
        nomenclature.productUnitMultiselectButton.click();
        cy.chooseOptionFromList(productData.measurementUnit_for_multi);
        nomenclature.generateBarcodeButton.click().wait(1500);
        cy.get('#productCreateBaseInfo_barcodeInput')
            .invoke('val')
            .then((value) => {
                const barcodeValue = value;
                cy.wrap(barcodeValue).as('barcode');
            });
        cy.proceed();
        cy.addCharacteristic().wait(3000);
        cy.chooseCharacteristic(productData.characteristic_type);
        cy.get('[placeholder="Например Объем"]').type(productData.characteristic_name);
        cy.get('button')
            .find('svg[data-icon="check"][data-prefix="fal"]')
            .click();
        cy.get('[placeholder="Например 0,5 кг."]').type(productData.characteristic_value);
        cy.proceed();
        nomenclature.generateBarcodeButton.click().wait(1000);
        cy.proceed();
        cy.createProduct();
        cy.dismissFeedbackWindow();

        // remove created multi product
        // nomenclature.list.click();
        dashBoard.goods.click();
        dashBoard.nomenclature.click();
        cy.get('@barcode').then(barcode => {
            nomenclature.filterBarcode.type(barcode);
        })
        nomenclature.submitFilterButton.click().wait(1500);
        // check quantity
        cy.dataLabel('Количество').find('span').invoke('text').then((text) => {
            const trimmedString = text.replace(/\s/g, '');
            expect(trimmedString).to.equal('0');
        })
        cy.get('tbody[role="rowgroup"]').find('#product_row_1_checkbox').click({ force: true });
        nomenclature.deleteMultipleButton.click();
        cy.get('.modal-content').find('button').contains('Удалить').click();
        cy.messageDisplayed(sysMessages.oneElementIsRemovedSuccess);
    })

    it.only('creates multitype product and accepts it to warehouse and then removes children products', () => {
        nomenclature.addProduct.click().wait(2000);
        nomenclature.multiTypeProduct.click().wait(2000);
        nomenclature.multiProductNameInput.typeSlow(multiProductToAccept.multi_type_product_name);
        nomenclature.productUnitMultiselectButton.click();
        cy.chooseOptionFromList(multiProductToAccept.measurementUnit_for_multi);
        nomenclature.generateBarcodeButton.click().wait(2000);
        cy.get('#productCreateBaseInfo_barcodeInput')
            .invoke('val')
            .then((value) => {
                const barcodeValue_parent = value;
                cy.wrap(barcodeValue_parent).as('barcode_parent');
            });
        cy.proceed();
        // color characteristic
        cy.addCharacteristic();
        cy.chooseCharacteristic(multiProductToAccept.characteristic_3_name);
        cy.clickSpanByText('Не выбрано');
        cy.get('li').contains(multiProductToAccept.characteristic_3_value).click();
        cy.get('[data-icon="plus"]').click();
        cy.clickSpanByText('Не выбрано');
        cy.get('li').contains(multiProductToAccept.characteristic_4_value).click();
        // custom characteristic
        cy.addCharacteristic();
        cy.chooseCharacteristic(multiProductToAccept.characteristic_type);
        cy.get('[placeholder="Например Объем"]').type(multiProductToAccept.characteristic_name);
        cy.get('button')
            .find('svg[data-icon="check"][data-prefix="fal"]')
            .click();
        cy.get('[placeholder="Например 0,5 кг."]').type(multiProductToAccept.characteristic_value);
        // size characteristic
        cy.addCharacteristic();
        cy.chooseCharacteristic(multiProductToAccept.characteristic_2_name);
        cy.get('[placeholder="Например XS"]').type(multiProductToAccept.characteristic_2_value);
        cy.proceed();
        nomenclature.generateBarcodeButton.click().wait(2000);
        cy.get('td[data-label="Штрихкод"]')
            .find('input#product_characteristics_barcodeInput')
            .invoke('val')
            .then((value) => {
                const barcodeValue_1 = value;
                cy.wrap(barcodeValue_1).as('barcode_1');
            });

        cy.get('td[data-label="Штрихкод"]')
            .eq(1)
            .find('input#product_characteristics_barcodeInput')
            .invoke('val')
            .then((value) => {
                const barcodeValue_2 = value;
                cy.wrap(barcodeValue_2).as('barcode_2');
            });
        cy.get('[data-label="Кол-во"]').find('input').first().type(multiProductToAccept.quantity_of_type_1);
        cy.get('[data-label="Цена закупки"]').find('input').first().type('50');
        cy.get('[data-label="Цена продажи"]').find('input').first().type('56');
        cy.get('[data-label="Кол-во"]').find('input').last().type(multiProductToAccept.quantity_of_type_2);
        cy.get('[data-label="Цена закупки"]').find('input').last().type('29');
        cy.get('[data-label="Цена продажи"]').find('input').last().type('31');
        cy.proceed();
        cy.get('fieldset').contains('Поставщик').parent().find('.multiselect').type(multiProductToAccept.mono_product_supplier2);
        // cy.get('li').contains(multiProductToAccept.mono_product_supplier2).click();


        cy.createProduct().wait(2000);
        cy.dismissFeedbackWindow();

        // write off
        dashBoard.goods.click();
        nomenclature.writeoffsButton.click();
        nomenclature.createWriteoffButton.click().wait(1500);
        cy.get('@barcode_1').then(barcode_1 => {
            cy.get('input').type(barcode_1).wait(1500).type('{enter}');
        })

        //check the quantity
        cy.get('td[aria-colindex="4"]').find('div').invoke('text').then((text) => {
            const trimmedString = text.replace(/\s/g, '');
            expect(trimmedString).to.equal(multiProductToAccept.quantity_of_type_1);
        });
        cy.get('#writeoff_form_value_row_1').type(multiProductToAccept.quantity_of_type_1).wait(1000);
        cy.clickSpanByText('Завершить');
        cy.typeToTextArea(productData.write_off_comment);
        cy.get('#formWriteOff_submit').click();
        cy.messageDisplayed(sysMessages.creationSuccess);

        dashBoard.goods.click();
        nomenclature.writeoffsButton.click();
        nomenclature.createWriteoffButton.click().wait(1000);
        cy.get('@barcode_2').then(barcode_2 => {
            cy.get('input').type(barcode_2).wait(1000).type('{enter}');
        })

        //check the quantity
        cy.get('td[aria-colindex="4"]').find('div').invoke('text').then((text) => {
            const trimmedString = text.replace(/\s/g, '');
            expect(trimmedString).to.equal(multiProductToAccept.quantity_of_type_2);
        });
        cy.get('#writeoff_form_value_row_1').type(multiProductToAccept.quantity_of_type_2).wait(1000);
        cy.clickSpanByText('Завершить');
        cy.typeToTextArea(productData.write_off_comment);
        cy.get('#formWriteOff_submit').click();
        cy.messageDisplayed(sysMessages.creationSuccess);

        // remove parent product : after children write offs no need to remove them, just remove parent product.
        // nomenclature.list.click();
        dashBoard.goods.click();
        dashBoard.nomenclature.click();
        cy.get('@barcode_parent').then(barcode_parent => {
            nomenclature.filterBarcode.type(barcode_parent);
        });
        nomenclature.submitFilterButton.click().wait(1000);
        cy.get('tbody[role="rowgroup"]').find('#product_row_1_checkbox').click({ force: true });
        nomenclature.deleteMultipleButton.click();
        cy.get('.modal-content').find('button').contains('Удалить').click();
        cy.messageDisplayed(sysMessages.oneElementIsRemovedSuccess);
    })
})