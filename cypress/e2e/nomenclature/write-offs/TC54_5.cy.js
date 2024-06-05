import userData from '../../../fixtures/creds/company_with_products.json';
import sysMessages from '../../../fixtures/system_notifications_and_messages.json';
import dashBoard from '../../../page_objects/dashBoard';
import nomenclature from '../../../page_objects/nomenclature';

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithMultipleWarehouses);
        cy.closeSuccessNotification();
        dashBoard.goods.click();
        dashBoard.nomenclature.click();
    })

    it('copy write off', () => {
        nomenclature.writeoffsButton.click();
        cy.placeHolder('Склад').parent().find('input').type('Основной склад', { force: true }).wait(1000).type('{enter}');
        cy.get('[placeholder="Поиск товара"]').parent().typeSlow('суп пюре').wait(1500)
            .type('{enter}');
        cy.launchFilter();
        cy.selectRowAndColumnInTableBody(0, 6).click();
        cy.chooseOptionFromList('Копировать').wait(1500);
        cy.selectRowAndColumnInTableBody(0, 4)
            .find('input').click().type('7');
        cy.addProductBarSubmitClick();
        cy.modalContent().find('textarea').type('write off copy using Cypress');
        cy.modalContent().find('button').contains('Завершить').click();
        cy.messageDisplayed(sysMessages.creationSuccess);
    })
})