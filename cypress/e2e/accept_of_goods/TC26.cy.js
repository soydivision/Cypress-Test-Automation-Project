import data from '../../fixtures/TC26.json'
import sysMessages from '../../fixtures/system_notifications_and_messages.json'
import RandomNumberGenerator from '../../support/randomNumberGenerator';
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
    cy.addToCart('Нарукавник Водолазка калифорня черный', true, { multiple: false });
    cy.get('span.text-muted').contains("ШТ").click().type(RandomNumberGenerator.generateRandomNumberInRange(data.min_amount, data.max_amount));
    cy.get('span.text-muted').contains("Цена закупки").click().type(RandomNumberGenerator.generateRandomNumberInRange(data.min_procurement_price, data.max_procurement_price));
    cy.get('span.text-muted').contains("Процент накрутки").click().type(RandomNumberGenerator.generateRandomNumberInRange(data.min_profit_in_perc, data.max_profit_in_perc)).wait(1000);
    cy.save();
    cy.acceptGoods();
    cy.modalContent().find('[placeholder="Поиск"]').wait(1000).type(data.supplier);
    cy.contains('button', data.supplier).click();
    cy.choose();
  })

  it('edits quantity, procurement price, profit %, sales price, delay payment', () => {
    cy.contains('button', 'Оплатить позже').click();
    cy.messageDisplayed(sysMessages.creationSuccess);
  })

  it('edits quantity, procurement price, profit %, sales price, pay by wallet', () => {
    cy.chooseWallet(data.wallet);
    cy.get('button.btn.btn-primary').contains('Оплатить').click();
    cy.messageDisplayed(sysMessages.paymentSuccess);
  })
})
