import productData from '../../fixtures/TC6.json';
import { constants } from '../../support/constants';
import RandomNumberGenerator from '../../support/randomNumberGenerator';
import userData from '../../fixtures/creds/company_with_products.json';
import dashBoard from '../../page_objects/dashBoard';

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithData);
        cy.closeSuccessNotification();
        dashBoard.salesMode.click();
        cy.tryToOpenShift();
        cy.tryToOpenTerminalList();
    });

    it('adds products to cart and then removes them', () => {
        /* different product types adding block  */

        // mono
        cy.addToCart(productData.monotypeProductName);

        // multi
        cy.get('#terminalSearchInput')
            .typeSlow(productData.multitypeProductName)
            .wait(constants.SEARCH_TIMEOUT_SMALL);
        cy.get('div.terminal-product-title').click().wait(constants.AFTER_REMOVE_TIMEOUT);
        cy.contains('p', 'Размер').click();
        cy.contains(productData.multitypeProductSize).click();
        cy.contains('p', 'Цвет').click();
        cy.contains(productData.multitypeProductColor).click();
        cy.choose();
        cy.get('#terminalSearchInput').clear().wait(500);
        // service 
        cy.addToCart(productData.serviceVendorCode);
        cy.contains(productData.serviceName).click();
        cy.get('#terminalSearchInput').clear().wait(500);
        // compound 
        cy.addToCart(productData.compoundProductBarcodeInStockName);
        // universal
        cy.addToCart(productData.universalProductName);
        // sold by kg
        cy.get('#terminalSearchInput')
            .typeSlow(productData.productSoldByKgName)
            .wait(constants.SEARCH_TIMEOUT_SMALL);
        cy.get('div.terminal-product-title').click();
        cy.contains('button.numpad__btn', RandomNumberGenerator.generateRandomNumberInRange(0, 9)).click(); //to do
        cy.contains('button.numpad__btn', RandomNumberGenerator.generateRandomNumberInRange(0, 9)).click(); //to do
        cy.save();
        cy.get('#terminalSearchInput').clear().wait(500);
        /*         Products removal block
         */
        cy.removeFromCart(productData.monotypeProductName);
        cy.removeFromCart(productData.multitypeProductName);
        cy.removeFromCart(productData.serviceName);
        cy.removeFromCart(productData.compoundProductBarcodeInStockName);
        cy.removeFromCart(productData.universalProductName);
        cy.removeFromCart(productData.productSoldByKgName);
        cy.cartIsEmpty();
    })
})
