import userData from '../../fixtures/creds/company_with_products.json';
import dashBoard from '../../page_objects/dashBoard';

describe.skip('', () => {
    beforeEach(() => {
        cy.logIn(userData.phoneNumber, userData.password);
        cy.selectCompany(userData.companyWithData);
        cy.closeSuccessNotification();
        dashBoard.salesMode.click().wait(2000);
    })

    it('check shift creation in reports', () => {

        // try to open shift
        cy.wait(2000);
        cy.contains('h5', 'Открыть смену').if('visible')
            .then(() => {
                cy.clickNumpadButton('5');
                cy.clickNumpadButton('0');
                cy.clickNumpadButton('0');
                cy.get('button').contains('Открыть смену').click();
            })
            .else().log('shift was already open');

        //try to close shift 
        cy.burgerButton();
        cy.contains('Закрыть смену Prosklad').click();
        cy.clickNumpadButton('7');
        cy.clickNumpadButton('7');
        cy.clickNumpadButton('7');
        cy.get('button').contains('Закрыть смену').click();
        cy.get('button').contains('На главную').click();
        // отчеты 
        // отчеты по сменам 

        // cy.wait(2000);
        // cy.contains('h5', 'Открыть смену').if('visible')
        //     .then(() => {
        //         cy.clickNumpadButton(RandomNumberGenerator.generateRandomNumberInRange(1, 9));
        //         cy.clickNumpadButton(RandomNumberGenerator.generateRandomNumberInRange(1, 9));
        //         cy.clickNumpadButton(RandomNumberGenerator.generateRandomNumberInRange(1, 9));
        //         cy.get('button').contains('Открыть смену').click();
        //     })
        //     .else().log('shift was already open');

        // найти в списке что последняя отобразилась именно она
        // assert sum is 777
        //закрыть смену //try close



    })

})
