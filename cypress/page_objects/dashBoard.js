class dashBoard {

    get nomenclature() {
        return cy.contains('p', 'Номенклатура')
    }

    get product_layout_compound_index() {
        return cy.contains('a.nav-link', 'Составной товар')
    }

    get filter_vendor_code() {
        return cy.get('#filter_vendor_code')
    }

    get submit_query() {
        return cy.get('#itemTableFilter_form_btn_submit')
    }

    get no_results_message() {
        return cy.contains('Нет результатов');
    }

    get refund_type() {
        return cy.contains('Тип оплаты')
    }

    get first_filter_result_row() {
        return cy.get('#refund_form_refund_row_1')
    }

    get fiscal_number_filter() {
        return cy.get('input[id="filter_sale_receiptNumber"]')
    }

    get create_refund() {
        return cy.contains('Создать возврат')
    }

    get refund() {
        return cy.contains('Оформить возврат')
    }

    get returns() {
        return cy.contains('Возвраты')
    }

    get sales() {
        return cy.contains('Продажи')
    }

    get realization() {
        return cy.contains('Реализация')
    }

    get settings() {
        return cy.contains('Настройки')
    }

    get close_welcome_window_button() {
        return cy.get('button[aria-label="Close"]')
    }

    get settingsCompany() {
        return cy.get('a').contains('Компания')
    }

    get settings_payment_keys() {
        return cy.contains('Оплата / ключи')
    }

    get settingsEmployees() {
        return cy.get('p').contains('Сотрудники')
    }

    get finances() {
        return cy.contains('Финансы')
    }

    get salesMode() {
        return cy.contains('Режим продаж')
    }

    get seeCheck() {
        return cy.contains('button', 'Просмотр чека');
    }

    get reports() {
        return cy.contains('span', 'Отчеты');
    }

    get shiftReports() {
        return cy.contains('Отчёты по сменам');
    }

    get ABCanalysis() {
        return cy.contains('ABC анализ');
    }

    get KKMshifts() {
        return cy.contains('Смены ККМ');
    }

    get cashiersReport() {
        return cy.contains('Отчёты по кассирам');
    }

    get counterparties() {
        return cy.contains('span', 'Контрагенты');
    }

    get goods() {
        return cy.contains('span', 'Товары');
    }

    get management() {
        return cy.contains('span', 'Управление');
    }
}

export default new dashBoard();
