import * as locators from '../fixtures/restaurantListLocators'

let inputData
let expectedData
describe('Restaurant List Tests', function () {

    before(function () {
        cy.fixture('inputData.json').then(function (jsonData) {
            inputData = jsonData

        })
        cy.fixture('expectedLocalizedTexts').then(function (expectedJsonData) {
            expectedData = expectedJsonData
        })
    })

    beforeEach(function () {
        cy.openRestaurantsList("en", inputData.location.city, inputData.location.postcode)
    })

    it('Validates that selecting cuisine type shows restaurants from that cuisine', function () {
        var cuisines = inputData.cuisines.valid
        cuisines.forEach(cuisine => {
            cy.selectCuisine(locators.cuisineCategory, cuisine).then(function ($element) {

                cy.get(locators.restaurantCell)
                    .each(function ($restaurantCuisine) {
                        cy.get($restaurantCuisine).find(locators.restaurantCuisine).then(function ($cuisine) {
                            expect($cuisine.text().trim()).to.include($element.text().trim())
                        })
                    })

            })
        });
    })

    it('Validates that friendly message is shown when no restaurants exists for a cuisine', function () {
        var cuisines = inputData.cuisines.invalid
        var expectedErrorText = expectedData.restaurantsListPage.noRestaurantsFoundText.en
        cuisines.forEach(cuisine => {
            cy.selectCuisine(locators.cuisineCategory, cuisine).then(function ($element) {
                cy.get(locators.noRestaurantFoundText.trim()).contains(expectedErrorText.trim())
            })
        });

    })

    it.skip('(This test takes 3 minutes) Validates that selecting category shows restaurants of that category', function () {
        cy.get(locators.cuisineCategory).each(function ($element) {
            cy.get($element).click()
            cy.get(locators.restaurantCell)
                .each(function ($restaurantCuisine) {
                    cy.get($restaurantCuisine).find(locators.restaurantCuisine).then(function ($cuisine) {
                        expect($cuisine.text().trim()).to.include($element.text().trim())
                    })
                })

        })
    })

    it('Validates that Devlivery time, Delivery fee and Min Order amount is shown for each open restaurant',
        function () {
            cy.get(locators.openRestaurantCell).first()
                .then(function ($restaurantCell) {
                    cy.get($restaurantCell).find(locators.restaurantDeliveryTimeText).contains(/^([\d]*min)$/)
                    cy.get($restaurantCell).find(locators.restaurantDeliveryCostText).contains(/^([\d]*,[\d]* €)|(FREE)$/)
                    cy.get($restaurantCell).find(locators.restaurantDeliveryMinOrderText).contains(/^(Min\. [\d]*,[\d]* €)$/)
                })
        })

    it('Validates that Delivery button is present and selected by default', function () {
        cy.get(locators.deliveryButton).contains("Delivery").should("have.class", "switch-active")

    })

    it('Validates that Pickup button is present and deselected by default', function () {
        cy.get(locators.pickupButton).contains("Pickup").should("not.have.class", "switch-active")
    })

})