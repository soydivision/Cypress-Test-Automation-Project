import userData from '../../../fixtures/creds/company_with_products.json';
import counterparties from '../../../page_objects/counterparties';
import dashBoard from '../../../page_objects/dashBoard';
import data from '../../../fixtures/TC56_10.json';

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithData);
        cy.closeSuccessNotification();
        dashBoard.counterparties.click();
        counterparties.clients.click();
    })

    it('check filters using name', () => {
        cy.placeHolder('Поиск по имени').type(data.companyName);
        cy.launchFilter();
        cy.tableHasContent();
    })

    it('check filters using iinBin', () => {
        cy.get('#vendor_filter_iinBin').type(data.iinBin);
        cy.launchFilter();
        cy.tableHasContent();
    })

    it('check filters using phone number', () => {
        cy.placeHolder('+7 (XXX) XXX-XXXX').type('+7 777 989 89 89');
        cy.launchFilter();
        cy.tableHasContent();
    })

    it('check filters using company type', () => {
        cy.contains('Тип компании').click();
        cy.chooseOptionFromList(data.companyType);
        cy.launchFilter();
        cy.tableHasContent();
    })
})
