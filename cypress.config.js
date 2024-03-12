const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index')(on, config)
    },
    baseUrl: "https://starbugs-qa.vercel.app/",
  },
  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'results/[suiteName].xml',
    toConsole: false
  }
});
