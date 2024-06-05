import userData from '../../../fixtures/creds/company_with_products.json';
import sysMessages from '../../../fixtures/system_notifications_and_messages.json';
import dashBoard from '../../../page_objects/dashBoard';
import nomenclature from '../../../page_objects/nomenclature';
import data from '../../../fixtures/TC55_9.json'

describe.skip('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithData);
        cy.closeSuccessNotification();
        dashBoard.nomenclature.click();
    })

    it('edits revision', () => {
        nomenclature.revisionButton.click();
        cy.contains('Незавершенные').click();
        cy.placeHolder('Название').type(data.unfinished_revision_name);
        cy.launchFilter();
        cy.selectRowAndColumnInTableBody(0, 8).click();
        cy.get('button[data-action="edit"]').click();
        nomenclature.addProduct.click();
        nomenclature.addProductFromNomenclature.click().wait(2000);
        cy.get('#modalAddProducts___BV_modal_content_').find('#modalAddProducts_filter_product_vendor_code').type(data.product_to_add_vendor_code);
        cy.launchFilter();
        cy.get('#modalAddProducts___BV_modal_content_').find('tbody').find('tr').eq(0).find('td').eq(0).click();
        cy.get('#modalAddProducts___BV_modal_content_').find('#modal_add_products_submit_button').click();
        cy.get('tbody').contains(data.product_to_add_vendor_code).should('be.visible');
        cy.selectRowAndColumnInTableBody(0, 9).find('button').wait(4000).click();
        cy.messageDisplayed(sysMessages.executionSuccess);
        cy.get('tbody').should('not.have.value', data.product_to_add_vendor_code);
        // to do analyse more
    })
})