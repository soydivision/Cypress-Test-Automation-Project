import productData from '../../fixtures/TC13.json';
import RandomNumberGenerator from '../../support/randomNumberGenerator';
import dashBoard from '../../page_objects/dashBoard';
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

    it('checks the payment when price has fraction', () => {
        cy.addToCart(productData.name);
        cy.addToCart(productData.name);
        cy.addToCart(productData.name);
        cy.addToCart(productData.name);
        cy.addCommission(productData.commission);
        cy.save();

        // Discount for unit
        cy.discount();
        cy.contains('span.text-muted', 'Скидка за ед.').click();
        cy.contains('button.numpad__btn', RandomNumberGenerator.generateRandomNumberInRange(0, 9)).click();
        cy.contains('button.numpad__btn', RandomNumberGenerator.generateRandomNumberInRange(0, 9)).click();
        cy.save();

        // Global discount
        cy.pay();
        cy.contains('button', 'Скидка на чек').click();
        cy.get('.terminal-pay__body')
            .find('#sale_common_discount_sum')
            .typeSlow(RandomNumberGenerator.generateRandomNumberInRange(1, 99)).wait(2000);
        cy.checkOut();
        cy.closeSuccessNotification();
        cy.dismissFeedbackWindow();
        cy.contains('Просмотр чека').should('be.visible');
    })
})
