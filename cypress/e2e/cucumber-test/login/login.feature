Feature: Login 

    # Agar tiap step mengeksekusi background waktu pertama kali
    Background: 
        Given User open url

    @smoke
    Scenario Outline: User want to login with valid user
        When User input username "<username>" and password "<password>"
        And User click on login button
        Then User should success login
    Examples:
        | username | password | 
        | standard_user  | secret_sauce  | 
        | problem_user  | secret_sauce  | 

    # Coba gunakan datatable di step js nya

    # Scenario: User want to login with valid user
    #     When User input form login as following 
    #         |username|password|
    #         |standard_user|secret_sauce|
    #     And User click on login button
    #     Then User should success login

    # Scenario: User want to login with valid user
    #     When User input username "standard_user" and password "secret_sauce"
    #     And User click on login button
    #     Then User should success login

    @smoke
    Scenario: User want to login with invalid credential
        When User input username "invalid" and password "invalid"
        And User click on login button
        Then System should be display an error message "Epic sadface: Username and password do not match any user in this service"

    @smoke
    Scenario: Locked out user want to login
        When User input username "locked_out_user" and password "secret_sauce"
        And User click on login button
        Then User should failed login with error message

    @regression
    Scenario: Invalid User want to click the close button next to the error message
        When User input username "invalid" and password "invalid"
        And User click on login button
        Then System should be display an error message "Epic sadface: Username and password do not match any user in this service"
        When User click on the close button next to the error message
        Then System should be removing the error message 

    @regression
    Scenario: User want to login with empty username and password
        And User click on login button
        Then System should be display an error message "Epic sadface: Username and password are required."

    @regression
    Scenario: User want to login with username only
        When User only input username field
        And User click on login button
        Then System should be display an error message "Epic sadface: Password is required"

    @regression
    Scenario: User want to login with password only
        When User only input password field
        And User click on login button
        Then System should be display an error message "Epic sadface: Username is required"        



