import dayjs from 'dayjs';
import companyCreationPage from '../../page_objects/companyCreationPage';
import dashBoard from '../../page_objects/dashBoard';
import RandomNumberGenerator from '../../support/randomNumberGenerator';
import { constants } from '../../support/constants';
import data from '../../fixtures/TC15.json';

describe('', () => {
  beforeEach(() => {
    cy.visit(constants.SIGN_IN_URL);
  })

  it('creates new user and verifies that user correctly created', () => {
    const currentDate = dayjs().format('DD.MM.YYYY');
    cy.contains('Создать аккаунт').click();
    cy.get('[data-user-name="signup"]').type(data.newUserName);
    const newUserPhoneNumber = data.mobileOperatorCode + RandomNumberGenerator.generateRandom7DigitNumber();
    cy.get('#phone').click().typeSlow(newUserPhoneNumber);
    cy.proceed();
    cy.typeToPageBody(data.confirmationSmsCode);
    cy.get('[data-password="create_password"]').type(data.newUserPass)
    cy.get('[data-confirm-password="create_password"]').type(data.newUserPass)
    cy.get('[data-change-password-button="create_password"]').click();
    cy.modalContent().find('#companyForm_iinBin').type('119895656565651');
    cy.clickContinue();
    cy.get('#companyForm_iinBin').type(data.iinBin);

    companyCreationPage.companyName.type(data.newCompanyName);
    companyCreationPage.company_director_name.type(data.companyDirectorName);
    companyCreationPage.company_iinBin.type(data.iinBin);
    companyCreationPage.company_type_dropdown.click();
    cy.contains(data.companyType).click();
    companyCreationPage.companyFieldOfActivityDropdown.click()
    cy.contains(data.companyActivityType).click()
    companyCreationPage.company_address.type(data.address)
    companyCreationPage.bank_name
      .click()
      .type(data.bank);
    companyCreationPage.iik.type(data.iik)
    companyCreationPage.kbe.type(data.kbe)
    companyCreationPage.bik.type(data.bik)
    companyCreationPage.create_company_button.click()
    cy.contains('Добро пожаловать в Prosklad!').should('exist');
    dashBoard.close_welcome_window_button.click()
    dashBoard.settingsCompany.click({ force: true });

    // Company data assertions
    cy.contains(data.newUserName).should('exist');
    cy.contains(data.address).should('exist');
    cy.contains(data.iinBin).should('exist');
    cy.contains(data.newCompanyName).should('exist');

    // Check keys
    dashBoard.settings_payment_keys.click()
    cy.contains('Через 13 дней истекает ваш пробный тариф. Чтобы продолжить пользоваться всем функциями Prosklad, вам необходимо приобрести новый тариф.').should('exist');
    cy.contains('Мои покупки').click()
    cy.get('[role="rowgroup"]').contains(data.rate);
    cy.get('[role="rowgroup"]').contains(currentDate);
    cy.get('[role="rowgroup"]').contains('Осталось 13 дней');
    cy.get('[role="rowgroup"]').contains('Активирован');

    // Check registration phone number and replacing &nbsp
    dashBoard.management.click();
    dashBoard.settingsEmployees.click()
    cy.get('[data-label="Телефон"]')
      .invoke('text')
      .then((phoneNumber) => {
        expect(phoneNumber.replace(/\u00a0/g, '')).contains(newUserPhoneNumber);
      });
  })
})
