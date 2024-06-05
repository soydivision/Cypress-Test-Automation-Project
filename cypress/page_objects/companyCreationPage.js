class companyCreationPage {


    get companyName() {
        return cy.get('#companyForm_name');
    }

    get company_director_name() {
        return cy.get('#companyForm_director_name')
    }

    get company_iinBin() {
        return cy.get('#companyForm_iinBin')
    }

    get company_type_dropdown() {
        return cy.contains('span.multiselect__placeholder', 'Тип компании')
    }

    get companyFieldOfActivityDropdown() {
        return cy.contains('span.multiselect__placeholder', 'Сфера деятельности')
    }

    get company_address() {
        return cy.get('input#companyForm_address[placeholder="Адрес"]')
    }

    get bank_name() {
        return cy.get('#companyForm_bankName')
    }

    get iik() {
        return cy.get('#companyForm_iik')
    }

    get kbe() {
        return cy.get('#companyForm_kbe')
    }

    get bik() {
        return cy.get('#companyForm_bik')
    }

    get create_company_button() {
        return cy.contains('Создать компанию')
    }
}

export default new companyCreationPage();
