import productData from '../../fixtures/TC3.json';
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
        cy.tryToOpenShift(); cy.tryToOpenTerminalList();
    })

    it('adds discount per 1 unit based on % and absolute value', () => {
        // discount less than 10% 
        cy.get('#terminalSearchInput')
            .typeSlow(productData.productWithDiscountBarcode)
            .wait(constants.SEARCH_TIMEOUT_SMALL);
        cy.get('div.terminal-product-title').click();
        cy.productIsInCart(productData.productWithDiscountName);
        cy.discount();
        cy.contains('span.text-muted', 'Скидка за ед.').click();
        const discountValueOneDigit = RandomNumberGenerator.generateRandomNumberInRange(1, 9);
        cy.log('discount value in %:' + discountValueOneDigit);
        cy.contains('button.numpad__btn', discountValueOneDigit.toString()[0]).click();
        cy.save();
        cy.pay();
        cy.checkOut();
        cy.dismissFeedbackWindow();
        cy.modalContent().contains('Скидка').should('exist');
        cy.Escape();
        cy.get('#terminalSearchInput').clear().wait(500);

        // discount in range 10% to 99% including both  
        cy.get('#terminalSearchInput')
            .typeSlow(productData.productWithDiscountBarcode)
            .wait(constants.SEARCH_TIMEOUT_SMALL);
        cy.get('div.terminal-product-title').click();
        cy.productIsInCart(productData.productWithDiscountName);
        cy.discount();
        cy.contains('span.text-muted', 'Скидка за ед.').click();
        const discountValueTwoDigit = RandomNumberGenerator.generateRandomNumberInRange(10, 99);
        cy.log('discount value in %:' + discountValueTwoDigit);
        cy.contains('button.numpad__btn', discountValueTwoDigit.toString()[0]).click();
        cy.contains('button.numpad__btn', discountValueTwoDigit.toString()[1]).click();
        cy.contains('Сохранить').click();
        cy.pay();
        cy.checkOut();
        cy.modalContent().contains('Скидка').should('exist');;
        cy.Escape();
        cy.get('#terminalSearchInput').clear().wait(500);
    })
})
