import { constants } from '../support/constants';
import RandomNumberGenerator from '../support/randomNumberGenerator';

Cypress.Commands.add('typeSlow', { prevSubject: 'element' }, (subject, text, options = {}) => {
    const { delay = 100 } = options;
    const validDelay = delay > 0 ? delay : 100;
    cy.wrap(subject).type(text, { delay: validDelay });
});

Cypress.Commands.add('closeSuccessNotification', () => {
    cy.get('.align-self-center.cursor-pointer').click();
});

Cypress.Commands.add('selectCompany', (companyName) => {
    cy.get('[data-company-item="company_list"]').contains(companyName)
        .parent()
        .parent()
        .contains('Выбрать компанию').click({ force: true });
});

Cypress.Commands.add('verifyThatCompanyIsSelected', (companyName) => {
    cy.get('[data-company-item="company_list"]').contains(companyName)
        .parent()
        .parent()
        .contains('Компания выбрана').should('be.visible');
});

Cypress.Commands.add('Escape', () => {
    cy.get('body').trigger('keydown', { keyCode: 27 });
    cy.wait(200);
    cy.get('body').trigger('keyup', { keyCode: 27 });
});

Cypress.Commands.add('clickTimes', { prevSubject: true }, (subject, times) => {
    Cypress._.times(times, () => {
        cy.wrap(subject).click().wait(constants.AFTER_CLICK_TIMEOUT);
    });
});

Cypress.Commands.add('cancel', () => {
    cy.contains('button', 'Отменить')
        .click().wait(constants.AFTER_CLICK_TIMEOUT);
});


Cypress.Commands.add('save', () => {
    cy.contains('button', 'Сохранить')
        .click().wait(constants.AFTER_CLICK_TIMEOUT);
});

Cypress.Commands.add('pay', () => {
    cy.contains('button', 'Оплатить')
        .click().wait(constants.ONE_SECOND);
});

Cypress.Commands.add('checkOut', () => {
    cy.contains('button', 'Выбить чек')
        .click().wait(constants.AFTER_DISCOUNT_TIMEOUT);
});

Cypress.Commands.add('discount', () => {
    cy.contains('button', 'Скидка').click()
        .wait(constants.AFTER_CLICK_TIMEOUT);
});

Cypress.Commands.add('choose', () => {
    cy.contains('button', 'Выбрать')
        .click().wait(constants.AFTER_CLICK_TIMEOUT);
});

Cypress.Commands.add('dataLabel', (dataLabel) => {
    return cy.get("[data-label=" + dataLabel + "]");
});

Cypress.Commands.add('proceed', () => {
    cy.contains('button', 'Далее')
        .click().wait(constants.AFTER_CLICK_TIMEOUT);
});

Cypress.Commands.add('notifications', () => {
    cy.get('#page_header_notifications__BV_toggle_')
        .click();
    cy.contains('Все уведомления')
        .click();
});

Cypress.Commands.add('addCharacteristic', () => {
    cy.contains('button', 'Добавить характеристику')
        .click();
});

Cypress.Commands.add('chooseCharacteristic', (text) => {
    cy.contains('Выберите характеристику')
        .click();
    cy.contains(text).click();
});

Cypress.Commands.add('remove', () => {
    cy.get('button').contains('Удалить')
        .click().wait(constants.AFTER_CLICK_TIMEOUT);
});

Cypress.Commands.add('cleanCart', () => {
    cy.contains('button', 'Очистить')
        .click().wait(constants.AFTER_CLICK_TIMEOUT);
    cy.contains('button.btn.btn-outline-danger', 'Удалить').click();
});

Cypress.Commands.add('clickSpanByText', (text) => {
    cy.contains('span', text).click();
});

Cypress.Commands.add('multiSelectPlaceholderContains', (text) => {
    return cy.get('.multiselect__placeholder').contains(text);
});

Cypress.Commands.add('clickButtonByText', (text) => { cy.contains('button', text).click(); });

Cypress.Commands.add('finish', () => { cy.contains('Завершить').click(); })

Cypress.Commands.add('removeFromCart', (text) => {
    cy.clickSpanByText(text);
    cy.remove().wait(constants.AFTER_REMOVE_TIMEOUT);
});

Cypress.Commands.add('cartIsEmpty', () => {
    cy.get('.terminal-cart__empty-img').should('be.visible');
});

Cypress.Commands.add('postponement', () => {
    cy.contains('button', 'Отложка').click();
});

Cypress.Commands.add('addToPostponement', () => {
    cy.postponement();
    cy.clickSpanByText("Создать новую отложку из корзины");
});


Cypress.Commands.add('typeToTextArea', (text) => {
    cy.get('textarea').type(text);
});

Cypress.Commands.add('productIsInCart', (productName) => {
    cy.get('table#cardTable[role="table"] span')
        .contains(productName)
        .should('exist');
});

Cypress.Commands.add('editProduct', () => {
    cy.get('button[type="button"]')
        .contains('Редактировать товар').click();
});

Cypress.Commands.add('clickNumpadButton', (number) => {
    cy.contains('button.numpad__btn', number).click();
});

Cypress.Commands.add('addToCart', (productData, skipClear = false, clickOptions = { multiple: false }) => {
    cy.get('#terminalSearchInput')
        .typeSlow(productData)
        .wait(constants.SEARCH_TIMEOUT_SMALL);
    cy.get('div.terminal-product-title')
        .then(($elements) => {
            if (clickOptions.multiple) {
                cy.wrap($elements).click(clickOptions);
            } else {
                cy.wrap($elements.first()).click();
            }
        });
    // Note: by default terminal is cleared after adding to cart
    if (!skipClear) {
        cy.get('#terminalSearchInput').clear().wait(constants.AFTER_SEARCH_TIMEOUT);
    }
});

Cypress.Commands.add('typeMultipleTimes', { prevSubject: true }, (subject, text, times) => {
    for (let i = 0; i < times; i++) {
        cy.wrap(subject).type(text);
    }
});

Cypress.Commands.add('universalProduct', () => {
    cy.contains('button', 'Универсальный товар').click();
});

Cypress.Commands.add('typeToPageBody', (text) => {
    cy.get('body').type(text);
});

Cypress.Commands.add('addCommission', (text) => {
    cy.get('[data-icon="badge-percent"]').click();
    cy.get('[title="' + text + '"]').click();
});

Cypress.Commands.add('chooseWarehouse', (text) => {
    cy.get('.card-body').find('button').contains(text).click();
});

Cypress.Commands.add('logIn', (phoneNumber, password) => {
    cy.visit(constants.SIGN_IN_URL);
    cy.get('input[id="phone"]').type(phoneNumber);
    cy.get('input[type="password"]').type(password);
    cy.get('button[type="submit"]').click();
});

Cypress.Commands.add('clickAcceptOfGoods', () => {
    cy.get('li').contains('Приемка').click();
});

Cypress.Commands.add('searchProductInputFilterTypeSlow', (text) => {
    cy.get('[placeholder="Поиск товара"]').parent().click().wait(2000);
    cy.get('[placeholder="Поиск товара"]').parent().typeSlow(text).wait(4000).type('{enter}');

});

Cypress.Commands.add('chooseOptionFromList', (text) => {
    cy.get('li').contains(text).click();
});

Cypress.Commands.add('dismiss', () => {
    cy.get('[class="close"]').click();
});

Cypress.Commands.add('setQuantity', (quantity) => {
    if (constants.CHOOSE_WAREHOUSE) {
        cy.get('span.text-muted').contains('ШТ').click().type(quantity);
    }
});

Cypress.Commands.add('acceptGoods', () => {
    cy.contains('button', 'Создать приемку').click();
});

Cypress.Commands.add('createProduct', () => {
    cy.contains('button', 'Создать товар').click();
});

Cypress.Commands.add('buttonContainsClick', (text) => {
    cy.contains('button', text).click()
});

Cypress.Commands.add('messageDisplayed', (text) => {
    cy.contains('span', text).should('be.visible');
});

Cypress.Commands.add('closeNotification', () => {
    cy.get('.vue-notification-wrapper').find('.align-self-center.cursor-pointer').click();
});

Cypress.Commands.add('chooseWallet', (walletName) => {
    cy.contains('span', 'Выберите из списка').click();
    cy.contains('span', walletName).click();
});

Cypress.Commands.add('clearTerminal', () => {
    cy.get('#terminalSearchInput').clear().wait(constants.AFTER_SEARCH_TIMEOUT);
});

Cypress.Commands.add('removeProductFromRow', (productName) => {
    cy.get('tbody[role="rowgroup"]')
        .contains('tr', productName)
        .find('[data-icon="trash"]')
        .click();
});

Cypress.Commands.add('burgerButton', () => {
    cy.wait(constants.BURGER_BUTTON_WAIT);
    cy.get('[data-icon="bars"]').click();
});

Cypress.Commands.add('inputNumpadNumber', (text) => {
    for (let i = 0; i < text.length; i++) {
        cy.clickNumpadButton(text[i]);
        cy.wait(300);
    }
});

Cypress.Commands.add('modalContent', () => {
    return cy.get('.modal-content');
});

Cypress.Commands.add('clickContinue', () => {
    cy.contains('button', 'Продолжить').click()
});

Cypress.Commands.add('clickOnButtonContains', (text) => {
    cy.get('button').contains(text).click();
});

Cypress.Commands.add('confirm', () => {
    cy.get('button').contains('Подтвердить').click();
});

Cypress.Commands.add('searchProductByBarcodeOrNameFilter', () => {
    return cy.get('#search_product_by_barcode_or_name');
});

Cypress.Commands.add('launchFilter', () => {
    cy.contains('Применить').click().wait(constants.AFTER_SEARCH_TIMEOUT);
});

Cypress.Commands.add('resetFilter', () => {
    // cy.get('#customerFilter_form_btn_reset').click().wait(constants.AFTER_SEARCH_TIMEOUT);
    cy.get('button').contains('Сбросить').click({ force: true });
});

Cypress.Commands.add('addProductBarSubmitClick', () => {
    cy.get('#add_product_bar_submit').click();
});

Cypress.Commands.add('tableHasContent', () => {
    cy.get('table tbody').find('tr').should('exist')
        .and('have.length.at.least', 1);
});

Cypress.Commands.add('typeEmployeeNameInSearchFilter', (text) => {
    cy.get('#filter_sale_search_employee').typeSlow(text).type('{enter}');
});

Cypress.Commands.add('typeFiscalNumber', (text) => {
    cy.get('#filter_sale_receiptNumber').typeSlow(text);
});

Cypress.Commands.add('typeWarehouseInFilter', (text) => {
    cy.get('#filter_sale_search_stock').typeSlow(text);
});

Cypress.Commands.add('addSupplier', (text) => {
    cy.get('button').contains('Добавить поставщика').click();
});

Cypress.Commands.add('findInputByLegendNameAndType', (text, inputData) => {
    cy.get('legend').contains(text).parent().find('input').type(inputData);
});

Cypress.Commands.add('placeHolder', (text) => {
    cy.get('[placeholder="' + text + '"]');
});

Cypress.Commands.add('selectRowAndColumnInTableBody', (rowNumber, columnNumber) => {
    return cy.get('tbody').find('tr').eq(rowNumber * 1).find('td').eq(columnNumber * 1);
    // *1 because it does cast the func inputs to number
});

Cypress.Commands.add('selectRowAndColumnInTableHead', (rowNumber, columnNumber) => {
    return cy.get('thead').find('tr').eq(rowNumber * 1).find('th').eq(columnNumber * 1);
    // *1 because it does cast the func inputs to number
});

Cypress.Commands.add('dismissFeedbackWindow', () => {
    cy.get('#modalFeedback').find('.close').click().wait(700);
});

Cypress.Commands.add('tryToOpenShift', () => {
    cy.wait(1000);
    cy.contains('h5', 'Открыть смену').if('visible')
        .then(() => {
            cy.get('button').contains('Открыть смену').click();
        })
        .else().log('shift was already open');
});

Cypress.Commands.add('tryToOpenTerminalList', () => {
    cy.wait(1000);
    cy.contains('.terminal-list').if('not.exist')
        .then(() => {
            cy.get('.terminal-bar').find('button').click();
        })
        .else().log('could not open terminal list');
});

Cypress.Commands.add('setPeriod', (text) => {
    cy.get('[class*=date-picker]').first().click();
    cy.get('div').contains(text).click();
});