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

    it('Validates that selecting cuisine type shows restaurants from that cuisine', function () {
        var cuisines = inputData.cuisines.valid
        cuisines.forEach(cuisine => {
            cy.selectCuisine("a[data-type='Cuisine'] + .subcatlink", cuisine).then(function ($element) {

                cy.get(".js-restaurant:not('.restaurant_hide'):not('#SingleRestaurantTemplateIdentifier')")
                    .each(function ($restaurantCuisine) {
                        cy.get($restaurantCuisine).find(".kitchens").then(function ($cuisine) {
                            console.log("Cuisine found:", $cuisine.text().trim())
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
            cy.selectCuisine("a[data-type='Cuisine'] + .subcatlink", cuisine).then(function ($element) {
                cy.get(".js-noresults-search > h3".trim()).contains(expectedErrorText.trim())
            })
        });

    })

    it.skip('(This test takes 3 minutes) Validates that selecting category shows restaurants of that category', function () {
        cy.get("a[data-type='Cuisine'] + .subcatlink").each(function ($element) {
            cy.get($element).click()
            // cy.get(".js-restaurants-counter-default").should(($restaurantCounter) => {
            //     if($restaurantCounter.is(':visible')){
            //       return false  
            //     }
            // })
            cy.get(".js-restaurant:not('.restaurant_hide'):not('#SingleRestaurantTemplateIdentifier')")
                .each(function ($restaurantCuisine) {
                    cy.get($restaurantCuisine).find(".kitchens").then(function ($cuisine) {
                        expect($cuisine.text().trim()).to.include($element.text().trim())
                    })
                })

        })
    })

})