import terminal from '../../page_objects/terminalPage'
import { constants } from '../../support/constants';
import searchData from '../../fixtures/TC19.json'
import dashBoard from '../../page_objects/dashBoard';
import userData from '../../fixtures/creds/company_with_products.json';

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithData);
        cy.closeSuccessNotification();
        dashBoard.salesMode.click();
        cy.tryToOpenShift();
    })

    it('search product by vendor code', () => {
        cy.get('#terminalSearchInput')
            .typeSlow(searchData.vendorCode)
            .wait(constants.SEARCH_TIMEOUT_SMALL);
        terminal.noResultMessage.should('not.exist');
    })
})
