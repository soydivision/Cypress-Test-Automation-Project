import userData from '../../fixtures/creds/company_with_products.json';
import dashBoard from '../../page_objects/dashBoard';
import realization from '../../page_objects/realization';
import data from '../../fixtures/TC46_4.json';
import RandomNumberGenerator from '../../support/randomNumberGenerator';

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithData);
        cy.closeSuccessNotification();
    })

    it('checks discount for sale', () => {
        dashBoard.realization.click();
        realization.sales.click();
        realization.createSale.click().wait(1000);
        cy.searchProductByBarcodeOrNameFilter().typeSlow(data.barcode).wait(1500).type('{enter}');
        const discount = RandomNumberGenerator.generateRandomNumberInRange(data.min_discount * 1, data.max_discount * 1);
        cy.dataLabel('Скидка').find('input').clear().type(discount).wait(2000);
        cy.clickOnButtonContains('Завершить продажу').wait(2000);
        cy.modalContent().find('button').contains('Выбить чек').click();
        cy.contains('Просмотр чека').should('be.visible');
    })
})
