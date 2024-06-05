import { constants } from '../../support/constants';
import dashBoard from '../../page_objects/dashBoard';
import sysMessages from '../../fixtures/system_notifications_and_messages.json'
import data from '../../fixtures/TC29.json';
import userData from '../../fixtures/creds/company_with_products.json';

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithData);
        cy.closeSuccessNotification();
        dashBoard.salesMode.click();
        cy.tryToOpenShift();
        cy.tryToOpenTerminalList();
    })

    it('makes a sale and returns good (credit card refund)', () => {
        cy.addToCart(data.product_1);
        cy.pay();
        cy.checkOut();
        cy.visit(constants.HOME_URL);
        dashBoard.realization.click();
        dashBoard.returns.click();
        dashBoard.create_refund.click();
        dashBoard.first_filter_result_row.click();
        dashBoard.refund_type.click();
        cy.contains(data.refund_method_1).click();
        dashBoard.refund.click();
        cy.messageDisplayed(sysMessages.creationSuccess);
    })

    it('makes a sale and returns good (cash refund)', () => {
        cy.addToCart(data.product_1);
        cy.pay();
        cy.checkOut();
        cy.visit(constants.HOME_URL);
        dashBoard.realization.click();
        dashBoard.returns.click();
        dashBoard.create_refund.click();
        dashBoard.first_filter_result_row.click();
        dashBoard.refund_type.click();
        cy.contains(data.refund_method_2).click();
        dashBoard.refund.click();
        cy.messageDisplayed(sysMessages.creationSuccess);
    })

    it('makes a sale for two positions and returns (credit card refund)', () => {
        cy.addToCart(data.product_1);
        cy.addToCart(data.product_2);
        cy.pay();
        cy.checkOut();
        cy.visit(constants.HOME_URL);
        dashBoard.realization.click();
        dashBoard.returns.click();
        dashBoard.create_refund.click();
        dashBoard.first_filter_result_row.click();
        dashBoard.refund_type.click();
        cy.contains(data.refund_method_1).click();
        dashBoard.refund.click();
        cy.messageDisplayed(sysMessages.creationSuccess);
    })

    it('makes a sale for two positions and returns (cash refund)', () => {
        cy.addToCart(data.product_1);
        cy.addToCart(data.product_2);
        cy.pay();
        cy.checkOut();
        cy.visit(constants.HOME_URL);
        dashBoard.realization.click();
        dashBoard.returns.click();
        dashBoard.create_refund.click();
        dashBoard.first_filter_result_row.click();
        dashBoard.refund_type.click();
        cy.contains(data.refund_method_2).click();
        dashBoard.refund.click();
        cy.messageDisplayed(sysMessages.creationSuccess);
    })

    it('makes a sale for two positions and returns one position (credit card refund)', () => {
        cy.addToCart(data.product_1);
        cy.addToCart(data.product_2);
        cy.pay();
        cy.checkOut();
        cy.visit(constants.HOME_URL);
        dashBoard.realization.click();
        dashBoard.returns.click();
        dashBoard.create_refund.click();
        dashBoard.first_filter_result_row.click();
        dashBoard.refund_type.click();
        cy.contains(data.refund_method_1).click();
        cy.removeProductFromRow(data.product_2);
        dashBoard.refund.click();
        cy.messageDisplayed(sysMessages.creationSuccess);
    })

    it('makes a sale for two positions and returns one position (cash refund)', () => {
        cy.addToCart(data.product_1);
        cy.addToCart(data.product_2);
        cy.pay();
        cy.checkOut();
        cy.visit(constants.HOME_URL);
        dashBoard.realization.click();
        dashBoard.returns.click();
        dashBoard.create_refund.click();
        dashBoard.first_filter_result_row.click();
        dashBoard.refund_type.click();
        cy.contains(data.refund_method_2).click();
        cy.removeProductFromRow(data.product_2);
        dashBoard.refund.click();
        cy.messageDisplayed(sysMessages.creationSuccess);
    })

    it('makes a sale for 5 pcs. and then returns 1 (cash refund)', () => {
        cy.addToCart(data.product_1);
        cy.addToCart(data.product_1);
        cy.addToCart(data.product_1);
        cy.pay();
        cy.checkOut();
        cy.visit(constants.HOME_URL);
        dashBoard.realization.click();
        dashBoard.returns.click();
        dashBoard.create_refund.click();
        dashBoard.first_filter_result_row.click();
        dashBoard.refund_type.click();
        cy.contains(data.refund_method_2).click();
        cy.get('[data-label="Количество"]').find('input').clear().type(data.quantity_to_return);
        dashBoard.refund.click();
        cy.messageDisplayed(sysMessages.creationSuccess);
    })
})