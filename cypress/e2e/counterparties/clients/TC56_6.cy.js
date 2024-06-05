import userData from '../../../fixtures/creds/company_with_products.json';
import counterparties from '../../../page_objects/counterparties';
import dashBoard from '../../../page_objects/dashBoard';
import data from '../../../fixtures/TC56_6.json';

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithData);
        cy.closeSuccessNotification();
        dashBoard.counterparties.click();
        counterparties.clients.click();
    })

    it('checks name filter for client search', () => {
        counterparties.filterByName.type(data.clientName);
        cy.launchFilter();
        cy.selectRowAndColumnInTableBody(0, 1)
            .find('a')
            .invoke('text')
            .then((text) => {
                const trimmedText = text.trim();
                expect(trimmedText).to.eq(data.clientName);
            });
        cy.contains('Нет результатов').should('not.exist');
    })

    it('checks iin/bin filter for client search', () => {
        counterparties.filterByIIN_BIN.type(data.clientBin);
        cy.launchFilter();
        cy.selectRowAndColumnInTableBody(0, 2)
            .find('div')
            .invoke('text')
            .then((text) => {
                const trimmedText = text.trim();
                expect(trimmedText).to.eq(data.clientBin);
            });
        cy.contains('Нет результатов').should('not.exist');
    })

    it('checks phone number filter for client search', () => {
        counterparties.filterByPhoneNumber.type(data.clientNumber);
        cy.launchFilter();
        cy.selectRowAndColumnInTableBody(0, 3)
            .find('div')
            .invoke('text')
            .then((text) => {
                const trimmedText = text.trim().replace(/\s+/g, ' ');
                expect(trimmedText).to.eq(data.clientNumber);
            });
    })

    it('checks company type filter for client search', () => {
        counterparties.filterByCompanyType.click();
        cy.chooseOptionFromList(data.clientCompanyType);
        cy.launchFilter();
        cy.get('table tbody').contains('tr', data.clientJointStockVenture).should('exist');
    })
})
