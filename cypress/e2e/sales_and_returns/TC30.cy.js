import dashBoard from '../../page_objects/dashBoard';
import RandomNumberGenerator from '../../support/randomNumberGenerator';
import userData from '../../fixtures/creds/company_with_products.json';

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithData);
        cy.closeSuccessNotification();
    })

    it('searches for print button on fiscal check', () => {
        dashBoard.realization.click();
        dashBoard.sales.click();
        cy.get('tbody')
            .find('tr')
            .its('length')
            .then((rowCount) => {
                cy.get('tbody').find('tr').eq(RandomNumberGenerator.generateRandomNumberUnderUpperBound(rowCount))
                    .find('[type="button"]').first().click();
                cy.get('[role="menuitem"]').contains('Просмотр').click({ force: true });
                cy.contains('Просмотр чека').click();
                cy.modalContent().contains('Просмотр чека').should('exist');
            })
    })
})
