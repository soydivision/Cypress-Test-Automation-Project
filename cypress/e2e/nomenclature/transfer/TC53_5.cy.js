import userData from '../../../fixtures/creds/company_with_products.json';
import dashBoard from '../../../page_objects/dashBoard';
import nomenclature from '../../../page_objects/nomenclature';
import RandomNumberGenerator from '../../../support/randomNumberGenerator';
import data from '../../../fixtures/TC53_5.json'

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithMultipleWarehouses);
        cy.closeSuccessNotification();
        dashBoard.goods.click();
        dashBoard.nomenclature.click().wait(2000);
        nomenclature.productTransfer.click();
        cy.setPeriod('С начала года');
        cy.launchFilter();
    })

    it('downloads documentation', () => {
        cy.selectRowAndColumnInTableBody(RandomNumberGenerator.generateRandomNumberUnderUpperBound(20), 5).find('button').click();
        cy.contains('Скачать документ перемещения (pdf)').click();
        cy.selectRowAndColumnInTableBody(RandomNumberGenerator.generateRandomNumberUnderUpperBound(20), 5).find('button').click();
        cy.contains('Скачать документ перемещения (xlsx)').click();
        cy.readFile("cypress/downloads/" + data.downloaded_file_name_1).should('exist');
        cy.readFile("cypress/downloads/" + data.downloaded_file_name_2).should('exist');
    })
})