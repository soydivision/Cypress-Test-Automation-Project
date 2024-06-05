import userData from '../../../fixtures/creds/company_with_products.json'
import dashBoard from '../../../page_objects/dashBoard';
import nomenclature from '../../../page_objects/nomenclature';
import sysMessages from '../../../fixtures/system_notifications_and_messages.json'
import data from '../../../fixtures/TC52_5.json'

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithData);
        cy.closeSuccessNotification();
    })

    it('creates accept from nomenclature and pays for it using bank', () => {
        // deposit 2500 tenge
        dashBoard.management.click();
        dashBoard.finances.click();
        cy.get('.card-body').contains(data.bank)
            .parents('.card-body')
            .siblings()
            .parent()
            .parent()
            .find('button')
            .first()
            .click();
        cy.contains('Внесение денег').click();
        cy.get('#money_transfer_sum').type(data.moneyToDeposit)
        cy.modalContent().find('button[type="submit"]').click();
        cy.messageDisplayed(sysMessages.summAccepted);

        // create an accept for 2500 
        dashBoard.goods.click();
        dashBoard.nomenclature.click();
        nomenclature.acceptance.click();
        cy.acceptGoods().wait(2000);
        cy.searchProductByBarcodeOrNameFilter().type(data.barcodeForAccept);
        cy.selectRowAndColumnInTableBody(0, 4).clear().type(data.quantity);
        cy.selectRowAndColumnInTableBody(0, 6).clear().type(data.sellingPrice);
        cy.selectRowAndColumnInTableBody(0, 7).clear().type(data.profit);
        cy.clickOnButtonContains('Завершить приемку');
        cy.clickOnButtonContains('Завершить сейчас');
        cy.modalContent().find('#invoice_form_search_vendor').click();
        cy.contains(data.supplier).click();
        cy.modalContent().find('.multiselect__placeholder').click();
        cy.modalContent().clickSpanByText(data.supplier);
        cy.modalContent().pay();
        cy.messageDisplayed(sysMessages.creationSuccess);
        cy.dismissFeedbackWindow();
        cy.closeNotification();

        // pay for an accept
        cy.selectRowAndColumnInTableBody(0, 7).click();
        cy.get('.dropdown-item').contains('Оплатить').click()
        cy.modalContent().find('.multiselect').click();
        cy.chooseOptionFromList(data.bank);
        cy.modalContent().find('[type="submit"]').contains('Оплатить').click();
        cy.messageDisplayed(sysMessages.paymentSuccess);
        const PAYMENT_PROCESSING_TIMEOUT = 3000;
        cy.wait(PAYMENT_PROCESSING_TIMEOUT);
        // check accept status (paid status)
        cy.selectRowAndColumnInTableBody(0, 5)
            .find('span')
            .invoke('text')
            .then((text) => {
                const trimmedText = text.trim();
                expect(trimmedText).to.eq(data.paidStatus);
            });
    })
})