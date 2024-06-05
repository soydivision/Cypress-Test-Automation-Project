import productData from '../../fixtures/TC8.json';
import RandomNumberGenerator from '../../support/randomNumberGenerator';
import userData from '../../fixtures/creds/company_with_products.json';
import dashBoard from '../../page_objects/dashBoard';

describe('', () => {
    let barcodeAfterChange;
    let priceAfterChange;
    let nameAfterChange;

    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithData);
        cy.closeSuccessNotification();
        dashBoard.salesMode.click();
        cy.tryToOpenShift();
        cy.tryToOpenTerminalList();
    })

    before(() => {
        barcodeAfterChange = RandomNumberGenerator.generateRandomNumberInRange(1000000000000, 9999999999999);
        priceAfterChange = RandomNumberGenerator.generateRandomNumberInRange(100, 999);
        nameAfterChange = productData.prefix + RandomNumberGenerator.generateRandomNumberInRange(0, 9);
    });

    it('changes price, barcode of product', () => {
        cy.addToCart(productData.prefix, true);
        cy.clickNumpadButton(RandomNumberGenerator.generateRandomNumberInRange(1, 9));
        cy.save();
        cy.editProduct();
        cy.wait(500);

        //change name
        cy.contains('span.text-muted', 'Название').typeSlow(nameAfterChange);

        //change barcode
        cy.get('legend')
            .contains('Штрихкод товара')
            .parent()
            .find('input')
            .click({ force: true });
        cy.get('body')
            .typeMultipleTimes('{backspace}', 13);
        cy.get('body')
            .type(barcodeAfterChange);

        cy.get('#terminalProductEdit_barcode')  // Get the element with ID terminalProductEdit_barcode
            .find('span')
            .eq(0)
            .invoke('text')
            .then((text) => {
                const barcodeValue = text;
                cy.wrap(barcodeValue).as('barcodeValue');
            });

        // change price
        cy.get('legend')
            .contains('Цена товара, ₸')
            .parent()
            .find('input')
            .clear()
            .type(priceAfterChange);
        cy.save();

        cy.clearTerminal();
        cy.cleanCart();
        cy.get('@barcodeValue').then(barcodeValue => {
            cy.addToCart(barcodeValue, true);
        })
        cy.clickNumpadButton(RandomNumberGenerator.generateRandomNumberInRange(1, 9));
        cy.save();

        // make assertion 
        cy.get('tbody').contains(priceAfterChange).should('be.visible');
        cy.get('tbody').contains(nameAfterChange).should('be.visible');
    })
})
