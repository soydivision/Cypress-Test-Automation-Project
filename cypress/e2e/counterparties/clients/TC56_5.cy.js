import userData from '../../../fixtures/creds/company_with_products.json';
import sysMessages from '../../../fixtures/system_notifications_and_messages.json';
import counterparties from '../../../page_objects/counterparties';
import dashBoard from '../../../page_objects/dashBoard';
import data from '../../../fixtures/TC56_5.json';

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithData);
        cy.closeSuccessNotification();
        dashBoard.counterparties.click();
        counterparties.clients.click();
    })

    it('creates new client', () => {
        counterparties.addClient.click();
        cy.modalContent().find('#companyForm_iinBin').type(data.bin);
        cy.get('button').contains('Продолжить').click();
        cy.get('button').contains('Создать вручную').click().wait(1000);
        cy.modalContent().find('#customer_modal_form_enterBin').type(data.bin);
        cy.modalContent().find('#customer_modal_form_customerName').type(data.name);
        cy.modalContent().find('#customer_modal_form_phone_number').type(data.phone);
        cy.modalContent().find('#customer_modal_form_companyType').click();
        cy.modalContent().find('[placeholder="Тип компании"]').click();
        cy.chooseOptionFromList(data.company_type);

        cy.modalContent().contains('Дополнительная информация').click();
        cy.get('#customer_modal_form_email').type(data.email);
        cy.get('#customer_modal_form_city').type(data.city);
        cy.get('#customer_modal_form_address').type(data.address);
        cy.get('#customer_modal_form_instagram').type(data.instagram);

        cy.modalContent().contains('Реквизиты').click();
        cy.get('#customer_modal_form_bank').type(data.bank);
        cy.get('#customer_modal_form_iik').type(data.bank_iik);
        cy.get('#customer_modal_form_kbe').type(data.bank_kbe);
        cy.get('#customer_modal_form_bik').type(data.bank_bik);
        cy.modalContent().save();

        // remove client 
        cy.placeHolder('Поиск по имени').type(data.name);
        cy.launchFilter();
        cy.get('span').contains(data.name).parents('tr').find('[data-icon="ellipsis-v"]').click();
        cy.get('[data-action="delete"]').click();
        cy.modalContent().find('button').contains('Удалить').click();
        cy.messageDisplayed(sysMessages.deletionSuccess);
    })
})
