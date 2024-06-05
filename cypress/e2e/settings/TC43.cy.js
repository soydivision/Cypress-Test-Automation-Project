import userData from '../../fixtures/creds/company_with_products.json';

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithData);
        cy.closeSuccessNotification();
    })

    it('opens tutorial link', () => {
        cy.get('#page_header_account').click();
        cy.contains('Обучение').click();
        cy.get('h5').contains('Пройдите обучение чтобы стать уверенным пользователем системы').should('exist');
    })
})
