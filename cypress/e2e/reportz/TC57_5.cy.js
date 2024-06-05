import data from '../../fixtures/TC57_5.json';

describe('', () => {
    beforeEach(() => {
        cy.logIn(data.phoneNumber, data.password);
    })

    it('', () => {
        cy.contains(data.availableWarehouse_1).should('be.visible');
        cy.contains(data.availableWarehouse_2).should('be.visible');
    })
})