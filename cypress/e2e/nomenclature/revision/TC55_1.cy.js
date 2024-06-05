import userData from '../../../fixtures/creds/company_with_products.json';
import dashBoard from '../../../page_objects/dashBoard';
import nomenclature from '../../../page_objects/nomenclature';
import data from '../../../fixtures/TC55_1.json'

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithData);
        cy.closeSuccessNotification();
        dashBoard.goods.click();
        // dashBoard.nomenclature.click();
    })

    it('create revision shortage case', () => {
        nomenclature.revisionButton.click();
        nomenclature.createRevisionButton.click();
        const id = Math.floor(1000000 + Math.random() * 9000000);
        cy.modalContent().find('input').type('Shortage revision id:' + id.toString());
        cy.clickContinue();
        cy.searchProductByBarcodeOrNameFilter().type(data.shortageRevisionProduct).wait(1500).type('{enter}');
        cy.get('.form-control input[type="tel"]').invoke('val').then(value => cy.wrap(parseInt(value.replace(/\s/g, '').replace(/\.0+$/, ''))).as('productInStock'));
        cy.get('@productInStock').then((value) => {
            cy.log("In stock: " + value);
        });
        cy.get('@productInStock').then(productInStock => {
            const inStockParsedValue = parseInt(productInStock);
            const afterRevisionInStock = inStockParsedValue - 1;
            cy.selectRowAndColumnInTableBody(0, 5).clear().type(afterRevisionInStock);
        })
        cy.get('button').contains('Завершить').click();
        cy.get('[role="menuitem"]').contains('Завершить').click();
        cy.modalContent().contains('Завершить').click();
        cy.contains('Хорошо').click();
        cy.dismissFeedbackWindow();
        cy.get('[placeholder="Название"]').type(id);
        cy.launchFilter();
        cy.selectRowAndColumnInTableBody(0, 5)
            .find('div')
            .invoke('text')
            .then((text) => {
                const trimmedText = text.trim().replace(/\s+/g, ' ');
                expect(trimmedText).to.include('Недостача');
            });
        dashBoard.goods.click();
        dashBoard.nomenclature.click();
        // nomenclature.list.click();
        nomenclature.filterBarcode.type(data.shortageRevisionProduct);
        nomenclature.submitFilterButton.click().wait(1500);
        cy.get('@productInStock').then(productInStock => {
            const inStockParsedValue = parseInt(productInStock);
            const afterRevisionInStock = inStockParsedValue - 1;
            cy.selectRowAndColumnInTableBody(0, 6)
                .find('div')
                .first()
                .invoke('text')
                .then((text) => {
                    const trimmedString = text.replace(/\s/g, '');
                    expect(parseInt(trimmedString)).to.equal(afterRevisionInStock);
                });
        })
    })

    it('create revision abundance case', () => {
        nomenclature.revisionButton.click();
        nomenclature.createRevisionButton.click();
        const id = Math.floor(1000000 + Math.random() * 9000000);
        cy.modalContent().find('input').type('Abundance revision id:' + id.toString());
        cy.clickContinue();
        cy.searchProductByBarcodeOrNameFilter().type(data.abundanceRevisionProduct).wait(1500).type('{enter}');
        cy.get('.form-control input[type="tel"]').invoke('val').then(value => cy.wrap(parseInt(value.replace(/\s/g, '').replace(/\.0+$/, ''))).as('productInStock'));
        cy.get('@productInStock').then((value) => {
            cy.log("In stock: " + value);
        });
        cy.get('@productInStock').then(productInStock => {
            const inStockParsedValue = parseInt(productInStock);
            const afterRevisionInStock = inStockParsedValue + 1;
            cy.selectRowAndColumnInTableBody(0, 5).clear().type(afterRevisionInStock);
        })
        cy.get('button').contains('Завершить').click();
        cy.get('[role="menuitem"]').contains('Завершить').click();
        cy.modalContent().contains('Завершить').click();
        cy.contains('Хорошо').click();
        cy.dismissFeedbackWindow();
        cy.get('[placeholder="Название"]').type(id);
        cy.launchFilter();
        cy.selectRowAndColumnInTableBody(0, 5)
            .find('div')
            .invoke('text')
            .then((text) => {
                const trimmedText = text.trim().replace(/\s+/g, ' ');
                expect(trimmedText).to.include('Излишек');
            });
        dashBoard.goods.click();
        dashBoard.nomenclature.click();
        // nomenclature.list.click();
        nomenclature.filterBarcode.type(data.abundanceRevisionProduct);
        nomenclature.submitFilterButton.click().wait(1500);
        cy.get('@productInStock').then(productInStock => {
            const inStockParsedValue = parseInt(productInStock);
            const afterRevisionInStock = inStockParsedValue + 1;
            cy.selectRowAndColumnInTableBody(0, 6)
                .find('div')
                .first()
                .invoke('text')
                .then((text) => {
                    const trimmedString = text.replace(/\s/g, '');
                    expect(parseInt(trimmedString)).to.equal(afterRevisionInStock);
                });
        })
    })

    it('create revision normal case', () => {
        nomenclature.revisionButton.click();
        nomenclature.createRevisionButton.click();
        const id = Math.floor(1000000 + Math.random() * 9000000);
        cy.modalContent().find('input').type('normal revision id:' + id.toString());
        cy.clickContinue();
        cy.searchProductByBarcodeOrNameFilter().type(data.normalRevisionProduct).wait(1500).type('{enter}');
        cy.get('.form-control input[type="tel"]').invoke('val').then(value => cy.wrap(parseInt(value.replace(/\s/g, '').replace(/\.0+$/, ''))).as('productInStock'));
        cy.get('@productInStock').then((value) => {
            cy.log("In stock: " + value);
        });
        cy.get('@productInStock').then(productInStock => {
            const inStockParsedValue = parseInt(productInStock);
            const afterRevisionInStock = inStockParsedValue;
            cy.selectRowAndColumnInTableBody(0, 5).find('input').clear().type(afterRevisionInStock);
        })
        cy.get('button').contains('Завершить').click();
        cy.get('[role="menuitem"]').contains('Завершить').click();
        cy.modalContent().contains('Завершить').click();
        cy.contains('Хорошо').click();
        cy.dismissFeedbackWindow();
        cy.get('[placeholder="Название"]').type(id);
        cy.launchFilter();
        cy.selectRowAndColumnInTableBody(0, 5)
            .find('div')
            .invoke('text')
            .then((text) => {
                const trimmedText = text.trim().replace(/\s+/g, ' ');
                expect(trimmedText).to.include('0 ₸');
            });
        dashBoard.goods.click();
        dashBoard.nomenclature.click();
        // nomenclature.list.click();
        nomenclature.filterBarcode.type(data.normalRevisionProduct);
        nomenclature.submitFilterButton.click().wait(1500);
        cy.get('@productInStock').then(productInStock => {
            const inStockParsedValue = parseInt(productInStock);
            const afterRevisionInStock = inStockParsedValue;
            cy.selectRowAndColumnInTableBody(0, 6)
                .find('div')
                .first()
                .invoke('text')
                .then((text) => {
                    const trimmedString = text.replace(/\s/g, '');
                    expect(parseInt(trimmedString)).to.equal(afterRevisionInStock);
                });
        })
    })
})