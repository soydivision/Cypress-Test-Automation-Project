import userData from '../../fixtures/creds/company_with_products.json';

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
    })

    it('select different companies and verifies selection', () => {
        const PAUSE = 500;
        cy.selectCompany(userData.companyWithData);
        cy.verifyThatCompanyIsSelected(userData.companyWithData);
        cy.wait(PAUSE);
        cy.closeSuccessNotification();
        cy.selectCompany(userData.companyWithData_2);
        cy.verifyThatCompanyIsSelected(userData.companyWithData_2);
        cy.wait(PAUSE);
        cy.closeSuccessNotification();
        cy.selectCompany(userData.company_3);
        cy.verifyThatCompanyIsSelected(userData.company_3);
        cy.wait(PAUSE);
        cy.closeSuccessNotification();
    })
})