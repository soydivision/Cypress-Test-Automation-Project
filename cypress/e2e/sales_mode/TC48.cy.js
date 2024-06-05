
import data from '../../fixtures/TC48.json'
import dashBoard from '../../page_objects/dashBoard';
import userData from '../../fixtures/creds/company_with_products.json';

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithMultipleWarehouses);
        cy.closeSuccessNotification();
        dashBoard.salesMode.click();
        cy.chooseWarehouse(userData.warehouse);
    })

    it('changes warehouse', () => {
        cy.burgerButton();
        cy.get('p').contains('Изменить склад').click();
        cy.contains(data.alt_warehouse).click();
        cy.burgerButton();
        cy.contains(data.alt_warehouse).should('exist');
    })
})

