// any page which contains https://prosklad.kz/terminal/ 

class terminalPage {

    get noResultMessage() {
        return cy.contains("Поиск не дал результатов")
    }

    get cashRegister() {
        return cy.contains('ККМ')
    }

    get updateXReport() {
        return cy.contains('button', 'Обновить (X-отчет)');
    }

    get history() {
        return cy.contains('li', 'История');
    }

    get closeCashRegisterShift() {
        return cy.contains('button', 'Закрыть смену ККМ');
    }

    get submitCashIntoCashRegister() {
        return cy.contains('button', 'Внести сумму в ККМ');
    }


    get cashRegister() {
        return cy.contains('ККМ')
    }

    get updateXReport() {
        return cy.contains('button', 'Обновить (X-отчет)');
    }

    get insertSummCashRegister() {
        return cy.contains('Внести сумму в ККМ')
    }

    get insertSumm() {
        return cy.
            get('#terminal-cashbox_submit');
    }

    get aboutShift() {
        return cy.
            contains('О смене');
    }

    get extractSummCashRegister() {
        return cy.contains('Изъять сумму из ККМ')
    }

    get summToExtractInput() {
        return cy.get('[data-name="sum"]')
            .find('input');
    }

    get extractSummButton() {
        return cy.get('#terminal-cashbox_submit');
    }

    get insertSummButton() {
        return cy.get('#terminal-cashbox_submit');
    }

    get openShiftButton() {
        return cy.get('button').contains('Открыть смену');
    }
}

export default new terminalPage();


