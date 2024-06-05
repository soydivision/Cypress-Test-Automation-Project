class realization {
    get createSale() {
        return cy.get('#sale_action_create');
    }

    get sales() {
        return cy.contains('Продажи');
    }

    get saleInvoice() {
        return cy.contains('Счет на оплату');
    }

    get createSaleInvoice() {
        return cy.get('#sale_action_create');
    }
}

export default new realization();
