import data from '../../fixtures/TC20.json';
import dashBoard from '../../page_objects/dashBoard';
import nomenclature from '../../page_objects/nomenclature';
import userData from '../../fixtures/creds/company_with_products.json';

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithData);
        cy.closeSuccessNotification();
        dashBoard.goods.click();
        cy.chooseOptionFromList('Номенклатура');
    })

    it('search out of stock product by vendor code', () => {
        dashBoard.filter_vendor_code.typeSlow(data.productOutOfStockVendorcode);
        dashBoard.submit_query.click();
        cy.selectRowAndColumnInTableBody(0, 6)
            .find('span')
            .invoke('text')
            .then((text) => {
                const trimmedText = text.trim();
                expect(trimmedText).to.eq(data.amount);
            });
    })
})
