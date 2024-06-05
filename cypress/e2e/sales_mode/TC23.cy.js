import productData from '../../fixtures/TC23.json';
import { constants } from '../../support/constants';
import userData from '../../fixtures/creds/company_with_products.json';
import dashBoard from '../../page_objects/dashBoard';

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithData);
        cy.closeSuccessNotification();
        dashBoard.salesMode.click();
        cy.tryToOpenShift(); cy.tryToOpenTerminalList();
    })

    it('adds product to cart using search results then changes quantities using click on product title', () => {
        cy.addToCart(productData.productName);
        cy.addToCart(productData.productName);
        cy.addToCart(productData.productName);
        cy.addToCart(productData.productName);
        cy.addToCart(productData.productName);
        cy.addToCart(productData.productName);
        // we don't use `addToCart` for the last one
        cy.get('#terminalSearchInput')
            .typeSlow(productData.productName)
            .wait(constants.SEARCH_TIMEOUT_SMALL);
        cy.get('div.terminal-product-title').first().click();
        cy.get('p.text-danger').should('exist');
        cy.cancel(); // might not work due to first result in search bar that appears is not 'Ктулху'
    })

    it('adds product to cart then changes  quantities using dbl click on position in checkout list and input more than stock', () => {
        cy.addToCart(productData.productName);
        cy.contains('span', productData.productName).dblclick()
        cy.contains('button.numpad__btn', parseInt(productData.inStock) + 1).click();
        cy.save();
        cy.get('p.text-danger').should('exist');
        cy.cancel();
    })

    it('adds product to cart more than stock then changes quantities using plus', () => {
        cy.addToCart(productData.productName);
        cy.get('svg[data-icon="plus"]')
            .clickTimes(parseInt(productData.inStock) - 1);
        cy.get('svg[data-icon="plus"]')
            .parent('button')
            .should('have.attr', 'disabled', 'disabled'); // we can't press + if we're out of stock 
    })

    it.only('adds products to cart then changes quantities more than stock using quantity/discount button left bottom', () => {
        cy.addToCart(productData.productName);
        cy.discount();
        cy.contains('button.numpad__btn', parseInt(productData.inStock) + 1).click();
        cy.save();
        cy.get('p.text-danger').should('exist');
        cy.cancel();
    })
})

