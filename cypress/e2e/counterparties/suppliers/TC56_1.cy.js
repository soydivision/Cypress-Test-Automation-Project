import userData from '../../../fixtures/creds/company_with_products.json';
import counterparties from '../../../page_objects/counterparties';
import dashBoard from '../../../page_objects/dashBoard';
import sysMessages from '../../../fixtures/system_notifications_and_messages.json'
import data from '../../../fixtures/TC56_1.json'

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithData);
        cy.closeSuccessNotification();
        dashBoard.counterparties.click();
        counterparties.suppliers.click();
    })

    it('creates new supplier', () => {
        cy.addSupplier();
        cy.modalContent().find('#companyForm_iinBin').type(data.bin);
        cy.get('button').contains('Продолжить').click();
        cy.get('button').contains('Создать вручную').click().wait(1000);
        cy.modalContent().findInputByLegendNameAndType(' Наименование ', data.supplier_name);
        cy.modalContent().find('.multiselect__placeholder').contains('Тип компании').click();
        cy.chooseOptionFromList(data.supplier_type);
        cy.get('div').contains('Дополнительная информация').click();
        cy.get('#vendor_modal_form_group').click();
        cy.chooseOptionFromList(data.group);
        cy.get('#vendor_modal_form_address').type(data.address);
        cy.get('#vendor_form_director_name').type(data.director_name);
        cy.get('div').contains('Реквизиты').click();
        cy.get('#customer_modal_form_bank').type(data.bank);
        cy.get('#customer_modal_form_iik').type(data.iik);
        cy.get('#customer_modal_form_kbe').type(data.kbe);
        cy.get('#customer_modal_form_bik').type(data.bik);
        cy.get('#customerForm_save').click();
        cy.messageDisplayed(sysMessages.creationSuccess);
        // remove supplier 
        cy.placeHolder('Поиск по имени поставщика').type(data.supplier_name);
        cy.launchFilter();
        cy.get('span').contains('Vanguard group').parents('tr').find('[data-icon="ellipsis-v"]').click();
        cy.get('[data-action="delete"]').click();
        cy.modalContent().find('button').contains('Удалить').click();
        cy.messageDisplayed(sysMessages.deletionSuccess);
    })
})
