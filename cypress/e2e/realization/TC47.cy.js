import userData from '../../fixtures/creds/company_with_products.json';
import dashBoard from '../../page_objects/dashBoard';
import realization from '../../page_objects/realization';

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithData);
        cy.closeSuccessNotification();
    })

    it('is used to see check in `realization` tab', () => {
        dashBoard.realization.click();
        realization.sales.click();
        cy.get('td[data-label="№"]').first().click();
        dashBoard.seeCheck.click();
        cy.get('h5')
            .contains('Просмотр чека')
            .should('exist');
    })
})
