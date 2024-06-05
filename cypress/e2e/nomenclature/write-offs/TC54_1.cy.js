import userData from '../../../fixtures/creds/company_with_products.json';
import sysMessages from '../../../fixtures/system_notifications_and_messages.json';
import dashBoard from '../../../page_objects/dashBoard';
import nomenclature from '../../../page_objects/nomenclature';
import data from '../../../fixtures/TC54_1.json';

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithMultipleWarehouses);
        cy.closeSuccessNotification();
        dashBoard.goods.click();
        dashBoard.nomenclature.click();
    })

    it('create write off', () => {
        nomenclature.writeoffsButton.click();
        nomenclature.createWriteoffButton.click();
        cy.modalContent().contains(data.main_warehouse).click();
        cy.choose().wait(3000);
        cy.get('input').type(data.barcode).wait(2000);
        cy.get('#writeoff_form_value_row_1').type(data.write_off_amount);
        cy.clickSpanByText('Завершить');
        cy.typeToTextArea(data.write_off_comment);
        cy.get('#formWriteOff_submit').click();
        cy.messageDisplayed(sysMessages.creationSuccess);
    })
    // to do check the amount after write off
})