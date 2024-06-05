import dashBoard from '../../page_objects/dashBoard';
import realization from '../../page_objects/realization';
import data from '../../fixtures/TC46_5.json';
import userData from '../../fixtures/creds/company_with_products.json';
import RandomNumberGenerator from '../../support/randomNumberGenerator';

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithData);
        cy.closeSuccessNotification();
    })

    it('checks price for sale', () => {
        dashBoard.realization.click();
        realization.sales.click();
        realization.createSale.click().wait(1000);
        cy.searchProductByBarcodeOrNameFilter().typeSlow(data.barcode).wait(1000).type('{enter}');
        const newPrice = RandomNumberGenerator.generateRandomNumberInRange(data.min_price * 1, data.max_price * 1);
        cy.dataLabel('Цена').find('input').clear().type(newPrice); // to do make random
        cy.clickOnButtonContains('Завершить продажу').wait(2000);
        cy.modalContent().find('button').contains('Выбить чек').click();
        cy.contains('Просмотр чека').should('be.visible');
    })
})
