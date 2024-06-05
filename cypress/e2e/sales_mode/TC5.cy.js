import productData from '../../fixtures/TC5.json';
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
    })

    it('adds product to cart using search results then changes quantities', () => {
        cy.addToCart(productData.product_barcode_1);
        cy.addToCart(productData.product_barcode_1);
        cy.addToCart(productData.product_barcode_1);
        cy.addToCart(productData.product_barcode_1);
        cy.addToCart(productData.product_barcode_1);
        cy.pay();
        cy.checkOut();
        cy.dismissFeedbackWindow();
        cy.get('#modalReportCheck___BV_modal_content_')
            .should('exist');
        cy.get('h5').contains('Просмотр чека').should('exist');
    })

    it('adds product to cart  then changes  quantities using dbl click on on position in checkout list and input random 2 digit quantity', () => {
        cy.addToCart(productData.product_barcode_3);
        cy.contains('span', productData.product_barcode_3_name).dblclick()
        cy.contains('button.numpad__btn', RandomNumberGenerator.generateRandomNumberInRange(0, 9)).click();
        cy.contains('button.numpad__btn', RandomNumberGenerator.generateRandomNumberInRange(0, 9)).click();
        cy.save();
        cy.pay();
        cy.checkOut();
        cy.dismissFeedbackWindow();
        cy.get('#modalReportCheck___BV_modal_content_')
            .should('exist');
        cy.get('h5').contains('Просмотр чека').should('exist');
    })

    it('adds product to cart then changes quantities using plus or minus', () => {
        cy.addToCart(productData.product_barcode_1);
        cy.get('svg[data-icon="plus"]')
            .clickTimes(RandomNumberGenerator.generateRandomNumberInRange(constants.MIN_PRODUCTS_ADDED_TO_CART, constants.MAX_PRODUCTS_ADDED_TO_CART));
        cy.get('svg[data-icon="minus"]')
            .clickTimes(RandomNumberGenerator.generateRandomNumberInRange(0, constants.MIN_PRODUCTS_ADDED_TO_CART));
        cy.addToCart(productData.product_barcode_2);
        cy.get('svg[data-icon="plus"]')
            .clickTimes(RandomNumberGenerator.generateRandomNumberInRange(constants.MIN_PRODUCTS_ADDED_TO_CART, constants.MAX_PRODUCTS_ADDED_TO_CART));
        cy.get('svg[data-icon="minus"]')
            .clickTimes(RandomNumberGenerator.generateRandomNumberInRange(0, constants.MIN_PRODUCTS_ADDED_TO_CART));
        cy.pay();
        cy.checkOut();
        cy.dismissFeedbackWindow();
        cy.get('#modalReportCheck___BV_modal_content_')
            .should('exist');
        cy.get('h5').contains('Просмотр чека').should('exist');
    })

    it('adds products to cart then changes quantities using quantity/discount button left bottom', () => {
        cy.addToCart(productData.product_barcode_3);
        cy.discount();
        cy.contains('button.numpad__btn', RandomNumberGenerator.generateRandomNumberInRange(0, 9)).click();
        cy.contains('button.numpad__btn', RandomNumberGenerator.generateRandomNumberInRange(0, 9)).click();
        cy.save();
        cy.pay();
        cy.checkOut();
        cy.dismissFeedbackWindow();
        cy.get('#modalReportCheck___BV_modal_content_')
            .should('exist');
        cy.get('h5').contains('Просмотр чека').should('exist');
    })
})

