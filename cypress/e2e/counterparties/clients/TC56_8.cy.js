import userData from '../../../fixtures/creds/company_with_products.json';
import counterparties from '../../../page_objects/counterparties';
import dashBoard from '../../../page_objects/dashBoard';

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithData);
        cy.closeSuccessNotification();
        dashBoard.counterparties.click();
        counterparties.clients.click();
    })

    it('checks that client are on display', () => {
        cy.tableHasContent();
    })
})
