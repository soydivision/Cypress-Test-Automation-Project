import userData from '../../../fixtures/creds/company_with_products.json';
import sysMessages from '../../../fixtures/system_notifications_and_messages.json';
import counterparties from '../../../page_objects/counterparties';
import dashBoard from '../../../page_objects/dashBoard';
import data from '../../../fixtures/TC56_7.json';
import realization from '../../../page_objects/realization';
import RandomNumberGenerator from '../../../support/randomNumberGenerator';

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithData);
        cy.closeSuccessNotification();
        dashBoard.counterparties.click();
        counterparties.clients.click();
    })

    it('creates new client with debt', () => {
        // создать клиента      
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

        // создать продажу в долг и выбрать клиента 
        dashBoard.realization.click();
        realization.sales.click();
        realization.createSale.click().wait(1000);
        cy.searchProductByBarcodeOrNameFilter().typeSlow('11').wait(1500).type('{enter}');
        const sale_quantity = RandomNumberGenerator.generateRandomNumberUnderUpperBound(3) + 1;
        cy.dataLabel('Количество').find('input').clear().type(sale_quantity);
        cy.get('a').contains('Выбрать клиента').click();
        cy.modalContent().contains('button', data.name).click();
        cy.modalContent().contains('Выбрать').click();

        // завершить продажу и выбрат в долг
        cy.clickOnButtonContains('Завершить продажу').wait(2000);
        cy.modalContent().contains('span', 'Другой').click();
        cy.modalContent().contains('span', 'В долг').click();
        cy.modalContent().find('button').contains('Выбить чек').click().wait(1000);
        cy.get('[class="close"]').first().click();
        cy.dismissFeedbackWindow();

        // попытаться удалить клиента - увидеть ошибку
        dashBoard.counterparties.click();
        counterparties.clients.click();
        cy.placeHolder('Поиск по имени').type(data.name);
        cy.launchFilter();
        cy.selectRowAndColumnInTableBody(0, 7).click();
        cy.get('[data-action="delete"]').click();
        cy.modalContent().find('button').contains('Удалить').click();
        cy.messageDisplayed(sysMessages.clientHasDebtAndCannotBeRemoved);

        // сделать возврат в долг (проще сделать - контрагенты - клиенты - инф о клиенте - внести погашение -  )
        counterparties.counterparties.click();
        counterparties.clients.click();
        cy.placeHolder('Поиск по имени').type(data.name);
        cy.launchFilter();
        cy.selectRowAndColumnInTableBody(0, 4)
            .find('div')
            .invoke('text')
            .then((text) => {
                const debt = text;
                cy.wrap(debt).as('debt');
                cy.log("this is debt:");
                cy.log(debt);
            });
        cy.selectRowAndColumnInTableBody(0, 7).find('button').first().click();
        cy.contains('Информация о клиенте').click();
        cy.contains('Внести погашение').click();
        cy.modalContent().find('[placeholder="Тип оплаты"]').click({ force: true });
        cy.modalContent().contains('Наличные').click({ force: true });

        cy.get('@debt').then(debt => {
            cy.modalContent().find('[inputmode="numeric"]').type(debt).wait(1000).type('{enter}');
        })

        // найти клиента удалить его 
        counterparties.counterparties.click();
        counterparties.clients.click();
        cy.placeHolder('Поиск по имени').type(data.name);
        cy.launchFilter();
        cy.selectRowAndColumnInTableBody(0, 7).find('button').first().click();
        cy.selectRowAndColumnInTableBody(0, 7).contains('Удалить').click();
        cy.modalContent().contains('Удалить').click();
    })
})
