import data from '../../fixtures/TC25.json'
import sysMessages from '../../fixtures/system_notifications_and_messages.json'
import user from '../../fixtures/creds/company_with_products.json';
import dashBoard from '../../page_objects/dashBoard';

describe('', () => {
    beforeEach(() => {
        cy.logIn(user.phoneNumber, user.password);
        cy.selectCompany(user.companyWithData);
        cy.closeSuccessNotification();
        dashBoard.salesMode.click();
        cy.clickAcceptOfGoods();
        cy.tryToOpenShift();
        cy.tryToOpenTerminalList();
    })

    it('is accepting products measured in pcs delay payment', () => {
        cy.addToCart(data.productInPiecesName, true, { multiple: false });
        cy.get('span.text-muted').contains(data.productInPiecesMeasurementUnit).click().type(data.productInPiecesQuantity);
        cy.save();
        cy.acceptGoods().wait(1000);
        cy.modalContent().find('[placeholder="Поиск"]').type(data.supplier);
        cy.contains('button', data.supplier).click();
        cy.choose();
        cy.messageDisplayed(sysMessages.creationSuccess);
        cy.contains('button', 'Оплатить позже').click();
    })

    it('is accepting products measured in pcs and pays with wallet', () => {
        cy.addToCart(data.productInPiecesName, true, { multiple: false });
        cy.get('span.text-muted').contains(data.productInPiecesMeasurementUnit).click().type(data.productInPiecesQuantity);
        cy.save();
        cy.acceptGoods().wait(1000);
        cy.modalContent().find('[placeholder="Поиск"]').type(data.supplier);
        cy.contains('button', data.supplier).click();
        cy.choose();
        cy.chooseWallet(data.wallet);
        cy.get('button.btn.btn-primary').contains('Оплатить').click();
        cy.messageDisplayed(sysMessages.paymentSuccess);
    })

    it('is accepting products measured in bottles, delay payment', () => {
        cy.addToCart(data.productInBottlesBarcode, true, { multiple: false });
        cy.get('span.text-muted').contains(data.productInBottlesMeasurementUnit).click().type(data.productInBottlesQuantity);
        cy.save();
        cy.acceptGoods().wait(1000);
        cy.modalContent().find('[placeholder="Поиск"]').type(data.supplierProductInBottles);
        cy.contains('button', data.supplierProductInBottles).click();
        cy.choose();
        cy.messageDisplayed(sysMessages.creationSuccess);
        cy.contains('button', 'Оплатить позже').click();
    })

    it('is accepting products measured in bottles, pay by wallet', () => {
        cy.addToCart(data.productInBottlesBarcode, true, { multiple: false });
        cy.get('span.text-muted').contains(data.productInBottlesMeasurementUnit).click().type(data.productInBottlesQuantity);
        cy.save();
        cy.acceptGoods().wait(1000);
        cy.modalContent().find('[placeholder="Поиск"]').type(data.supplierProductInBottles);
        cy.contains('button', data.supplierProductInBottles).click();
        cy.choose();
        cy.chooseWallet(data.wallet);
        cy.get('button.btn.btn-primary').contains('Оплатить').click();
        cy.messageDisplayed(sysMessages.paymentSuccess);
    })

    it('is accepting products measured in kg delay payment', () => {
        cy.addToCart(data.productInKg, true, { multiple: false });
        cy.get('span.text-muted').contains(data.productInKgMeasurementUnit).click().type(data.productInKgQuantity);
        cy.save();
        cy.acceptGoods().wait(1000);
        cy.modalContent().find('[placeholder="Поиск"]').type(data.supplierProductInKg);
        cy.contains('button', data.supplierProductInKg).click();
        cy.choose();
        cy.messageDisplayed(sysMessages.creationSuccess);
        cy.contains('button', 'Оплатить позже').click();
    })

    it('is accepting products measured in kg pay with wallet', () => {
        cy.addToCart(data.productInKg, true, { multiple: false });
        cy.get('span.text-muted').contains(data.productInKgMeasurementUnit).click().type(data.productInKgQuantity);
        cy.save();
        cy.acceptGoods().wait(1000);
        cy.modalContent().find('[placeholder="Поиск"]').type(data.supplierProductInKg);
        cy.contains('button', data.supplierProductInKg).click();
        cy.choose();
        cy.chooseWallet(data.wallet);
        cy.get('button.btn.btn-primary').contains('Оплатить').click();
        cy.messageDisplayed(sysMessages.paymentSuccess);
    })
})
