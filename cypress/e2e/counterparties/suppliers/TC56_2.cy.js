import data from '../../../fixtures/TC56_2.json';
import userData from '../../../fixtures/creds/company_with_products.json';
import counterparties from '../../../page_objects/counterparties';
import dashBoard from '../../../page_objects/dashBoard';

describe('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithData);
        cy.closeSuccessNotification();
        dashBoard.counterparties.click();
        counterparties.suppliers.click();
    })

    it('checks filters using name', () => {
        cy.placeHolder('Поиск по имени поставщика').type(data.company);
        cy.launchFilter();
        cy.selectRowAndColumnInTableBody(0, 0)
            .find('span')
            .invoke('text')
            .then((text) => {
                const trimmedText = text.trim();
                expect(trimmedText).to.eq(data.company);
            });
    })

    it('checks filters director name', () => { //
        cy.placeHolder('Имя директора').type(data.dir_name);
        cy.launchFilter();
        cy.selectRowAndColumnInTableBody(0, 0)
            .find('span')
            .invoke('text')
            .then((text) => {
                const trimmedText = text.trim();
                expect(trimmedText).to.eq(data.company);
            });
    })

    // it('checks filters IIN/BIN', () => {
    //     cy.placeHolder('ИИН/БИН').type(data.iin_bin);
    //     cy.launchFilter();
    //     cy.selectRowAndColumnInTableBody(0, 0)
    //         .find('span')
    //         .invoke('text')
    //         .then((text) => {
    //             const trimmedText = text.trim();
    //             expect(trimmedText).to.eq(data.company);
    //         });
    // })  
})
