Feature: Sort Product

    Scenario Outline: User want to sort product  
        Given User open url
        When User input username "<username>" and password "<password>"
        And User click on login button
        Then User should success login
        # And The product image must be displayed and be appropriate
        When User select sort product by "<select>"
        Then System should display a sort product by "<select>"
    Examples:
    |username|password|select|
    |standard_user|secret_sauce|Name (A to Z)|
    |standard_user|secret_sauce|Name (Z to A)|
    |standard_user|secret_sauce|Price (low to high)|
    |standard_user|secret_sauce|Price (high to low)|
    |problem_user|secret_sauce|Name (A to Z)|
    |problem_user|secret_sauce|Name (Z to A)|
    |problem_user|secret_sauce|Price (low to high)|
    |problem_user|secret_sauce|Price (high to low)|