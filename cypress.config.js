const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 15000, // Set the global timeout here
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
  watchForFileChanges: false
});
