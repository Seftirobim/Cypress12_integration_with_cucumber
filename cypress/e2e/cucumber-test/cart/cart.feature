Feature: Cart

    Background: 
        Given User open url
        When User input username "standard_user" and password "secret_sauce"
        And User click on login button
        Then User should success login
        And The product image must be displayed and be appropriate

    Scenario: User want to add product to cart 
        When User add 3 product to cart
        Then Button remove and cart icon badge should display corresponding number

    Scenario: User want remove product based on the product name on "inventory page"
        When User add 3 product to cart
        Then Button remove and cart icon badge should display corresponding number
        When User clicks on the remove button based on the product named "<product>"
        Then System should remove product named "<product>" from cart and display corresponding product
    Examples:
        |product|
        |Sauce Labs Backpack|

    Scenario: User want to check cart
        When User add 2 product to cart
        And User click on cart icon
        Then System should be navigate user to cart page and selected product must be displayed

    Scenario: User want remove product based on the product name on "cart page"
        When User add 3 product to cart
        Then Button remove and cart icon badge should display corresponding number
        And User click on cart icon
        Then System should be navigate user to cart page and selected product must be displayed
        When User clicks on the remove button based on the product named "<product>"
        Then System should remove product named "<product>" from cart and display corresponding product
    Examples:
        |product|
        |Sauce Labs Backpack|

    Scenario: User want to go back to the inventory page after clicking continue shopping
        When User add 2 product to cart
        And User click on cart icon
        Then System should be navigate user to cart page and selected product must be displayed
        When User click continue shopping button
        Then System should be navigate user to inventory page

    Scenario: User want to checkout order    
        When User add 2 product to cart
        And User click on cart icon
        Then System should be navigate user to cart page and selected product must be displayed
        When User click on checkout button
        Then System should navigate user to checkout step one page
        When User input firstname "<firstname>", lastname "<lastname>", and postal code "<postal>"
        And User click continue button
        Then System should display corresponding order data
        When User click finish button
        Then system should display thank you message
    Examples:
        |firstname|lastname|postal|
        |Jhon | doo | 4000 |




