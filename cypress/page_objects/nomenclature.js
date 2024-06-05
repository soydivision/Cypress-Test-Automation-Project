class nomenclature {
    get acceptance() {
        return cy.get('li').contains('Приемка');
    }

    // get list() {
    //     return cy.contains('div.nav-menu-new__link-child-text', 'Список');
    // }

    get productTransfer() {
        return cy.contains('a', 'Перемещение');
    }

    get createProductTransfer() {
        return cy.contains('button', 'Создать перемещение');
    }

    get addProduct() {
        return cy.contains('button', 'Добавить товар');
    }

    get addProductFromNomenclature() {
        return cy.get('#add_products_from_nomenclature_button');
    }

    get monoTypeProduct() {
        return cy.get('button#product_action_create_product_single').contains('Товар однотипный');
    }

    get multiTypeProduct() {
        return cy.get('button#product_action_create_product_modifiable').contains('Товар многотипный');
    }

    get productNameInput() {
        return cy.get('input#productFormExtended_title');
    }

    get multiProductNameInput() {
        return cy.get('input#productCreateBaseInfo_title');
    }

    get productUnitMultiselectButton() {
        return cy.get('span.multiselect__placeholder').contains('Ед. измерения');
    }

    get generateBarcodeButton() {
        return cy.get('button').contains('Сгенерировать');
    }

    get writeoffsButton() {
        return cy.contains('Списания');
    }

    get revisionButton() {
        return cy.contains('Ревизия');
    }

    get createRevisionButton() {
        return cy.contains('Создать ревизию');
    }

    get barcodeInput() {
        return cy.get('#productFormExtended_barcodeInput');
    }

    get createWriteoffButton() {
        return cy.get('button').contains('Создать списание')
    }

    get saveProductButton() {
        return cy.get('button#productFormExtended_save');
    }

    get filterProductOrService() {
        return cy.get('#filter_product_or_service_name');
    }

    get filterBarcode() {
        return cy.get('#filter_barcode');
    }

    get filterName() {
        return cy.get('#filter_product_or_service_name');
    }


    get filterWarehouse() {
        return cy.get('#filter_search_stock');
    }

    get resetFilter() {
        return cy.get('#itemTableFilter_form_btn_reset');
    }


    get filterVendorCode() {
        return cy.get('#filter_vendor_code');
    }

    get submitFilterButton() {
        return cy.get('button').contains('Применить');
    }

    get deleteMultipleButton() {
        return cy.get('button').contains('Удалить выбранное');
    }

    get importNomenclature() {
        return cy.contains('Импорт номенклатуры');
    }

    get uploadExcel() {
        return cy.get('#actions_upload_from_excel');
    }
}

export default new nomenclature();