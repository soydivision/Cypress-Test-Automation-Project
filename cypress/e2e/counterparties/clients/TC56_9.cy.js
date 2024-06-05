import data from '../../../fixtures/TC56_9.json';
import userData from '../../../fixtures/creds/company_with_products.json';
import counterparties from '../../../page_objects/counterparties';
import dashBoard from '../../../page_objects/dashBoard';

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithData);
        cy.closeSuccessNotification();
    })

    it('reduce debt and check in finances', () => {
        dashBoard.counterparties.click();
        counterparties.clients.click();
        cy.placeHolder('Поиск по имени').type(data.debtor);
        cy.launchFilter();

        cy.selectRowAndColumnInTableBody(0, 7).find('button').first().click();
        cy.contains(' Информация о клиенте ').click();
        cy.get('.card-body')
            .contains('Долг по складу: Основной склад')
            .siblings()
            .invoke('text')
            .then(text => {
                const debtAsNumber = text.replace(/\D/g, '');
                cy.wrap(debtAsNumber).as('debt');
                cy.log(debtAsNumber);
            });

        // Reduce debt
        cy.get('button').contains('Внести погашение').click();
        cy.modalContent().contains('Тип оплаты').click();
        cy.modalContent().contains('Наличные').click();
        cy.get('.modal-content .input-group').typeSlow('100');
        cy.modalContent().contains('Принять').click().wait(2000);

        // Update debt info and save it 
        cy.get('.card-body')
            .contains('Долг по складу: Основной склад')
            .siblings()
            .invoke('text')
            .then(text => {
                const debtReduced = text.replace(/\D/g, '');
                cy.wrap(debtReduced).as('debtReduced');
                cy.log(debtReduced);
            });
        // Final assertion
        cy.get('@debt').then(debt => {
            cy.get('@debtReduced').then(debtReduced => {
                const expectedValue = parseInt(debt, 10) - 100;
                expect(parseInt(debtReduced, 10)).to.equal(expectedValue);
            });
        });
    })
})
