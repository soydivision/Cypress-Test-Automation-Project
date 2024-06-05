import userData from '../../../fixtures/creds/company_with_products.json';
import dashBoard from '../../../page_objects/dashBoard';
import nomenclature from '../../../page_objects/nomenclature';
import sysMessages from '../../../fixtures/system_notifications_and_messages.json'


describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithData);
        cy.closeSuccessNotification();
        dashBoard.goods.click();
        nomenclature.acceptance.click();
    })

    it('copy accept', () => {
        cy.selectRowAndColumnInTableBody(0, 7).find('div').first().click();
        cy.chooseOptionFromList('Копировать').wait(2000);
        cy.clickOnButtonContains('Завершить приемку');
        cy.clickOnButtonContains('Завершить сейчас');
        cy.pay();
        cy.messageDisplayed(sysMessages.creationSuccess);
    })
})