let inputData

before(function () {
    cy.fixture('inputData.json').then(function (jsonData) {
        inputData = jsonData
    })
})

describe('Lieferando basic tests', function () {

    beforeEach(function () {
        cy.openAppAndSetLanguage()
    })

    it('Validates the welcome text', function () {
        cy.fixture('expectedLocalizedTexts')
            .then(function (expectedData) {
                const expectedWelcomeText = expectedData.homePage.titleText.en
                cy.get(".header__title").should(function ($actualWelcomeText) {
                    expect($actualWelcomeText.text()).to.include(expectedWelcomeText)
                })
            })
    })

    it('Validates that search suggestions match the provided location', function () {
        const address = inputData.location.address
        cy.get("#imysearchstring").type(address)
        cy.get("#iautoCompleteDropDownContent > .skip + .lp__place")
            .should(function ($location) {
                const locationText = $location.text()
                expect(locationText.toLowerCase()).to.include(address.toLocaleLowerCase())
            })
    })

    it('Validates that search results for a location shows restaurants for that location', function () {
        const address = inputData.location.address
        cy.searchForLocation("home", address)
        cy.get('.topbar__title').should('be.visible').then(function ($button) {
            expect($button.text().toLowerCase()).to.include(address.toLowerCase())
        })
    })
})