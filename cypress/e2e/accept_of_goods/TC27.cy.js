import data from '../../fixtures/TC27.json'
import user from '../../fixtures/creds/company_with_products.json';
import dashBoard from '../../page_objects/dashBoard';

describe('', () => {
  beforeEach(() => {
    cy.logIn(user.phoneNumber, user.password);
    cy.selectCompany(user.companyWithData);
    cy.closeSuccessNotification();
    dashBoard.salesMode.click();
    cy.clickAcceptOfGoods();
    cy.tryToOpenShift();
    cy.tryToOpenTerminalList();
    cy.addToCart(data.productName1, true, { multiple: false });
    cy.save();
    cy.clearTerminal();
    cy.addToCart(data.productName2, true, { multiple: false });
    cy.save();
    cy.clearTerminal();
    cy.addToCart(data.productName3, true, { multiple: false });
    cy.save();
    cy.clearTerminal();
  })

  it('ensures products can be removed from cart in accept of goods', () => {
    cy.remove();
    cy.remove();
    cy.remove();
    cy.cartIsEmpty();
  })

  // hereafter TC28
  it('ensures products can be cleaned from cart in accept of goods', () => {
    cy.cleanCart();
    cy.cartIsEmpty();
  })
})
