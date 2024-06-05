import data from '../../fixtures/TC21.json'
import RandomNumberGenerator from '../../support/randomNumberGenerator';
import userData from '../../fixtures/creds/company_with_products.json';
import dashBoard from '../../page_objects/dashBoard';
import nomenclature from '../../page_objects/nomenclature';
import { constants } from '../../support/constants';
import terminal from '../../page_objects/terminalPage'



describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithData);
        cy.closeSuccessNotification();
        dashBoard.salesMode.click();
        cy.tryToOpenShift();
        cy.tryToOpenTerminalList();
    })

    it('tests service in cart', () => {
        cy.addToCart(data.serviceName);
        cy.addCommission(data.commission);
        cy.save();

        //set perc discount 
        cy.discount().wait(1000);
        cy.contains('span.text-muted', 'Скидка за ед.').click();
        const discountValueTwoDigit = RandomNumberGenerator.generateRandomNumberInRange(10, 40);
        cy.log(discountValueTwoDigit);
        cy.contains('button.numpad__btn', discountValueTwoDigit.toString()[0]).click();
        cy.contains('button.numpad__btn', discountValueTwoDigit.toString()[1]).click();
        cy.save();

        // max quantity
        cy.discount();
        cy.typeToPageBody(RandomNumberGenerator.generateRandomNumberInRange(2, 20));
        cy.save();

        // global discount
        cy.pay();
        cy.contains('button', 'Скидка на чек').click();
        cy.get('svg[aria-hidden="true"][data-icon="tenge"]').click();
        cy.get('.terminal-pay__body')
            .find('#sale_common_discount_sum')
            .typeSlow(RandomNumberGenerator.generateRandomNumberUnderUpperBound(10000)).wait(2000);
        cy.checkOut();
        cy.dismissFeedbackWindow();
        cy.get(".modal-body").contains('чек').should('exist');
        cy.contains('Просмотр чека').should('exist');
    })

    it('tries to accept service', () => {
        nomenclature.acceptance.click();
        cy.get('#terminalSearchInput')
            .typeSlow(data.serviceName)
            .wait(constants.SEARCH_TIMEOUT_SMALL);
        terminal.noResultMessage.should('exist');
    })
})
