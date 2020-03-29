// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("changeLanguage", (language) => {
    cy.get('#locale').click()
    cy.get(`[data-click-language=${language}]`).click()
})

Cypress.Commands.add("setViewPort", () => {
    cy.viewport(screen.width, screen.height)
})

Cypress.Commands.add("searchForLocation", (page, address) => {
    switch (page) {
        case "home":
            cy.get("#imysearchstring").type(address)
            cy.get("#iautoCompleteDropDownContent > .skip + .lp__place").click()
            break;
        case "searchResults":
            // code block
            break;
        default:
        // Nothing.
    }
})

Cypress.Commands.add("openAppAndSetLanguage", () => {
    cy.visit("/")
    cy.setViewPort()
    cy.changeLanguage("en")
})

Cypress.Commands.add("selectCuisine", (cuisineLocator, cuisine) => {
    cy.get(cuisineLocator).contains(cuisine).then(function ($element) {
        cy.get($element).scrollIntoView().click({force: true})
    })
})