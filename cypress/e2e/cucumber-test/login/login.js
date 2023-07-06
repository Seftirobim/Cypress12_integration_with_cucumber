import { Given, When, Then, BeforeStep } from "@badeball/cypress-cucumber-preprocessor";

BeforeStep(()=>{
    //cy.reload()
    // https://filiphric.com/how-to-wait-for-page-to-load-in-cypress
    cy.intercept('/service-worker.js', {
        body: undefined
    })
})


Given('User open url',() => {
     cy.visit("/")
})

When("User input username {string} and password {string}",(username,password) =>{
    cy.get("#user-name").type(username)
    cy.get("#password").type(password)
})

When("User input form login as following",(datatable)=>{
    datatable.hashes().forEach(element => {
        cy.get("#user-name").type(element.username)
        cy.get("#password").type(element.password)
    })
})

When("User click on login button",() =>{
    cy.get("input[name='login-button']").click()
})

Then("User should success login",() =>{
    cy.get("#inventory_container").should("be.visible")
})

Then("User should failed login with error message",() =>{

    cy.get("[data-test='error']").should("have.text","Epic sadface: Sorry, this user has been locked out.")
})

Then("System should display an error message {string}",(msg) =>{

    cy.get("[data-test='error']").should("have.text",msg)
})

When("User click on the close button next to the error message",() =>{

    cy.get("button[class='error-button']").click()
})

Then("System should be removing the error message",() =>{

    cy.get(".error-message-container").should("be.visible")
})

When("User only input username field",() =>{
    cy.get("#user-name").type("standard_user")
})

When("User only input password field",() =>{
    cy.get("#password").type("secret_sauce")
})

