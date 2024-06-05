import userData from '../../../fixtures/creds/company_with_products.json';
import dashBoard from '../../../page_objects/dashBoard';
import nomenclature from '../../../page_objects/nomenclature';
import findProductData from '../../../fixtures/TC51_4.json';

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithData);
        cy.closeSuccessNotification();
        dashBoard.goods.click();
        dashBoard.nomenclature.click().wait(2000);

    })

    it('filter using barcode', () => {
        nomenclature.filterBarcode.type(findProductData.barcode);
        nomenclature.submitFilterButton.click().wait(1000);
        cy.get('td').contains('Нет результатов').should('not.exist');
    })

    it('filter using name', () => {
        nomenclature.filterName.type(findProductData.name);
        nomenclature.submitFilterButton.click().wait(1000);;
        cy.get('td').contains('Нет результатов').should('not.exist');
    })

    it('filter using vendor code', () => {
        nomenclature.filterVendorCode.type(findProductData.vendor_code);
        nomenclature.submitFilterButton.click().wait(1000);;
        cy.get('td').contains('Нет результатов').should('not.exist');
    })
})