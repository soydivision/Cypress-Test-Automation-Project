import productData from '../../fixtures/TC12.json';
import dashBoard from '../../page_objects/dashBoard';
import userData from '../../fixtures/creds/company_with_products.json';
import RandomNumberGenerator from '../../support/randomNumberGenerator';
import sysMessages from '../../fixtures/system_notifications_and_messages.json'

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithData);
        cy.closeSuccessNotification();
        dashBoard.salesMode.click();
        cy.tryToOpenShift();
        cy.tryToOpenTerminalList();
    })

    it('pays cash', () => {
        cy.addToCart(productData.product_1);
        cy.addToCart(productData.product_2, false, { multiple: true });
        cy.addToCart(productData.product_3);
        cy.pay();
        cy.contains('button', 'Наличные').click();
        cy.checkOut();
        cy.get(".modal-body").contains('чек').should('exist');
        cy.messageDisplayed(sysMessages.executionSuccess);
        cy.closeSuccessNotification();
        cy.dismissFeedbackWindow();
        cy.contains('Просмотр чека').should('be.visible');
    })

    it('pays via credit card', () => {
        cy.addToCart(productData.product_1);
        cy.addToCart(productData.product_2, false, { multiple: true });
        cy.addToCart(productData.product_3);
        cy.pay();
        cy.contains('button', 'Картой').click()
        cy.checkOut();
        cy.get(".modal-body").contains('чек').should('exist');
        cy.closeSuccessNotification();
        cy.dismissFeedbackWindow();
        cy.contains('Просмотр чека').should('be.visible');
    })

    it('provides product for credit (no %)', () => {
        cy.addToCart(productData.product_1);
        cy.addToCart(productData.product_2, false, { multiple: true });
        cy.addToCart(productData.product_3);
        cy.pay();
        cy.contains('button', 'Добавить оплату').click().wait(1000);
        cy.contains('span', 'В долг').click({ force: true });
        cy.checkOut();
        cy.contains('button', productData.debtor).click();
        cy.contains('Выбрать').click();
        cy.messageDisplayed(sysMessages.executionSuccess);
        cy.closeSuccessNotification();
        cy.dismissFeedbackWindow();
        cy.get(".modal-body").contains('чек').should('be.visible');
        cy.contains('Просмотр чека').should('be.visible');
    })

    it('splits product payment between cash and credit card', () => {
        cy.addToCart(productData.product_1);
        cy.addToCart(productData.product_2, false, { multiple: true });
        cy.addToCart(productData.product_3);
        cy.pay();
        cy.contains('button', 'Картой').click().wait(1000);
        cy.contains('button', 'Добавить оплату').click();
        cy.get('ul.dropdown-menu.show')
            .find('li.border.rounded')
            .contains('Наличные')
            .click();
        cy.get('.terminal-pay__body')
            .find('[role="group"]')
            .find('[title="Наличные"]')
            .parent()
            .parent()
            .parent()
            .find('[type="tel"]')
            .type(RandomNumberGenerator.generateRandomNumberInRange(1, 10000));
        cy.checkOut();
        cy.messageDisplayed(sysMessages.executionSuccess);
        cy.closeSuccessNotification();
        cy.dismissFeedbackWindow();
        cy.get(".modal-body").contains('чек').should('be.visible');
        cy.contains('Просмотр чека').should('be.visible');
    })
})
