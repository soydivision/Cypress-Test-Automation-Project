import userData from '../../fixtures/creds/company_with_products.json';
import dashBoard from '../../page_objects/dashBoard';
import realization from '../../page_objects/realization';
import data from '../../fixtures/TC46_3.json';
import RandomNumberGenerator from '../../support/randomNumberGenerator';


describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithData);
        cy.closeSuccessNotification();
    })

    it('changes amount during sale', () => {
        dashBoard.realization.click();
        realization.sales.click();
        realization.createSale.click().wait(3000);
        cy.searchProductByBarcodeOrNameFilter().typeSlow(data.barcode).wait(1500).type('{enter}');
        const sale_quantity = RandomNumberGenerator.generateRandomNumberInRange(data.sale_quantity_min * 1, data.sale_quantity_max * 1);
        cy.dataLabel('Количество').find('input').clear().type(sale_quantity);
        cy.clickOnButtonContains('Завершить продажу').wait(2000); // to do make assertion.
        cy.modalContent().find('button').contains('Выбить чек').click();
        cy.contains('Просмотр чека').should('be.visible');
    })
})
