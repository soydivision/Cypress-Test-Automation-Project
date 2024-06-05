class reports {

    get warehouseFilter() {
        return cy.get('#filter_shift_search_stock');
    }

    get employeeFilter() {
        return cy.get('#filter_shift_search_employee');
    }

    get startSumFrom() {
        return cy.get('#filter_shift_startSumFrom');
    }

    get startSumTo() {
        return cy.get('#filter_shift_startSumTo');
    }

    get endSumFrom() {
        return cy.get('#filter_shift_endSumFrom');
    }

    get endSumTo() {
        return cy.get('#filter_shift_endSumTo');
    }

    get searchByBarcode() {
        return cy.get('#search_product_by_barcode_or_name');
    }

    get ABCReportExport() {
        return cy.get('#abc_action_export');
    }

    get barcodeInput() {
        return cy.get('#export_barcode');
    }
}

export default new reports();
