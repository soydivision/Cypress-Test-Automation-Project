import productData from '../../fixtures/TC10.json';
import userData from '../../fixtures/creds/company_with_products.json';
import dashBoard from '../../page_objects/dashBoard';

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithData);
        cy.closeSuccessNotification();
        dashBoard.salesMode.click();
        cy.tryToOpenShift();
        cy.tryToOpenTerminalList();
    })

    it('adds to postponement', () => {
        cy.addToCart(productData.barcode);
        cy.clickSpanByText(productData.name);
        cy.editProduct();
        cy.get('.modal-body').find('input[type="checkbox"]').first().click({ force: true });
        cy.save();
        cy.contains('Быстрые')
            .contains('товары').click();
        cy.get('.modal-body')
            .contains('div', productData.name)
            .should('be.visible');

        // Revert
        cy.Escape();
        cy.remove();
        cy.addToCart(productData.barcode);
        cy.clickSpanByText(productData.name);
        cy.editProduct();
        cy.get('.modal-body').find('input[type="checkbox"]').first().click({ force: true });
        cy.save();
        cy.remove();
        cy.get('#terminalSearchInput').clear();
        cy.contains('Быстрые')
            .contains('товары').click();
        cy.get('.modal-body')
            .children('div', productData.name)
            .should('not.be.visible');
    })
})
