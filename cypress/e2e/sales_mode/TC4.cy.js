import productData from '../../fixtures/TC4.json';
import RandomNumberGenerator from '../../support/randomNumberGenerator';
import { constants } from '../../support/constants';
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
    })

    // % discount
    it('adds total discount in % for group of products in cart', () => {
        cy.addToCart(productData.product_barcode_1);
        cy.addToCart(productData.product_barcode_1);
        cy.addToCart(productData.product_barcode_1);
        cy.addToCart(productData.product_barcode_1);
        cy.addToCart(productData.product_barcode_2);
        cy.addToCart(productData.product_barcode_3);
        cy.addToCart(productData.product_barcode_4);
        cy.addToCart(productData.product_barcode_5);
        cy.addToCart(productData.product_barcode_4);
        cy.addToCart(productData.product_barcode_5);
        cy.addToCart(productData.product_barcode_6);
        cy.contains('button', 'Оплатить').click()
        cy.get('.terminal-pay__body .enum__prop').invoke('text').then((text) => {
            cy.contains('button', 'Скидка на чек').click();
            cy.get('.terminal-pay__body')
                .find('#sale_common_discount_sum')
                .type(RandomNumberGenerator.generateRandomNumberInRange(1, 99)).wait(constants.AFTER_DISCOUNT_TIMEOUT);
        });
        cy.checkOut();
        cy.closeSuccessNotification();
        cy.dismissFeedbackWindow();
        cy.modalContent().contains('Скидка').should('exist');
        cy.Escape();
    })

    // kzt discount
    it('adds total discount for group of products in cart using fixed value under the purchase total amount value', () => {
        cy.addToCart(productData.product_barcode_1);
        cy.addToCart(productData.product_barcode_6);
        cy.addToCart(productData.product_barcode_3);
        cy.addToCart(productData.product_barcode_2);
        cy.addToCart(productData.product_barcode_1);
        cy.addToCart(productData.product_barcode_4);
        cy.addToCart(productData.product_barcode_5);
        cy.addToCart(productData.product_barcode_4);
        cy.addToCart(productData.product_barcode_5);
        cy.addToCart(productData.product_barcode_6);
        cy.get('div.enum').invoke('text').then((text) => {
            const amount = text.replace(/(\..*)|\D/g, '');
            let productsPriceBeforeDiscount = amount;
            const maximalDiscount = productsPriceBeforeDiscount - 1000;
            const minimalDiscount = 100;
            cy.contains('button', 'Оплатить').click().wait(2000);
            cy.get('.terminal-pay__body .enum__prop').invoke('text').then((text) => {
                const discountAmount = RandomNumberGenerator.generateRandomNumberInRange(minimalDiscount, maximalDiscount);

                cy.log("Debugging Info:");
                cy.log("productsPriceBeforeDiscount:", productsPriceBeforeDiscount);
                cy.log("maximalDiscount:", maximalDiscount);
                cy.log("minimalDiscount:", minimalDiscount);
                cy.log("Generated discountAmount:", discountAmount);
                cy.contains('button', 'Скидка на чек').click().wait(2000);
                cy.get('svg[aria-hidden="true"][data-icon="tenge"]').click().wait(500);
                cy.get('.terminal-pay__body')
                    .find('#sale_common_discount_sum')
                    .type(discountAmount)
                    .wait(constants.AFTER_DISCOUNT_TIMEOUT);
            });
        });
        cy.checkOut();
        cy.closeSuccessNotification();
        cy.dismissFeedbackWindow();
        cy.modalContent().contains('Скидка').should('exist');
        cy.Escape();
    })
})

