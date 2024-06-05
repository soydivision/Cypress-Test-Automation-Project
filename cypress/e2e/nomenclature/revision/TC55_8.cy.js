import userData from '../../../fixtures/creds/company_with_products.json';
import dashBoard from '../../../page_objects/dashBoard';
import nomenclature from '../../../page_objects/nomenclature';
import data from '../../../fixtures/TC55_8.json'
import RandomNumberGenerator from '../../../support/randomNumberGenerator';

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithData);
        cy.closeSuccessNotification();
        dashBoard.goods.click();
        dashBoard.nomenclature.click();
    })

    it('tries to download revision file', () => {
        nomenclature.revisionButton.click();
        cy.get('#filter_invoice_datepicker').trigger('mouseover').click();
        cy.contains(' С начала года ').click();
        cy.launchFilter();
        cy.get('tbody').find('tr').then(($trElements) => {
            const trElements = $trElements.length;
            const randomRow = RandomNumberGenerator
                .generateRandomNumberUnderUpperBound(trElements);
            cy.selectRowAndColumnInTableBody(randomRow, 7).find('button').click();
        })
        cy.get('[data-action="download"]').click();
        cy.readFile("cypress/downloads/" + data.inventory_file_name).should('exist');
    })
})