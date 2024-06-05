import productData from '../../fixtures/TC9.json';
import userData from '../../fixtures/creds/company_with_products.json';
import dashBoard from '../../page_objects/dashBoard';
import RandomNumberGenerator from '../../support/randomNumberGenerator';

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithData);
        cy.closeSuccessNotification();
        dashBoard.salesMode.click();
        cy.tryToOpenShift();
        cy.tryToOpenTerminalList();
    })

    it('adds to postponement a product sold in pcs', () => {
        cy.addToCart(productData.product_sold_in_pcs_name);
        cy.clickSpanByText(productData.product_sold_in_pcs_name);
        cy.addToPostponement();
        cy.postponement();
        cy.contains(productData.product_sold_in_pcs_name).click();
        cy.productIsInCart(productData.product_sold_in_pcs_name);
        cy.cleanCart();
    })

    it('adds to postponement a product sold in gramms', () => {
        cy.addToCart(productData.product_sold_in_gr_name, true, { multiple: false });
        cy.clickNumpadButton(RandomNumberGenerator.generateRandomNumberInRange(1, 9));
        cy.clickNumpadButton(RandomNumberGenerator.generateRandomNumberInRange(1, 9));
        cy.save();
        cy.addToPostponement();
        cy.postponement();
        cy.modalContent().contains(productData.product_sold_in_gr_name).click();
        cy.productIsInCart(productData.product_sold_in_gr_name);
        cy.cleanCart();
    })
})
