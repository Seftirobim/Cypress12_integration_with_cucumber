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

    Scenario: User want to add product based on the product name
        When User add products as following
            |product|
            |Sauce Labs Backpack|
            |Sauce Labs Bolt T-Shirt|
            |Test.allTheThings() T-Shirt (Red)|
        Then Button remove and cart icon badge should display corresponding number  

    Scenario: User want to remove product based on the product name at "inventory page"
        When User add 3 product to cart
        Then Button remove and cart icon badge should display corresponding number
        When User clicks on the remove button based on the product named "<product>"
        Then System should remove product named "<product>" from cart and display corresponding product
    Examples:
        |product|
        |Sauce Labs Backpack|

    Scenario: User want to remove all product from cart at "inventory page"
        When User add 3 product to cart
        Then Button remove and cart icon badge should display corresponding number
        When user clicks all the remove buttons on the selected products 
        Then System should change remove buttons to add to cart buttons on the selected products and remove cart badge   

    Scenario: User want to check cart
        When User add 2 product to cart
        And User click on cart icon
        Then System should be navigate user to cart page and selected product must be displayed

    Scenario: User want to remove product based on the product name at "cart page"
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

    Scenario: User want to checkout empty order
        And User click on cart icon
        Then System should be navigate user to cart page
        When User click on checkout button
        Then System should be display an error message "Epic sadface: Please select a product first."

    Scenario: User want to checkout with empty form order
        When User add 2 product to cart
        And User click on cart icon
        Then System should be navigate user to cart page and selected product must be displayed
        When User click on checkout button
        Then System should navigate user to checkout step one page
        When User click continue button
        Then System should be display an error message "Error: First Name, Last Name, and Zip/Postal Code are required"

    Scenario: User want to checkout with empty First Name
        When User add 2 product to cart
        And User click on cart icon
        Then System should be navigate user to cart page and selected product must be displayed
        When User click on checkout button
        Then System should navigate user to checkout step one page
        When User input lastname "Example", and postal code 40000
        And User click continue button
        Then System should be display an error message "Error: First Name is required"

    Scenario: User want to checkout with empty Last Name
        When User add 2 product to cart
        And User click on cart icon
        Then System should be navigate user to cart page and selected product must be displayed
        When User click on checkout button
        Then System should navigate user to checkout step one page
        When User input firstname "Example", and postal code 40000
        And User click continue button
        Then System should be display an error message "Error: Last Name is required"

    Scenario: User want to checkout with empty Postal Code
        When User add 2 product to cart
        And User click on cart icon
        Then System should be navigate user to cart page and selected product must be displayed
        When User click on checkout button
        Then System should navigate user to checkout step one page
        When User input firstname "Example", and lastname "Example"
        And User click continue button
        Then System should be display an error message "Error: Postal Code is required"

    Scenario: User want to checkout with empty First Name and Last Name
        When User add 2 product to cart
        And User click on cart icon
        Then System should be navigate user to cart page and selected product must be displayed
        When User click on checkout button
        Then System should navigate user to checkout step one page
        When User input postal code 40000
        And User click continue button
        Then System should be display an error message "Error: First Name and Last Name are required"

    Scenario: User want to checkout with empty First Name and Postal Code
        When User add 2 product to cart
        And User click on cart icon
        Then System should be navigate user to cart page and selected product must be displayed
        When User click on checkout button
        Then System should navigate user to checkout step one page
        When User input lastname "Example"
        And User click continue button
        Then System should be display an error message "Error: First Name and Postal Code are required"

    Scenario: User want to checkout with empty Last Name and Postal Code
        When User add 2 product to cart
        And User click on cart icon
        Then System should be navigate user to cart page and selected product must be displayed
        When User click on checkout button
        Then System should navigate user to checkout step one page
        When User input firstname "Example"
        And User click continue button
        Then System should be display an error message "Error: Last Name and Postal Code are required" 

    Scenario: User want to cancel order and go back to cart page
        When User add 2 product to cart
        And User click on cart icon
        Then System should be navigate user to cart page and selected product must be displayed
        When User click on checkout button
        Then System should navigate user to checkout step one page
        When User input firstname "<firstname>", lastname "<lastname>", and postal code "<postal>"
        And User click cancel button
        Then System should be navigate user to cart page and selected product must be displayed            
    Examples:
        |firstname|lastname|postal|
        |Jhon | doo | 4000 |


