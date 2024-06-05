import productData from '../../fixtures/TC14.json';
import userData from '../../fixtures/creds/company_kkm.json';
import sysMessages from '../../fixtures/system_notifications_and_messages.json';
import dashBoard from '../../page_objects/dashBoard';

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        dashBoard.salesMode.click();
        cy.contains(userData.warehouse).click().wait(500);
        cy.tryToOpenShift(); cy.tryToOpenTerminalList();
    })

    it('fiscal check on', () => {
        cy.addToCart(productData.product_barcode_1);
        cy.addToCart(productData.product_barcode_2);
        cy.addToCart(productData.product_barcode_3);
        cy.pay();
        cy.get('form.terminal-pay__body')
            .find('[type="checkbox"]')
            .click({ force: true });
        cy.checkOut();
        cy.messageDisplayed(sysMessages.executionSuccess);
        cy.closeSuccessNotification();
        cy.dismissFeedbackWindow();
        cy.get(".modal-body").contains('чек').should('be.visible');
        cy.contains('ФИСКАЛЬНЫЙ ЧЕК').should('exist');
        cy.dismiss();
    })

    it('fiscal check off', () => {
        cy.addToCart(productData.product_barcode_1);
        cy.addToCart(productData.product_barcode_2);
        cy.addToCart(productData.product_barcode_3);
        cy.pay();
        cy.checkOut();
        cy.messageDisplayed(sysMessages.executionSuccess);
        cy.closeSuccessNotification();
        cy.closeSuccessNotification();
        cy.dismissFeedbackWindow();
        cy.contains('Просмотр чека').should('be.visible');
        cy.contains('ФИСКАЛЬНЫЙ ЧЕК').should('not.exist');
        cy.dismiss();
    })
})