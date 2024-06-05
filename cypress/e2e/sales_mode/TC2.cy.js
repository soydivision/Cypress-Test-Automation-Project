import productData from '../../fixtures/TC2.json';
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
    })

    it('adds product to cart', () => {
        // mono type product
        cy.get('#terminalSearchInput')
            .typeSlow(productData.monotypeProductBarcode)
            .wait(constants.SEARCH_TIMEOUT_SMALL);
        cy.contains(productData.monotypeProductName).click();
        cy.productIsInCart(productData.monotypeProductName);
        cy.get('#terminalSearchInput').clear().wait(500);

        // multi type product
        cy.get('#terminalSearchInput')
            .typeSlow(productData.multitypeProductName)
            .wait(constants.SEARCH_TIMEOUT_SMALL);
        cy.contains(productData.multitypeProductName).click();
        cy.contains('p', 'Размер').click();
        cy.contains(productData.multitypeProductSize).click();
        cy.contains('p', 'Цвет').click();
        cy.contains(productData.multitypeProductColor).click();
        cy.contains('button', 'Выбрать').click();
        cy.productIsInCart(productData.multitypeProductName);
        cy.get('#terminalSearchInput').clear().wait(500);

        // service
        cy.get('#terminalSearchInput')
            .typeSlow(productData.serviceVendorCode)
            .wait(constants.SEARCH_TIMEOUT_SMALL);
        cy.contains(productData.serviceName).click();
        cy.productIsInCart(productData.serviceName);
        cy.get('#terminalSearchInput').clear().wait(500);

        //   compoundProductBarcode
        cy.get('#terminalSearchInput')
            .typeSlow(productData.compoundProductBarcodeInStockName)
            .wait(constants.SEARCH_TIMEOUT_SMALL);
        cy.contains(productData.compoundProductBarcodeInStockName).click();
        cy.productIsInCart(productData.compoundProductBarcodeInStockName);
        cy.get('#terminalSearchInput').clear().wait(500);

        // universal
        cy.get('#terminalSearchInput')
            .typeSlow(productData.universalProductBarcode)
            .wait(constants.SEARCH_TIMEOUT_SMALL);
        cy.contains(productData.universalProductName).click();
        cy.productIsInCart(productData.universalProductName);
        cy.get('#terminalSearchInput').clear().wait(500);

        // out of stock
        cy.get('#terminalSearchInput')
            .typeSlow(productData.compoundProductOutOfStockBarcode)
            .wait(constants.SEARCH_TIMEOUT_SMALL);
        cy.contains(productData.compoundProductOutOfStockName).click();
        cy.contains("Данный товар отсутствует в наличии")
            .should('exist');
        cy.contains("Отменить").click();
        cy.get('#terminalSearchInput').clear().wait(500);

        // sold by measurement unit kg
        cy.get('#terminalSearchInput')
            .typeSlow(productData.productSoldByKgName)
            .wait(constants.SEARCH_TIMEOUT_SMALL);
        cy.contains(productData.productSoldByKgName).click();
        cy.contains('button.numpad__btn', RandomNumberGenerator.generateRandomNumberInRange(0, 9)).click();
        cy.contains('button.numpad__btn', RandomNumberGenerator.generateRandomNumberInRange(0, 9)).click();
        cy.contains('Сохранить').click();
        cy.productIsInCart(productData.productSoldByKgName);
        cy.get('#terminalSearchInput').clear().wait(constants.AFTER_SEARCH_TIMEOUT);

        // sold by unit
        cy.get('#terminalSearchInput')
            .typeSlow(productData.productSoldByUnitBarcode)
            .wait(constants.SEARCH_TIMEOUT_SMALL);
        cy.contains(productData.productSoldByUnitName).click();
        cy.get('svg[data-icon="plus"]').click().wait(constants.AFTER_CLICK_TIMEOUT);
        cy.get('svg[data-icon="plus"]').click().wait(constants.AFTER_CLICK_TIMEOUT);
        cy.get('svg[data-icon="plus"]').click().wait(constants.AFTER_CLICK_TIMEOUT);
        cy.get('svg[data-icon="plus"]').click().wait(constants.AFTER_CLICK_TIMEOUT);
        cy.productIsInCart(productData.productSoldByUnitName);
        cy.get('#terminalSearchInput').clear().wait(constants.AFTER_CLICK_TIMEOUT);
        cy.cleanCart();
        cy.cartIsEmpty();
    })
})
