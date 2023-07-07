# Web Automation testing practice

A Web E2E testing using Cypress integrated with cucumber on the Dummy website http://saucedemo.com. As a self-learning tool for QA automation.


## Information
The version that I am using :

- nodejs version : `18.16.1`
- npm version : `9.7.2`
- cypress version : `12.16.0`
- @badeball/cypress-cucumber-preprocessor : `18.0.1`
- @bahmutov/cypress-esbuild-preprocessor : `2.2.0`

## Configuration steps
*`For me and those who want to configure it from scratch`*
-  Install Node.js®  [Link NodeJS](https://nodejs.org/en)
-  Open Code Editor e.g. `Visual Studio Code` and type `npm init` in the terminal within our project folder and fill in the required information
  -  install the `@badeball/cypress-cucumber-preprocessor` using the following command : 
  ```
  npm install -D @badeball/cypress-cucumber-preprocessor
  ```
-  recommended to installing the esbuild bundler by Gleb Bahmutov, which will make your run much faster. Using the following command :
  ```
  npm install -D @bahmutov/cypress-esbuild-preprocessor
  ```
- Run Cypress to generate several folders and files using the following command :
  ```
  npx cypress open
  ```
- Now configure the `cypress.config.js` as follows :
  - <details>
    <summary>Click me</summary>
      
    ```js
    const { defineConfig } = require("cypress");
    const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
    const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
    const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");
    
    async function setupNodeEvents(on, config) {
      // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
      await preprocessor.addCucumberPreprocessorPlugin(on, config);
    
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin.default(config)],
        })
      );
    
      // Make sure to return the config object as it might have been modified by the plugin.
      return config;
    }
    
    module.exports = defineConfig({
      e2e: {
        baseUrl:"https://saucedemo.com/",
        specPattern: ["**/*.feature", "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}"],
        setupNodeEvents,
        env: {
          omitFiltered: true,
          filterSpecs: true
        },
      },
    });
    ```  
    
    </details>
  - You can see other configurations here : https://docs.cypress.io/guides/references/configuration
- Create a folder named `cucumber-test` inside the `e2e` folder, and create folders according to the features you want to test. To follow the above configuration, in my dummy project, I have created the folder structure as follows:
  ```
  /home/john.doe/my-project/
  └── cypress/
      └── e2e/
          └── cucumber-test/
              ├── foo/
              │   ├── a.js
              │   └── a.feature
              └── bar/
                  ├── b.js
                  └── b.feature
  ```
- Now add a few lines to `package.json` as follows: :
  - <details>
    <summary>Click me</summary>
      
    ```json
    {
      "name": "cypress_cucumber",
      "version": "1.0.0",
      "description": "Cypress with cucumber",
      "main": "index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "keywords": [
        "Cypress",
        "BDD",
        "Cucumber"
      ],
      "author": "Sefti",
      "license": "ISC",
      "devDependencies": {
        "@badeball/cypress-cucumber-preprocessor": "^18.0.1",
        "@bahmutov/cypress-esbuild-preprocessor": "^2.2.0",
        "cypress": "^12.16.0"
      },
      "cypress-cucumber-preprocessor": {
        "stepDefinitions": "cypress/e2e/cucumber-test/**/*.{js,ts}",
        "html": {
          "enabled": true
        },
        "json": {
          "enabled": true
        }
      }
      
    }

    ```  
    
    </details>

- In each `step.js` file, whatever you name the step definitions, import the plugin using the following syntax:

  ```js
  import { Given, When, Then,} from "@badeball/cypress-cucumber-preprocessor"
  ```
- Why not import And as well ? Read here : [badeball/CCP/FAQ](https://github.com/badeball/cypress-cucumber-preprocessor/blob/master/docs/faq.md#function-members-and-and-but-are-missing)

## Running tests (requires npm@5.2.0 or greater)

- Cypress App 
  ```sh
  npx cypress open
  ``` 
- Command Line
  - run all tests headlessly.
    ```
    npx cypress run
    ```
  - Running a subset of scenarios (tags) | Source : [Tags](https://github.com/badeball/cypress-cucumber-preprocessor/blob/master/docs/tags.md)
    ```
    npx cypress run --env tags=@foo
    ```
