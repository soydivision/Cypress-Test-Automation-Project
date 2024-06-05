import userData from '../../fixtures/creds/company_with_products.json';
import dashBoard from '../../page_objects/dashBoard';
import sysMessages from '../../fixtures/system_notifications_and_messages.json';

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithData);
        cy.closeSuccessNotification();
        dashBoard.salesMode.click().wait(2000);
    })

    it('', () => {
        cy.tryToOpenShift();
        cy.burgerButton();
        cy.get('#terminal-menu_home').click();
        dashBoard.reports.click();
        dashBoard.shiftReports.click();

        // проверить что смена открыта  
        cy.selectRowAndColumnInTableBody(0, 4)
            .find('div')
            .invoke('text')
            .then((text) => {
                const trimmedText = text.trim().replace(/\s+/g, ' ');
                cy.log(trimmedText);
                expect(trimmedText).to.eq("Закрыть смену");
            });

        // close shift
        cy.selectRowAndColumnInTableBody(0, 4).click();
        cy.modalContent().contains('button', 'Закрыть смену').click();
        cy.messageDisplayed(sysMessages.operationSuccessfull);
    })
})
