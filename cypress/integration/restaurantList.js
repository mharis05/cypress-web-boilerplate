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
        cy.openAppAndSetLanguage()
        cy.searchForLocation("home", inputData.location.address)
    })

    it.only('Validates that selecting cuisine type shows restaurants from that cuisine', function () {
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
            // cy.get(".js-restaurants-counter-default").should(($restaurantCounter) => {
            //     if($restaurantCounter.is(':visible')){
            //       return false  
            //     }
            // })
            cy.get(locators.restaurantCell)
                .each(function ($restaurantCuisine) {
                    cy.get($restaurantCuisine).find(locators.restaurantCuisine).then(function ($cuisine) {
                        expect($cuisine.text().trim()).to.include($element.text().trim())
                    })
                })

        })
    })

})