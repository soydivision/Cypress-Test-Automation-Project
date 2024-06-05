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

    it('creates new universal product and adds it to cart', () => {
        cy.universalProduct();
        cy.clickSpanByText('Цена');
        cy.typeToPageBody("1000");
        cy.save();
        cy.editProduct();
        cy.get('.modal-content')
            .contains('Универсальный товар')
            .invoke('text')
            .then((universalProductBarcode) => {
                cy.Escape();
                cy.cleanCart();
                cy.addToCart(universalProductBarcode);
                cy.productIsInCart(universalProductBarcode);
            });
        cy.cleanCart();
    })
})