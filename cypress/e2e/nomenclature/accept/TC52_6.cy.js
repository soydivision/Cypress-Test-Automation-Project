import userData from '../../../fixtures/creds/company_with_products.json';
import dashBoard from '../../../page_objects/dashBoard';
import nomenclature from '../../../page_objects/nomenclature';
import data from '../../../fixtures/TC52_6.json'

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithData);
        cy.closeSuccessNotification();
        dashBoard.goods.click();
        nomenclature.acceptance.click();
    })

    it('check filters using product name input', () => {
        cy.multiSelectPlaceholderContains('Сотрудник').click();
        cy.clickSpanByText(data.employee);
        cy.multiSelectPlaceholderContains('Поиск товара').type(data.product).wait(2000);
        cy.typeToPageBody('{enter}');
        cy.launchFilter();
        cy.selectRowAndColumnInTableBody(0, 3)
            .find('div')
            .first()
            .invoke('text')
            .then((text) => {
                const trimmedText = text.trim();
                expect(trimmedText).to.eq(data.supplier);
            });
        cy.contains('Нет результатов').should('not.exist');
    })

    it('check filters using company name input', () => {
        cy.get('input[placeholder="Поиск поставщика"]').click({ force: true }).type(data.supplier).wait(1000);
        cy.clickSpanByText(data.supplier);
        cy.launchFilter();
        cy.selectRowAndColumnInTableBody(0, 3)
            .find('div')
            .last()
            .invoke('text')
            .then((text) => {
                const trimmedText = text.trim();
                cy.log(trimmedText);
                expect(trimmedText).to.eq(data.supplier);
            });
        cy.contains('Нет результатов').should('not.exist');
    })

    it('checks filters using servie name and should yield empty search result', () => {
        cy.multiSelectPlaceholderContains('Склад').click();
        cy.clickSpanByText(data.warehouse);
        cy.get('input[placeholder="Поиск товара"]').click({ force: true }).type(data.service).wait(1000);
        cy.clickSpanByText(data.service);
        cy.launchFilter();
        cy.contains('Нет результатов').should('be.visible');
    })

    it('checks accepts done by non admin and therefore yields empty result', () => {
        cy.multiSelectPlaceholderContains('Сотрудник').click();
        cy.clickSpanByText(data.employeeNonAdmin);
        cy.launchFilter();
        cy.contains('Нет результатов').should('exist');
    })
})