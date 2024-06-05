import userData from '../../fixtures/creds/company_with_products.json';

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithData);
        cy.closeSuccessNotification();
    })

    it('changes locale', () => {
        cy.contains(userData.companyWithData).click();

        cy.get('[aria-labelledby="page_header_account__BV_toggle_"]')
            .find('span')
            .contains('Настройки').click();
        cy.contains('Қазақша').click();
        cy.contains('Бас').should('be.visible');
    })
})
