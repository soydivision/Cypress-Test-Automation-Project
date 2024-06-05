class counterparties {
    get suppliers() {
        return cy.get('a').contains('Поставщики');
    }

    get clients() {
        return cy.get('a').contains('Клиенты');
    }

    get counterparties() {
        return cy.get('span').contains('Контрагенты');
    }

    get addClient() {
        return cy.get('button').contains('Добавить клиента');
    }

    get filterByName() {
        return cy.get('[placeholder="Поиск по имени"]');
    }

    get filterByIIN_BIN() {
        return cy.get('#vendor_filter_iinBin');
    }

    get filterByPhoneNumber() {
        return cy.get('[placeholder="+7 (XXX) XXX-XXXX"]');
    }

    get filterByCompanyType() {
        return cy.get('span').contains('Тип компании');
    }
}

export default new counterparties();
