const { defineConfig } = require("cypress");
const { allureCypress } = require("allure-cypress/reporter");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      allureCypress(on, config);
    },
    baseUrl: "https://starbugs-qa.vercel.app/",
    viewportWidth: 1280,
    viewportHeight: 720,
  },
  reporter: "junit",
  reporterOptions: {
    mochaFile: "results/[suiteName].xml",
    toConsole: false,
  },
  env: {
    allure: true,
    reporterOptions: {
      allureReport: {
        shouldGenerateAllureReport: true,
        allureReportDir: 'allure-results',
        reportTitle: 'Relatório de Testes Starbugs',
      }
    },
  },
});
