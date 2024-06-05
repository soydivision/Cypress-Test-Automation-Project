import userData from '../../fixtures/creds/company_with_products.json';
import dashBoard from '../../page_objects/dashBoard';
import productData from '../../fixtures/TC46_1.json';
import RandomNumberGenerator from '../../support/randomNumberGenerator';
import realization from '../../page_objects/realization';

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithData);
        cy.closeSuccessNotification();
        dashBoard.realization.click();
        realization.sales.click().wait(2000);
    })

    it('searches products using filter by name', () => {
        cy.searchProductInputFilterTypeSlow(productData.name);
        cy.launchFilter();
        // picks a random search results and clicks on it:
        cy.tableHasContent();
        cy.get('[data-label="№"]').find('div').then($elements => {
            cy.wrap($elements[RandomNumberGenerator.generateRandomNumberUnderUpperBound($elements.length)]).click();
        });
        cy.contains(productData.name).should('be.visible');
    })

    it('searches products using filter by barcode', () => {
        cy.searchProductInputFilterTypeSlow(productData.barcode);
        cy.launchFilter();
        cy.tableHasContent();
        // picks a random search results and clicks on it:
        cy.get('[data-label="№"]').find('div').then($elements => {
            cy.wrap($elements[RandomNumberGenerator.generateRandomNumberUnderUpperBound($elements.length)]).click();
        });
        cy.contains(productData.name).should('be.visible');
    })
})
