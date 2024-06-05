import userData from '../../../fixtures/creds/company_with_products.json';
import counterparties from '../../../page_objects/counterparties';
import dashBoard from '../../../page_objects/dashBoard';
import sysMessages from '../../../fixtures/system_notifications_and_messages.json'
import data from '../../../fixtures/TC56_3.json'

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithData);
        cy.closeSuccessNotification();
        dashBoard.counterparties.click();
        counterparties.suppliers.click();
    })

    it('creates supplier group', () => {
        cy.contains('Группы поставщиков').click();
        cy.get('#vendor_action_createGroup').click();
        cy.get('#vendorGroup_modal_form_title').type(data.supplier_group_name);
        cy.modalContent().find('button').contains('Сохранить').click();
        cy.messageDisplayed(sysMessages.creationSuccess);
        cy.get('td').contains(data.supplier_group_name).parent().parent().find('button').click();
        cy.get('button[data-action="delete"]').click();
        cy.modalContent().contains('Удалить').click();
        cy.messageDisplayed(sysMessages.deletionSuccess);
    })
})
